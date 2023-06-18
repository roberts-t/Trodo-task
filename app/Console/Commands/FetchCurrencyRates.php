<?php

namespace App\Console\Commands;

use App\Models\Currency;
use Carbon\Carbon;
use Config;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class FetchCurrencyRates extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetch:currency-rates';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch currency exchange rates from the AnyAPI service and store them in the database.';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        // Fetch the currency rates from the AnyAPI service.
        $apiResponse = Http::withUrlParameters([
            'endpoint' => 'https://anyapi.io/api/v1/exchange/rates',
            'base' => 'EUR',
            'apiKey' => env('ANY_API_KEY'),
        ])->get('{+endpoint}?base={+base}&apiKey={+apiKey}');

        if (!$apiResponse->ok()) {
            $this->error('Failed to fetch currency rates from the AnyAPI service.');
            return;
        }

        $ratesToCheck = Config::get('global.available_currencies');
        $rates = $apiResponse->json('rates');
        $lastUpdate = $apiResponse->json('lastUpdate');

        // Loop through the needed currencies and check if they are available in the response from the AnyAPI service.
        foreach ($ratesToCheck as $currencyCode) {
            if (!isset($rates[$currencyCode])) {
                $this->error("Currency code {$currencyCode} is not available in the response from the AnyAPI service.");
                continue;
            }

            $rate = $rates[$currencyCode];

            $currency = Currency::firstOrCreate([
                'code' => $currencyCode,
            ]);

            // Before saving the last_updated, convert the timestamp returned by the service to a Carbon instance.
            $currency->rates()->create([
                'rate' => $rate,
                'last_updated' => Carbon::createFromTimestamp($lastUpdate),
            ]);
        }

        $this->info('Successfully fetched currency rates from the AnyAPI service.');
    }
}
