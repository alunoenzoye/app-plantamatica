<?php

namespace App\Data;

use App\Enums\TaskPriorityEnum;
use App\Models\Task;
use App\OptionalIfNull;
use Carbon\CarbonImmutable;
use MatanYadaev\EloquentSpatial\Objects\Point;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Spatie\LaravelData\Attributes\Validation\Enum;
use Spatie\LaravelData\Optional;
use Spatie\TypeScriptTransformer\Attributes\Optional as TypeScriptOptional;
use Spatie\LaravelData\Attributes\DataCollectionOf;

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
        public bool $done,
        /** @var ImageData[] */
        public array $images = [],
    ) {}

    public static function fromModel(Task $task): self
    {
        $position = null;
        if ($task->position != null) {
            $coordinates = $task->position->getCoordinates();
            $position = new PositionData(
                $coordinates[1],
                $coordinates[0]
            );
        }
        $due_date = null;
        if ($task->due_date != null) {
            $due_date = $task->due_date->toImmutable();
        }

        $task_data = new self(
            $task->id,
            $task->creator_id,
            $task->name,
            TaskPriorityEnum::from($task->priority),
            OptionalIfNull::create($due_date),
            OptionalIfNull::create($task->description),
            OptionalIfNull::create($position),
            $task->done,
        );

        $task_images = $task->getMedia('images');
        foreach ($task_images as $image) {
            array_push($task_data->images, new ImageData(
                $image->id,
                $image->name,
                $image->getFullUrl(),
            ));
        }

        return $task_data;
    }
}
