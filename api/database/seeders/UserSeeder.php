<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()
            ->count(5)
            ->create()
            ->each(function ($user) {
                $adminRole = Role::where('canonical', 'admin')->first();
                $user->role()->attach($adminRole->id);
            });
        User::factory()
            ->count(45)
            ->create()
            ->each(function ($user) {
                $memberRole = Role::where('canonical', 'member')->first();
                $user->role()->attach($memberRole->id);
            });
    }
}
