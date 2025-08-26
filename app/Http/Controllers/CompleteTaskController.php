<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class CompleteTaskController extends Controller
{
    //
    public function complete(Task $task)
    {
        // dd($task);

        $task->update([
            'done' => true
        ]);

        return redirect()->back();
    }
}
