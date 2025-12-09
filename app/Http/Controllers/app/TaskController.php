<?php

namespace App\Http\Controllers\app;

use App\Data\TaskData;
use App\Http\Controllers\Controller;
use App\Http\Requests\App\AddMediaRequest;
use App\Http\Requests\app\TaskRequest as AppTaskRequest;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    //
    public function index() {
        $tasks = TaskData::collect(Task::all());

        return Inertia::render('app/tasks', [
            'tasks' => $tasks
        ]);
    }

    public function create(AppTaskRequest $task) {
        Task::create([
            'creator_id' => Auth::id(),
            'name' => $task->input('name'),
            'priority' => $task->input('priority'),
            'due_date' => $task->input('due_date'),
            'description' => $task->input('description'),
        ]);


        return redirect()->back();
    }

    public function add_image(Task $task, AddMediaRequest $request) {
        $task->addMedia($request->image)->toMediaCollection('images');
    }
}
