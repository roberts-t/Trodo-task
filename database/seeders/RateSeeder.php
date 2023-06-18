<?php

namespace Database\Seeders;

use App\Models\Rate;
use Database\Factories\RateFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Rate::factory()->count(100)->make();
    }
}
