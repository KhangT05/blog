<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Resources\ApiResource;
use App\Services\UserService;

class UserController extends BaseController
{
    public function __construct(UserService $service)
    {
        return parent::__construct($service);
    }
    public function store(StoreUserRequest $request)
    {
        dd($this->save($request));
        return $this->save($request);
    }
    public function show(int $id = 0)
    {
        $response = $this->service->show($id);
        return ApiResource::ok($response, 'Lấy dữ liệu thành công');
    }
}
