<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HousingController extends Controller
{
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
