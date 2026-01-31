<?php

namespace App\Repositories;

use App\Models\RefreshToken;
use Illuminate\Database\Eloquent\Model;

class RefreshTokenRepository extends BaseRepository
{
    public function __construct(
        RefreshToken $model
    ) {
        $this->model = $model;
    }
    public function findRefreshTokenInvalid(string $refresh_token = '')
    {
        return $this->model
            ->where('refresh_token', $refresh_token)
            ->whereDate('expires_at', '>', now())
            ->where('is_revoked', false)->first();
    }
    public function revokeAllUserRefreshToken(int $user_id = 0)
    {
        return $this->model->where('user_id', $user_id)
            ->where('is_revoked', false)
            ->update('is_revoked', true);
    }
}
