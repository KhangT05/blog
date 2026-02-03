<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\Role\StoreRoleRequest;
use App\Services\RoleService;

class RoleController extends BaseController
{
    public function __construct(RoleService $service)
    {
        return parent::__construct($service);
    }
    public function store(StoreRoleRequest $request)
    {
        dd($this->save($request));
        return $this->save($request);
    }
}
