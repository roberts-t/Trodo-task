<?php

namespace Database\Factories;

use App\Models\Rate;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rate>
 */
class RateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $currencyLength = count(\Config::get('global.available_currencies'));
        return [
            Rate::create([
                'currency_id' => $this->faker->numberBetween(1, $currencyLength),
                'rate' => $this->faker->randomFloat(4, 0, 100),
                'last_updated' => $this->faker->dateTimeBetween('-1 year', 'now'),
            ]),
        ];
    }
}
