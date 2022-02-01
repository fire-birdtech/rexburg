<?php

namespace App\Models;

use App\Traits\HasVerificationCode;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Claim extends Model
{
    use HasFactory, HasVerificationCode;

    protected $fillable = [
        'claimable_id',
        'claimable_type',
        'user_id',
        'verification_code',
    ];

    /**
     * Get the parent claimable model (only housing for now).
     */
    public function claimable()
    {
        return $this->morphTo();
    }

    /**
     * Get the user who submitted the claim
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    
}
