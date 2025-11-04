<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Http\Requests\app\CompleteTaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;

class CompleteTaskController extends Controller
{
    //
        public function complete(CompleteTaskRequest $request, Task $task)
    {
        // dd($request);

        $task->update([
            'done' => $request->input('done')
        ]);

        return redirect()->back();
    }
}
