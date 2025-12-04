<?php

namespace App\Http\Controllers\app;

use App\Data\CallData;
use App\Data\TaskData;
use App\Http\Controllers\Controller;
use App\Models\Call;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MapController extends Controller
{
    public function index()
    {
        $calls = CallData::collect(Call::query()->whereNotNull('position')->get());
        $tasks = TaskData::collect(Task::query()->whereNotNull('position')->where('done', false)->get());

        return Inertia::render('app/map', [
            "calls" => $calls->toArray(),
            "tasks" => $tasks->toArray(),
        ]);
    }
}
