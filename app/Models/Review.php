<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'body',
        'rating',
        'reviewable_id',
        'reviewable_type',
        'user_id',
    ];

    /**
     * Get the parent commentable model (only housing for now).
     */
    public function reviewable()
    {
        return $this->morphTo();
    }
}
