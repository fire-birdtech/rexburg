<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Manage extends Model
{
    use HasFactory;

    protected $fillable = [
        'manageable_id',
        'manageable_type',
        'user_id',
    ];

    /**
     * Get the parent manageable model.
     */
    public function manageable()
    {
        return $this->morphTo();
    }

    /**
     * Get the user who manages the manageable.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
