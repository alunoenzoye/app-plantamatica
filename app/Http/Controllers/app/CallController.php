<?php

namespace App\Http\Controllers\app;

use App\Data\CallData;
use App\Data\PositionData;
use App\Http\Controllers\Controller;
use App\Http\Requests\App\AddMediaRequest;
use Inertia\Inertia;
use App\Http\Requests\CallRequest;
use App\Models\Call;
use Auth;
use MatanYadaev\EloquentSpatial\Objects\Point;

class CallController extends Controller
{
    public function index()
    {
        $calls = CallData::collect(Call::all());

        return Inertia::render('app/calls', [
            'calls' => $calls,
        ]);
    }

    public function create(CallRequest $request)
    {
        $position = $request->input('position', null);
        if ($position != null) {
            $position = new Point($position['x'], $position['y']);
        }

        $call = Call::create([
            'creator_id' => Auth::id(),
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'position' => $position
        ]);

        $images = $request->file('images');
        if ($images != null) {
            foreach ($images as $image) {
                $call->addMedia($image)->toMediaCollection('images');
            }
        }

        return redirect()->back();
    }

    public function add_image(Call $call, AddMediaRequest $request) {
        $call->addMedia($request->image)->toMediaCollection('images');
    }

    public function delete(Call $call)
    {
        $call->delete();

        return redirect()->back();
    }
}
