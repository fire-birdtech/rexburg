<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Claim extends Model
{
    use HasFactory;

    /**
     * Get the parent claimable model (only housing for now).
     */
    public function claimable()
    {
        return $this->morphTo();
    }
}
