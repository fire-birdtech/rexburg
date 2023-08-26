<?php

namespace App\Http\Controllers;

use App\Rexburg;
use Illuminate\Support\Str;
use Inertia\Response;
use Inertia\ResponseFactory;

class TermsOfServiceController extends Controller
{
    public function __invoke(): Response|ResponseFactory
    {
        $termsFile = Rexburg::localizedMarkdownPath('terms.md');

        return inertia('TermsOfService', [
            'terms' => Str::markdown(file_get_contents($termsFile)),
        ]);
    }
}
