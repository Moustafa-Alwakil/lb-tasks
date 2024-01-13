<?php

use App\Models\User;
use App\Jobs\SendEmailJob;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('test', function () {
    $users = User::all();

    foreach ($users as $user) {
        SendEmailJob::dispatch($user, 'cool content cool content cool content cool content');
    }

    return 'ff';
});
