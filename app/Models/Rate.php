<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Cache;

/**
 * App\Models\Rate
 *
 * @property int $id
 * @property int $currency_id
 * @property string $rate
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Currency $currency
 * @method static \Database\Factories\RateFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Rate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Rate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Rate query()
 * @method static \Illuminate\Database\Eloquent\Builder|Rate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rate whereCurrencyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rate whereRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rate whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Rate extends Model
{
    use HasFactory;

    protected $fillable = [
        'rate',
        'last_updated'
    ];

    protected static function boot(): void
    {
        parent::boot();

        // Clear cache on create, update and delete
        static::saved(function ($rate) {
            Cache::forget('currencyStats_' . $rate->currency->code);
        });

        static::deleted(function ($rate) {
            Cache::forget('currencyStats_' . $rate->currency->code);
        });
    }

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class);
    }
}
