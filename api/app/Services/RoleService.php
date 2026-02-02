<?php

namespace App\Services;

use App\Repositories\RoleRepository;
use Illuminate\Http\Request;

class RoleService extends BaseService
{
    public function __construct(
        RoleRepository $repository
    ) {
        $this->repository = $repository;
    }
    protected function perpageModelData(Request $request): self
    {
        return $this->initialBasicData($request);
    }
    public function initialBasicData(Request $request)
    {
        $payload = $this->repository->getFillable();
        $request->only($payload);
        return $this;
    }
}
