<?php

namespace App\Models;

use App\Traits\HasCoverImage;
use App\Traits\HasProfileImage;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Venturecraft\Revisionable\RevisionableTrait;

class Housing extends Model
{
    use HasCoverImage, HasFactory, HasProfileImage, HasSlug, RevisionableTrait;

    protected $fillable = [
        'about',
        'amenities',
        'bathroom_range',
        'bedroom_range',
        'byui_approved',
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

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'cover_image_url',
        'profile_image_url',
        'score_description',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'byui_approved' => 'boolean',
    ];

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    protected $revisionCreationsEnabled = true;

    protected $dontKeepRevisionOf = ['score'];

    /**
     * Scope a query to only include single housing type.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSingleHousing($query)
    {
        return $query->where('housing_type', 'single');
    }

    /**
     * Scope a query to only include married housing type.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeMarriedHousing($query)
    {
        return $query->where('housing_type', 'married');
    }

    /**
     * Get all of the housing's reviews.
     */
    public function reviews()
    {
        return $this->morphMany(Review::class, 'reviewable');
    }

    /**
     * Get all of the housing's amenities.
     */
    public function amenities()
    {
        return $this->belongsToMany(Amenity::class);
    }

    /**
     * Get the housing's managers
     */
    public function managers()
    {
        return $this->morphToMany(User::class, 'manageable');
    }

    /**
     * Get the housing's claim
     */
    public function claim()
    {
        return $this->morphOne(Claim::class, 'claimable');
    }

    /**
     * Get the list of users who have lived in the housing
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function getScoreDescriptionAttribute(): string
    {
        if ($this->score >= 5) return 'Excellent';
        if ($this->score >= 4) return 'Great';
        if ($this->score >= 3) return 'Good';
        if ($this->score >= 2) return 'Okay';
        return 'Poor';
    }
}
