<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();

        $roles = [
            [
                'name' => 'Admin',
                'canonical' => 'admin',
                'description' => 'Quản trị viên hệ thống, có quyền quản lý hầu hết các chức năng',
                'publish' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Member',
                'canonical' => 'member',
                'description' => 'Khách hàng, có quyền xem bài và hồ sơ cá nhân.',
                'publish' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ];
        DB::table('roles')->insert($roles);
    }
}
