<?php

namespace App\Actions\Post;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class StorePostHandler
{
    public Post $post;
    public string $message;

    public function __construct(
        public Request $request,
        public User $user,
    ) {
        //
    }

    public function handle(): self
    {
        $this->post = new Post;

        $this->post->title = $this->request->get('title');
        $this->post->body = $this->request->get('body');
        $this->post->user_id = $this->request->user()->id;

        $this->post->save();

        $this->message = 'Post Has Been Created Successfully.';

        return $this;
    }
}
