<?php

namespace Database\Seeders;

use App\Enums\RolesEnum;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        User::create([
            'name' => 'user',
            'email' => 'user@email.com',
            'password' => Hash::make('12345678'),
        ])->assignRole([RolesEnum::user->value]);

        User::create([
            'name' => 'maintenance',
            'email' => 'maintenance@email.com',
            'password' => Hash::make('12345678'),
        ])->assignRole([RolesEnum::maintenance->value]);

        User::create([
            'name' => 'principal',
            'email' => 'principal@email.com',
            'password' => Hash::make('12345678'),
        ])->assignRole([RolesEnum::principal->value]);

        User::create([
            'name' => 'admin',
            'email' => 'admin@email.com',
            'password' => Hash::make('12345678'),
        ])->assignRole([RolesEnum::super_admin->value]);
    }
}
