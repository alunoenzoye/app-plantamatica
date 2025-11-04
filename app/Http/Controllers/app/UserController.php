<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request, $id) {
        $user = User::findOrFail($id);

        if ($request->wantsJson()) {
            $data = new UserResource($user);
            return $data->toJson();
        }

        return redirect()->route('dashboard');
    }
}
