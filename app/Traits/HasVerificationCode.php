<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

trait HasVerificationCode
{
    public static function bootHasVerificationCode()
    {
        static::creating(function (Model $model) {
            $model->generateVerificationCode();
        });
    }

    public function generateVerificationCode()
    {
        $this->verification_code = Str::random(8);
    }
}