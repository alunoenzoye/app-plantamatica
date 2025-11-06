<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Http\Requests\CallRequest;
use App\Models\Call;
use Auth;

class CallController extends Controller
{
    public function index() {
        $calls = Call::all();

        return Inertia::render('app/calls', [
            'calls' => $calls
        ]);
    }

    public function create(CallRequest $request) {
        Call::create([
            'creator_id' => Auth::id(),
            'name' => $request->input('name'),
            'description' => $request->input('description'),
        ]);

        return redirect()->back();
    }

    public function delete(Call $call) {
        $call->delete();

        return redirect()->back();
    }
}
