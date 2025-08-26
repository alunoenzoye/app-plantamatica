<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Http\Requests\app\TaskRequest as AppTaskRequest;
use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    //
    public function index() {
        $tasks = Task::all();

        return Inertia::render('app/tasks', [
            'tasks' => $tasks
        ]);
    }

    public function create(AppTaskRequest $task) {
        // dd($task);

        Task::create([
            'creator_id' => Auth::id(),
            'name' => $task->input('name'),
            'priority' => $task->input('priority'),
            'due_date' => $task->input('due_date'),
            'description' => $task->input('description'),
        ]);


        return redirect()->back();
    }
}
