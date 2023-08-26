<?php

namespace App\Models;

use App\Traits\HasProfilePhoto;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory;
    use HasProfilePhoto;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'suspended_until',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'profile_photo_url',
    ];

    /**
     * The roles that belong to the user
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    /**
     * Check that the user has a specified role
     */
    public function hasRole($role)
    {
        if ($this->roles()->where('name', $role)->first()) {
            return true;
        }

        return false;
    }

    /**
     * Get the housings that the user has lived at
     */
    public function housings()
    {
        return $this->morphedByMany(Housing::class, 'manageable');
    }

    /**
     * Get the reviews that the user made
     */
    public function reviews()
    {
        return $this->hasMany(Review::class)->with('reviewable');
    }

    /**
     * Get the user's claims
     */
    public function claims()
    {
        return $this->hasMany(Claim::class);
    }

    /**
     * Get the user's suspensions
     */
    public function suspensions()
    {
        return $this->hasMany(UserSuspension::class);
    }

    public function views(): HasMany
    {
        return $this->hasMany(View::class);
    }

    /**
     * Get the entities that the model manages
     */
    public function managedHousings(): MorphToMany
    {
        return $this->morphedByMany(Housing::class, 'manageable');
    }
}
