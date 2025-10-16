<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CallController extends Controller
{
    public function index() {
        return Inertia::render('app/calls');
    }
}
