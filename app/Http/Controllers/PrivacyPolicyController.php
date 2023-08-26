<?php

namespace App\Http\Controllers;

use App\Rexburg;
use Illuminate\Support\Str;
use Inertia\Response;
use Inertia\ResponseFactory;

class PrivacyPolicyController extends Controller
{
    public function __invoke(): Response|ResponseFactory
    {
        $policyFile = Rexburg::localizedMarkdownPath('policy.md');

        return inertia('PrivacyPolicy', [
            'policy' => Str::markdown(file_get_contents($policyFile)),
        ]);
    }
}
