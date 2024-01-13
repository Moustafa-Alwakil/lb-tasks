<?php

namespace App\Actions\Post;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class DestroyPostHandler
{
    public int $id;
    public string $message;

    public function __construct(
        public Request $request,
        public User $user,
        public Post $post
    ) {
        $this->id = $post->id;
    }

    public function handle(): self
    {
        $this->post->delete();

        $this->message = 'Post Has Been Deleted Successfully.';

        return $this;
    }
}
