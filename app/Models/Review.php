<?php

namespace App\Models;

use App\Traits\UpdatesScore;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory, UpdatesScore;

    protected $fillable = [
        'body',
        'rating',
        'reviewable_id',
        'reviewable_type',
        'user_id',
    ];

    /**
     * Get the parent reviewable model (only housing for now).
     */
    public function reviewable()
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
