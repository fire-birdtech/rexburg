<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Housing extends Model
{
    use HasFactory;

    protected $fillable = [
        'about',
        'amenities',
        'bathroom_range',
        'bedroom_range',
        'city',
        'email_address',
        'housing_type',
        'name',
        'phone_number',
        'postal_code',
        'rent_range',
        'slug',
        'street',
        'tenant_rating',
        'website_url',
    ];
}
