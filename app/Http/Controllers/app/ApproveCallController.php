<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Http\Requests\App\ApproveCallRequest;
use App\Models\Call;
use App\Models\Task;
use DB;

class ApproveCallController extends Controller
{
    public function approve(Call $call, ApproveCallRequest $request)
    {
        try {
            DB::beginTransaction();

            $task = Task::create([
                'creator_id' => $call->creator_id,
                'name' => $call->name,
                'priority' => $request->input('priority'),
                'due_date' => $request->input('due_date'),
                'position' => $call->position,
                'description' => $request->input('description'),
            ]);

            $call_images = $call->getMedia('images');
            foreach ($call_images as $image) {
                $image->move($task, 'images');
            }
            $call->deleteOrFail();

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
        }

        return redirect()->back();
    }
}
