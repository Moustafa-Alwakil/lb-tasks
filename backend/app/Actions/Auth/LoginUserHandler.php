<?php

namespace App\Actions\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Sanctum\NewAccessToken;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class LoginUserHandler
{
    public User $user;
    public string $message;
    public NewAccessToken $accessToken;

    public function __construct(
        public Request $request,
    ) {
    }

    public function handle(): self
    {
        $this->user = User::query()
            ->where('email', $this->request->get('email'))
            ->firstOr(fn () => abort(Response::HTTP_UNPROCESSABLE_ENTITY, 'This email does not exists.'));

        $this->checkPassword();

        $this->login();

        $this->message = 'User logged in successfully.';

        return $this;
    }

    private function checkPassword(): void
    {
        if (!Hash::check($this->request->get('password'), $this->user->password)) {
            abort(Response::HTTP_UNPROCESSABLE_ENTITY, 'These credentials do not match our records.');
        }
    }

    private function login(): void
    {
        $this->accessToken = $this->user->createToken($this->request->get('device_name'));
    }
}
