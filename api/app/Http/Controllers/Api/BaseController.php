<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\BaseService;
use Illuminate\Http\Request;

class BaseController extends Controller
{
    protected $service;
    public function __construct(
        BaseService $service
    ) {
        $this->service = $service;
    }
    public function save(Request $request, ?int $id = 0)
    {
        try {
            $response = $this->service->baseSave($request, $id);
            return $response;
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    // public function show(int $id = 0)
    // {
    //     // return 
    // }
}
