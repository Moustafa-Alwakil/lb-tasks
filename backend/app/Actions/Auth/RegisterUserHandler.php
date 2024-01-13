<?php

namespace App\Actions\Auth;

use App\Models\User;
use Illuminate\Http\Request;

class RegisterUserHandler
{
    public User $user;
    public string $message;

    public function __construct(
        public Request $request,
    ) {
    }

    public function handle(): self
    {
        $this->user = new User;

        $this->user->name = $this->request->get('name');
        $this->user->email = $this->request->get('email');
        $this->user->password = $this->request->get('password');

        $this->user->save();

        $this->message = 'You Have Been Registered Successfully.';

        return $this;
    }
}
