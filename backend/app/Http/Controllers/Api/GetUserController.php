<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;

class GetUserController extends Controller
{
    public function __invoke(Request $request)
    {
        return UserResource::collection(User::all());
    }
}
