<?php

use App\Enums\PermissionsEnum;
use App\Http\Controllers\app\ApproveCallController;
use App\Http\Controllers\app\TaskController;
use App\Http\Controllers\app\CompleteTaskController;
use App\Http\Controllers\app\CallController;
use App\Http\Controllers\app\MapController;
use App\Http\Controllers\app\RefuseCallController;
use App\Http\Controllers\app\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Auth\Middleware\Authorize;
use App\Http\Controllers\app\DeleteMediaController;

Route::middleware('auth')->group(function () {
    Route::get('painel', function () {
        return Inertia::render('app/dashboard');
    })->name('dashboard');

    Route::get('creditos', function() {
        return Inertia::render('app/credits');
    });

    Route::group(['middleware' => [Authorize::using(PermissionsEnum::tasks_index->value)]], function () {
        Route::get('tarefas', [TaskController::class, 'index'])->name('tasks.index');
    });
    Route::group(['middleware' => [Authorize::using(PermissionsEnum::tasks_complete->value)]], function () {
        Route::patch('tarefas/{task}/completar', [CompleteTaskController::class, 'complete'])->name('tasks.complete');
    });

    Route::get('/user/{id}', [UserController::class, 'index'])->name('user.index');

    Route::group(['middleware' => [Authorize::using(PermissionsEnum::media_add->value)]], function () {
        Route::post('chamados/{call}/add-attachment', [CallController::class, 'add_image'])->name('calls.add-image');
        Route::post('tarefas/{task}/add-attachment', [TaskController::class, 'add_image'])->name('tasks.add-image');
    });
    Route::group(['middleware' => [Authorize::using(PermissionsEnum::media_delete->value)]], function () {
        Route::post('/media/delete', [DeleteMediaController::class, 'delete'])->name('media.delete');
    });

    Route::get('chamados', [CallController::class, 'index'])->name('calls.index');
    Route::post('chamados', [CallController::class, 'create'])->name('calls.create');
    Route::group(['middleware' => [Authorize::using(PermissionsEnum::calls_delete->value)]], function () {
        Route::delete('chamados/{call}', [CallController::class, 'delete'])->name('calls.delete');
    });
    Route::group(['middleware' => [Authorize::using(PermissionsEnum::calls_manage->value)]], function () {
        Route::post('chamados/{call}/approve', [ApproveCallController::class, 'approve'])->name('calls.approve');
        Route::post('chamados/{call}/refuse', [RefuseCallController::class, 'refuse'])->name('calls.refuse');
    });

    Route::get('planta', [MapController::class, 'index'])->name('map.index');
});
