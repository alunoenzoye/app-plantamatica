<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MapController extends Controller
{
    public function index() {
        return Inertia::render('app/map');
    }
}
