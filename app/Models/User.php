<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use HasProfilePhoto;
    use Notifiable;
    use TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
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
        return $this->belongsToMany(Housing::class);
    }

    /**
     * Get the reviews that the user made
     */
    public function reviews()
    {
        return $this->hasMany(Review::class)->with('reviewable');
    }

    /**
     * Get the housings which the user manages
     */
    public function managed()
    {
        return $this->hasMany(Housing::class);
    }

    /**
     * Get the user's claims
     */
    public function claims()
    {
        return $this->hasMany(Claim::class);
    }
}
