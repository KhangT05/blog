<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;
use App\Http\Resources\ApiResource;
use App\Services\AuthService;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Tymon\JWTAuth\Exceptions\UserNotDefinedException;

class AuthController extends Controller
{
    protected $authService;
    public function __construct(
        AuthService $authService
    ) {
        $this->authService = $authService;
    }
    public function login(AuthRequest $request): JsonResponse
    {
        try {
            $response = $this->authService->authenticate($request);
            return ApiResource::ok($response['data'], 'Đăng nhập thành công')
                ->withCookie($response['authCookie']);
        } catch (ModelNotFoundException $e) {
            return ApiResource::message($e->getMessage(), Response::HTTP_NOT_FOUND);
        } catch (AuthenticationException $e) {
            return ApiResource::message($e->getMessage(), Response::HTTP_UNAUTHORIZED);
        } catch (\Throwable $th) {
            return ApiResource::message($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function me()
    {
        try {
            $response = $this->authService->getMe();
            return ApiResource::ok($response, 'Thành công');
        } catch (UserNotDefinedException $e) {
            return ApiResource::message($e->getMessage(), Response::HTTP_BAD_REQUEST);
        } catch (\Throwable $th) {
            return ApiResource::message($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function refresh(Request $request)
    {
        try {
            $response = $this->authService->refreshToken($request);
            return ApiResource::ok($response['data'], 'Làm mới refresh token thành công')
                ->withCookie($response['authCookie']);
        } catch (\Throwable $th) {
            return ApiResource::message($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function logout(): JsonResponse
    {
        try {
            $response = $this->authService->logout();
            return ApiResource::ok($response, 'Đăng xuất thành công');
        } catch (\Throwable $th) {
            return ApiResource::message($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
