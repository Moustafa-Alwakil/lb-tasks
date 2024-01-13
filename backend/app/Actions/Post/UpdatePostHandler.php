<?php

namespace App\Actions\Post;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class UpdatePostHandler
{
    public string $message;

    public function __construct(
        public Request $request,
        public User $user,
        public Post $post
    ) {
        //
    }

    public function handle(): self
    {
        $this->post->title = $this->request->get('title');
        $this->post->body = $this->request->get('body');

        $this->post->save();

        $this->message = 'Post Has Been Updated Successfully.';

        return $this;
    }
}
