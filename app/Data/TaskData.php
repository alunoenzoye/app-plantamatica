<?php

namespace App\Data;

use App\Enums\TaskPriorityEnum;
use Carbon\CarbonImmutable;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Spatie\LaravelData\Attributes\Validation\Enum;
use Spatie\LaravelData\Optional;
use Spatie\TypeScriptTransformer\Attributes\Optional as TypeScriptOptional;

#[TypeScript]
class TaskData extends Data
{
    public function __construct(
        //
        public int $id,
        public int $creator_id,
        public string $name,
        #[Enum(TaskPriorityEnum::class)]
        public TaskPriorityEnum $priority,
        public Optional|CarbonImmutable $due_date,
        public Optional|string $description,
        public Optional|PositionData $position,
        public bool $done
    ) {}
}
