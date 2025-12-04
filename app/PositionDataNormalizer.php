<?php

namespace App;

use App\Data\PositionData;
use MatanYadaev\EloquentSpatial\Objects\Point;
use Spatie\LaravelData\Normalizers\Normalized\Normalized;
use Spatie\LaravelData\Normalizers\Normalizer;

class PositionDataNormalizer implements Normalizer
{
    /**
     * Create a new class instance.
     */
    public function normalize(mixed $value): null|array|Normalized {
        if (! $value instanceof Point) {
            return null;
        }

        $coordinates = $value->getCoordinates();
        return new PositionData(
            $coordinates[0],
            $coordinates[1],
        )->toArray();
    }
}
