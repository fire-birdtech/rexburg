<?php

namespace App\Traits;

use App\Models\Business;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait HasProfileImage
{
    public function updateProfileImage(UploadedFile $photo): void
    {
        tap($this->profile_image_path, function ($previous) use ($photo) {
            $this->forceFill([
                'profile_image_path' => $photo->storePublicly(
                    'housing-profile-images', ['disk' => $this->profileImageDisk()]
                ),
            ])->save();

            if ($previous) {
                Storage::disk($this->profileImageDisk())->delete($previous);
            }
        });
    }

    public function deleteProfileImage(): void
    {
        Storage::disk($this->profileImageDisk())->delete($this->profile_image_path);

        $this->forceFill([
            'profile_image_path' => null,
        ])->save();
    }

    public function getProfileImageUrlAttribute(): string
    {
        return $this->profile_image_path
                    ? Storage::disk($this->profileImageDisk())->url($this->profile_image_path)
                    : $this->defaultProfileImageUrl();
    }

    protected function defaultProfileImageUrl(): string
    {
        if (get_class($this) === Business::class) {
            return asset('images/default-business-image.jpg');
        }

        return asset('images/default-apartment-image.jpg');
    }

    protected function profileImageDisk(): string
    {
        return 'public';
    }
}
