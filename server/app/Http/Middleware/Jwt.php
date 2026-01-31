<?php

namespace App\Http\Middleware;

use App\Http\Resources\ApiResource;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class Jwt
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $guard = 'api'): Response
    {
        try {
            if (!$request->hasHeader('Authorization')) {
                return ApiResource::message('Không tìm thấy AccessToken hợp lệ', Response::HTTP_UNAUTHORIZED);
            }
            $payload = JWTAuth::parseToken()->getPayload();
            if ($payload->get('guard') !== $guard) {
                return ApiResource::message('Không tìm thấy AccessToken hợp lệ', Response::HTTP_UNAUTHORIZED);
            }
            JWTAuth::parseToken()->authenticate();
        } catch (TokenInvalidException $e) {
            return ApiResource::message($e->getMessage(), Response::HTTP_UNAUTHORIZED);
        } catch (\Throwable $th) {
            return ApiResource::message($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return $next($request);
    }
}
