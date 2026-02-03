<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\BaseController;
use App\Services\SettingService;

class SettingController extends BaseController
{
    protected $service;
    public function __construct(SettingService $service)
    {
        $this->service = $service;
    }
}
