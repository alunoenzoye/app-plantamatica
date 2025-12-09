<?php

namespace App\Enums;

use Spatie\Enum\Laravel\Enum;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
enum TaskPriorityEnum: string
{
    case low = "low";
    case medium = "medium";
    case high = "high";
}
