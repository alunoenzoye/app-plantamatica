<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript()]
class PositionData extends Data
{
    public function __construct(
        //
        public int $x,
        public int $y
    ) {}
}
