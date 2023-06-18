<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use Cache;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CurrencyController extends Controller
{
    public function getCurrencyRates(Request $request, string $currencyCode = null): JsonResponse {
        $currency = Cache::rememberForever('currency_'. $currencyCode, function () use ($currencyCode) {
            return Currency::where('code', $currencyCode)->first();
        });

        if (!$currency) {
            return response()->json([], 404);
        }

        $sort = $request->get('sort', 'asc');

        $query = $currency->rates()->select('id', 'rate', 'last_updated');

        if ($sort === 'desc') {
            $query->orderBy('last_updated', 'DESC');
        } else {
            $query->orderBy('last_updated', 'ASC');
        }

        // Paginate the results
        $paginatedRates = $query->paginate(10, ['*'], 'p');

        return response()->json([
            'currency' => $currencyCode,
            'rates' => $paginatedRates->items(),
            'pagination' => [
                'current_page' => $paginatedRates->currentPage(),
                'last_page' => $paginatedRates->lastPage(),
                'per_page' => $paginatedRates->perPage(),
            ],
        ]);
    }

    public function getCurrencyStats(Request $request, string $currencyCode = null): JsonResponse {
        $currency = Cache::rememberForever('currency_'. $currencyCode, function () use ($currencyCode) {
            return Currency::where('code', $currencyCode)->first();
        });

        if (!$currency) {
            return response()->json([], 404);
        }

        $currencyStats = Cache::rememberForever('currencyStats_' . $currencyCode, function () use ($currency) {
            return $currency
                ->rates()
                ->selectRaw('max(rate) as max_rate, min(rate) as min_rate, avg(rate) as avg_rate, max(last_updated) as last_updated')
                ->first();
        });

        if (!$currencyStats) {
            return response()->json([], 404);
        }

        return response()->json([
            'currency' => $currencyCode,
            'max_rate' => $currencyStats->max_rate,
            'min_rate' => $currencyStats->min_rate,
            'avg_rate' => number_format($currencyStats->avg_rate, 4),
            'last_updated' => $currencyStats->last_updated,
        ]);
    }
}
