<?php

namespace Database\Seeders;

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
        for ($i = 1; $i <= 10; $i++) {
            User::query()->firstOrCreate(
                [
                    'email' => "user$i@test.com",
                ],
                [
                    'name' => "user #$i",
                    'password' => "Password@1234",
                ]
            );
        }
    }
}
