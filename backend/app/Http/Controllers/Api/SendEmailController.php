<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Jobs\SendEmailJob;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;

class SendEmailController extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'users_ids' => 'required|array',
            'users_ids.*' => [Rule::exists(User::class, 'id')],
            'body' => 'required|string'
        ]);

        $users = User::query()
            ->whereIn('id', $request->get('users_ids'))
            ->get();

        foreach ($users as $user) {
            SendEmailJob::dispatch($user, $request->get('body'));
        }

        return response()->json([
            'message' => 'Emails are being send',
        ]);
    }
}
