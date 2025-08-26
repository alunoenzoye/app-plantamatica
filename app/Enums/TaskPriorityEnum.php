<?php

namespace App\Enums;

use Spatie\Enum\Laravel\Enum;

/**
*@var string se
*
*
*
*/
enum TaskPriorityEnum: string {
    case low = "low";
    case medium = "medium";
    case high = "high";
}
