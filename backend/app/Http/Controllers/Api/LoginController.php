<?php

namespace App\Http\Controllers\Api;

use App\Actions\Auth\LoginUserHandler;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Requests\Api\Auth\LoginRequest;

class LoginController extends Controller
{
    public function __invoke(LoginRequest $request)
    {
        $loginUserHandler = (new LoginUserHandler($request))->handle();

        return response()->json([
            'token' => $loginUserHandler->accessToken->plainTextToken,
            'user' => new UserResource($loginUserHandler->user),
            'message' => $loginUserHandler->message,
        ]);
    }
}
