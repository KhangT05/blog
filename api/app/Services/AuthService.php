<?php

namespace App\Services;

use App\Enums\Common;
use App\Exception\SecurityException;
use App\Http\Requests\AuthRequest;
use App\Http\Resources\UserResource;
use App\Repositories\CrsfTokenRepository;
use App\Repositories\RefreshTokenRepository;
use App\Repositories\UserRepository;
use App\Trait\HasTransaction;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Exceptions\UserNotDefinedException;

class AuthService
{
    use HasTransaction;
    private $auth;
    private const ACCESS_TOKEN_TIME_TO_LIVE = 5;
    private const REFRESH_TOKEN_TIME_TO_LIVE = 5;
    private $accessToken;
    private $refreshToken;
    private $crsfToken;
    private $refreshTokenRepository;
    private $crsfTokenRepository;
    private $userRepository;
    private $refreshTokenModel;
    public function __construct(
        RefreshTokenRepository $refreshTokenRepository,
        CrsfTokenRepository $crsfTokenRepository,
        UserRepository $userRepository
    ) {
        /**
         * @var \Tymon\JwtAuth\JwtGuard
         */
        $this->auth = auth(Common::API);
        $this->refreshTokenRepository = $refreshTokenRepository;
        $this->crsfTokenRepository = $crsfTokenRepository;
        $this->userRepository = $userRepository;
    }
    public function authenticate(AuthRequest $request)
    {
        try {
            return $this
                ->beginTransaction()
                ->generateAccessToken($request)
                ->generateRefreshToken()
                ->generateCrsfToken()
                ->commit()
                ->authResponse();
        } catch (\Throwable $th) {
            $this->rollback();
            throw $th;
        }
    }
    private function generateAccessToken(AuthRequest $request): self
    {
        $credentials = [
            'email' => $request->string('email'),
            'password' => $request->string('password'),
        ];
        $this->auth->setTTL(self::ACCESS_TOKEN_TIME_TO_LIVE);
        $this->auth->claims(['guard' => Common::API]);
        if (!$accessToken = $this->auth->attempt($credentials)) {
            throw new AuthenticationException();
        }
        $this->accessToken = $accessToken;
        return $this;
    }
    private function generateRefreshToken(): self
    {
        $payload = [
            'refresh_token' => Str::uuid(),
            'expires_at' => now()->addDay(self::REFRESH_TOKEN_TIME_TO_LIVE),
            'user_id' => $this->auth->user()->id
        ];
        if (!$refreshToken = $this->refreshTokenRepository->create($payload)) {
            throw new ModelNotFoundException();
        }
        $this->refreshToken = $refreshToken->refresh_token;
        return $this;
    }
    private function generateCrsfToken(): self
    {
        $payload = [
            'crsf_token' => Str::uuid(),
            'user_id' => $this->auth->user()->id,
        ];
        $this->crsfTokenRepository->deleteCrsfTokenByUserId($payload['user_id']);
        if (!$crsfToken = $this->crsfTokenRepository->create($payload)) {
            throw new ModelNotFoundException();
        }
        $this->crsfToken = $crsfToken->crsf_token;
        return $this;
    }
    private function authResponse(): array
    {
        return [
            'data' => [
                'accesstoken' => $this->accessToken,
                'tokenType' => 'Bearer ',
                'expiresAt' => $this->auth->factory()->getTTL() * 60,
                'crsfToken' => $this->crsfToken,
                'user' => new UserResource($this->auth->user()),
            ],
            'authCookie' => Cookie::make(
                'refreshToken',
                $this->refreshToken,
                self::REFRESH_TOKEN_TIME_TO_LIVE * 24 * 60,
                '/',
                null,
                null,
                true,
                false,
                'Lax'
            )
        ];
    }
    public function getMe()
    {

        if (!$user = $this->auth->user()) {
            throw new UserNotDefinedException('Không tìm thấy thông tin phù hợp');
        }
        return new UserResource($user);
    }
    public function refreshToken(Request $request)
    {
        try {
            return $this
                ->beginTransaction()
                ->checkHasHeader($request)
                ->checkRefreshToken($request)
                ->generateNewAccessToken()
                ->generateRefreshToken()
                ->generateCrsfToken()
                ->commit()
                ->authResponse();
        } catch (\Throwable $th) {
            $this->rollback();
            throw $th;
        }
    }

    private function checkHasHeader(Request $request): self
    {
        if (!$request->hasHeader('X-CRSF-TOKEN')) {
            // throw new Notfound('Không tồn tại crsf token hợp lệ');
        }
        if (!$crsfToken = $this->crsfTokenRepository->findByCrsfToken($request->header('X_CRSF_TOKEN'))) {
            throw new ModelNotFoundException('Không tồn tại record này');
        }
        $refreshToken = $request->cookie('refreshToken');
        if (!$result = $this->refreshTokenRepository->findRefreshTokenInvalid($refreshToken)) {
            throw new ModelNotFoundException('Không tồn tại record này');
        }
        $this->refreshTokenModel = $result;
        return $this;
    }

    private function checkRefreshToken(Request $request): self
    {
        if ($this->checkRefreshTokenReuse($this->refreshTokenModel)) {
            $this->refreshTokenRepository->revokeAllUserRefreshToken($this->refreshTokenModel->user_id);
            $this->commit();
            Log::warning('Phát hiện Refresh Token được sử dụng lại', [
                'refresh_token' => $this->refreshTokenModel->refresh_token,
                'user_id' => $this->refreshTokenModel->user_id,
                'ip' => $this->refreshTokenModel->ip,
                'timestamp' => now()
            ]);
            throw new SecurityException('Vấn đề về kĩ thuật bảo mật hệ thống');
        }
        return $this;
    }

    private function generateNewAccessToken(): self
    {
        $this->refreshTokenModel->update(['was_used' => 1,]);
        $user = $this->userRepository->findById($this->refreshTokenModel->user_id);
        $this->auth->setTTL(self::ACCESS_TOKEN_TIME_TO_LIVE);
        $this->auth->claims(['guard' => Common::API]);
        $this->accessToken = $this->auth->login($user);
        return $this;
    }

    private function checkRefreshTokenReuse($refreshToken = null)
    {
        if ($refreshToken->was_used || $refreshToken->is_revoked) {
            return true;
        }
        return false;
    }
    public function logout()
    {
        $this->auth->logout();
        $this->auth->invalidate(true);
    }
}
