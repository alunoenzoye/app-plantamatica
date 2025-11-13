<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\Call;
use Illuminate\Http\Request;

class RefuseCallController extends Controller
{
    public function refuse(Call $call)
    {
        $call->deleteOrFail();

        return redirect()->back();
    }
}
