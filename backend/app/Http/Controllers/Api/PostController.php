<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Actions\Post\StorePostHandler;
use App\Actions\Post\UpdatePostHandler;
use App\Actions\Post\DestroyPostHandler;
use App\Http\Requests\Api\Post\StorePostRequest;
use App\Http\Requests\Api\Post\UpdatePostRequest;

class PostController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Post::class, 'post');
    }

    public function index(Request $request)
    {
        return PostResource::collection($request->user()->posts()->get());
    }

    public function store(StorePostRequest $request)
    {
        $storePostHandler = (new StorePostHandler($request, $request->user()))->handle();

        return response()->json([
            'post' => new PostResource($storePostHandler->post),
            'message' => $storePostHandler->message
        ]);
    }

    public function show(Post $post)
    {
        return new PostResource($post);
    }

    public function update(UpdatePostRequest $request, Post $post)
    {
        $updatePostHandler = (new UpdatePostHandler($request, $request->user(), $post))->handle();

        return response()->json([
            'post' => new PostResource($updatePostHandler->post),
            'message' => $updatePostHandler->message
        ]);
    }

    public function destroy(Request $request, Post $post)
    {
        $destroyPostHandler = (new DestroyPostHandler($request, $request->user(), $post))->handle();

        return response()->json([
            'id' => $destroyPostHandler->id,
            'message' => $destroyPostHandler->message,
        ]);
    }
}
