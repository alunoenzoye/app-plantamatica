<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class CallData extends Data
{
    public function __construct(
        public int $id,
        public int $creator_id,
        public string $name,
        public Optional|string $description
        //
    ) {}
}
