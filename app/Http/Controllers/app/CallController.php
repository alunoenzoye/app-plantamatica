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

    public function create(CallRequest $call) {
        Call::create([
            'creator_id' => Auth::id(),
            'name' => $call->input('name'),
            'description' => $call->input('description'),
        ]);

        return redirect()->back();
    }
}
