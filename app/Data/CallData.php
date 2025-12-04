<?php

namespace App\Data;

use MatanYadaev\EloquentSpatial\Objects\Point;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use App\PositionDataTransformer;

#[TypeScript]
class CallData extends Data
{
    public function __construct(
        public int $id,
        public int $creator_id,
        public string $name,
        public Optional|string $description,
        public Optional|PositionData $position
        //
    ) {}
}
