<?php

use App\Enums\PermissionsEnum;
use App\Http\Controllers\app\TaskController;
use App\Http\Controllers\CallController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CompleteTaskController;
use Illuminate\Auth\Middleware\Authorize;

Route::middleware('auth')->group(function () {
    Route::get('painel', function () {
        return Inertia::render('app/dashboard');
    })->name('dashboard');

    Route::group(['middleware' => [Authorize::using(PermissionsEnum::tasks_index->value)]], function () {
        Route::get('tarefas', [TaskController::class, 'index'])->name('tasks.index');
    });
    Route::group(['middleware' => [Authorize::using(PermissionsEnum::tasks_complete->value)]], function () {
        Route::patch('tarefas/{task}/completar', [CompleteTaskController::class, 'complete'])->name('tasks.complete');
    });

    Route::get('chamados', [CallController::class, 'index'])->name('chamados.index');
});
