<?php

namespace App\Http\Controllers\Api;

use App\Actions\Auth\RegisterUserHandler;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Auth\RegisterRequest;
use App\Http\Resources\UserResource;

class RegisterController extends Controller
{
    public function __invoke(RegisterRequest $request)
    {
        $registerUserHandler = (new RegisterUserHandler($request))->handle();

        return response()->json([
            'user' => new UserResource($registerUserHandler->user),
            'message' => $registerUserHandler->message
        ]);
    }
}
