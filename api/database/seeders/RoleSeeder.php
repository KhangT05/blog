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
                'name' => 'Super Admin',
                'canonical' => 'super-admin',
                'description' => 'Quyền quản trị cao nhất, có toàn quyền truy cập và quản lý hệ thống',
                'publish' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Admin',
                'canonical' => 'admin',
                'description' => 'Quản trị viên hệ thống, có quyền quản lý hầu hết các chức năng',
                'publish' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Manager',
                'canonical' => 'manager',
                'description' => 'Người quản lý, có quyền giám sát và quản lý nhân viên',
                'publish' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Editor',
                'canonical' => 'editor',
                'description' => 'Biên tập viên, có quyền tạo và chỉnh sửa nội dung',
                'publish' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Author',
                'canonical' => 'author',
                'description' => 'Tác giả, có quyền tạo và quản lý nội dung của riêng mình',
                'publish' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Contributor',
                'canonical' => 'contributor',
                'description' => 'Người đóng góp, có quyền tạo nội dung nhưng cần duyệt trước khi xuất bản',
                'publish' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Subscriber',
                'canonical' => 'subscriber',
                'description' => 'Người đăng ký, chỉ có quyền xem nội dung',
                'publish' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Customer',
                'canonical' => 'customer',
                'description' => 'Khách hàng, có quyền mua hàng và quản lý đơn hàng của mình',
                'publish' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Guest',
                'canonical' => 'guest',
                'description' => 'Khách, quyền truy cập hạn chế nhất',
                'publish' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ];

        DB::table('roles')->insert($roles);
    }
}
