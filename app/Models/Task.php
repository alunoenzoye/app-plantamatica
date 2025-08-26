<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $creator_id
 * @property string $name
 * @property string $priority
 * @property \Illuminate\Support\Carbon|null $due_date
 * @property string|null $description
 * @property int $done
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Task newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Task newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Task query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Task whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Task whereCreatorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Task whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Task whereDone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Task whereDueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Task whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Task whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Task wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Task whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Task extends Model
{
    protected $fillable = [
        'creator_id',
        'name',
        'priority',
        'due_date',
        'description',
        'done'
    ];

    protected function casts(): array {
        return [
            'due_date' => 'date',
            'done' => 'boolean'
        ];
    }
    //
}
