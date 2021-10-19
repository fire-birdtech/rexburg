<?php

namespace App\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait HasProfileImage
{
    /**
     * Update the housing's cover image.
     *
     * @param  \Illuminate\Http\UploadedFile  $photo
     * @return void
     */
    public function updateProfileImage(UploadedFile $photo)
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

    /**
     * Delete the housing's cover image.
     *
     * @return void
     */
    public function deleteProfileImage()
    {
        Storage::disk($this->profileImageDisk())->delete($this->profile_image_path);

        $this->forceFill([
            'profile_image_path' => null,
        ])->save();
    }

    /**
     * Get the URL to the housing's cover image.
     *
     * @return string
     */
    public function getProfileImageUrlAttribute()
    {
        return $this->profile_image_path
                    ? Storage::disk($this->profileImageDisk())->url($this->profile_image_path)
                    : $this->defaultProfileImageUrl();
    }

    /**
     * Get the default cover image URL if no cover image has been uploaded.
     *
     * @return string
     */
    protected function defaultProfileImageUrl()
    {
        return 'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&h=1200&q=80';
    }

    /**
     * Get the disk that cover images should be stored on.
     *
     * @return string
     */
    protected function profileImageDisk()
    {
        return 'public';
    }
}