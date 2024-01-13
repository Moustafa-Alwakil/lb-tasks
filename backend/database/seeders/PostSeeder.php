<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (User::all() as $user) {
            $user->posts()->createMany([
                [
                    'title' => fake()->realText(50),
                    'body' => fake()->realText(10000),
                ],
                [
                    'title' => fake()->realText(50),
                    'body' => fake()->realText(10000),
                ],
                [
                    'title' => fake()->realText(50),
                    'body' => fake()->realText(10000),
                ],
                [
                    'title' => fake()->realText(50),
                    'body' => fake()->realText(10000),
                ],
                [
                    'title' => fake()->realText(50),
                    'body' => fake()->realText(10000),
                ],
                [
                    'title' => fake()->realText(50),
                    'body' => fake()->realText(10000),
                ],
                [
                    'title' => fake()->realText(50),
                    'body' => fake()->realText(1000),
                ],
                [
                    'title' => fake()->realText(50),
                    'body' => fake()->realText(10000),
                ],
                [
                    'title' => fake()->realText(50),
                    'body' => fake()->realText(10000),
                ],
                [
                    'title' => fake()->realText(50),
                    'body' => fake()->realText(10000),
                ],
            ]);
        }
    }
}
