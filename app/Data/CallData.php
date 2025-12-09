<?php

namespace App\Data;

use App\Models\Call;
use App\OptionalIfNull;
use MatanYadaev\EloquentSpatial\Objects\Point;
use Spatie\LaravelData\Attributes\DataCollectionOf;
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
        public Optional|string $description,
        public Optional|PositionData $position,
        /** @var ImageData[] */
        public array $images = [],

        //
    ) {}

    public static function fromModel(Call $call): self
    {
        $position = null;
        if ($call->position != null) {
            $coordinates = $call->position->getCoordinates();
            $position = new PositionData(
                $coordinates[1],
                $coordinates[0]
            );
        }

        $call_data = new self(
            $call->id,
            $call->creator_id,
            $call->name,
            OptionalIfNull::create($call->description),
            OptionalIfNull::create($position),
        );

        $call_images = $call->getMedia('images');
        foreach ($call_images as $image) {
            array_push($call_data->images, new ImageData(
                $image->id,
                $image->name,
                $image->getFullUrl(),
            ));
        }

        return $call_data;
    }
}
