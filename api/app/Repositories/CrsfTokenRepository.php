<?php

namespace App\Repositories;

use App\Models\CrsfToken;

class CrsfTokenRepository extends BaseRepository
{
    public function __construct(
        CrsfToken $model
    ) {
        $this->model = $model;
    }
    public function findByCrsfToken(string $crsf_token = '')
    {
        return $this->model->where('crsf_token', $crsf_token)->first();
    }
    public function deleteCrsfTokenByUserId(int $user_id = 0): bool
    {
        return $this->model->where('user_id', $user_id)->delete();
    }
}
