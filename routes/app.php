<?php

use App\Http\Controllers\app\TaskController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CompleteTaskController;

Route::middleware('auth')->group(function() {
    Route::get('painel', function() {
        return Inertia::render('app/dashboard');
    })->name('dashboard');

    Route::get('tarefas', [TaskController::class, 'index'])->name('tasks.index');
    Route::post('tarefas', [TaskController::class, 'create'])->name('tasks.create');

    Route::patch('tarefas/{task}/completar', [CompleteTaskController::class, 'complete'])->name('tasks.complete');
});
