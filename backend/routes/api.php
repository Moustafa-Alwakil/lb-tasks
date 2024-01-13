<?php

use App\Http\Controllers\Api\GetUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\LogoutController;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\SendEmailController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('guest:sanctum')->group(function () {
    Route::post('register', RegisterController::class);
    Route::post('login', LoginController::class);
});


Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', LogoutController::class);
    Route::apiResource('posts', PostController::class);
    Route::post('send-mails', SendEmailController::class);
});

Route::get('get-users', GetUserController::class);
