<?php

namespace App\Models;

use App\Enums\ClaimStatus;
use App\Traits\HasVerificationCode;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Claim extends Model
{
    use HasFactory, HasVerificationCode;

    protected $fillable = [
        'claimable_id',
        'claimable_type',
        'status',
        'user_id',
        'verification_code',
        'street_address',
        'city',
        'postal_code',
    ];

    /**
     * Get the parent claimable model (only housing for now).
     */
    public function claimable(): MorphTo
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

    /**
     * Get the pending claims
     */
    public function scopeApproved($query)
    {
        $query->where('status', ClaimStatus::APPROVED);
    }
}
