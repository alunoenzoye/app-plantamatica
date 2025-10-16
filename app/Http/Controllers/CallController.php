<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Requests\CallRequest;
use App\Models\Call;
use Auth;

class CallController extends Controller
{
    public function index() {
        return Inertia::render('app/calls');
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
