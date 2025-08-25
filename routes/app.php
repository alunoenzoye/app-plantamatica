<?php

use App\Http\Controllers\app\TaskController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function() {
    Route::get('painel', function() {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('tarefas', [TaskController::class, 'index'])->name('tarefas');
    // Route::post('tarefas', [TaskController::class, 'create'])->name('tarefas');
});
