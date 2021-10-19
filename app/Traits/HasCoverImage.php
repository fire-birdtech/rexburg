<?php

namespace App\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait HasCoverImage
{
    /**
     * Update the housing's cover image.
     *
     * @param  \Illuminate\Http\UploadedFile  $photo
     * @return void
     */
    public function updateCoverImage(UploadedFile $photo)
    {
        tap($this->cover_image_path, function ($previous) use ($photo) {
            $this->forceFill([
                'cover_image_path' => $photo->storePublicly(
                    'cover-images', ['disk' => $this->coverImageDisk()]
                ),
            ])->save();

            if ($previous) {
                Storage::disk($this->coverImageDisk())->delete($previous);
            }
        });
    }

    /**
     * Delete the housing's cover image.
     *
     * @return void
     */
    public function deleteCoverImage()
    {
        Storage::disk($this->coverImageDisk())->delete($this->cover_image_path);

        $this->forceFill([
            'cover_image_path' => null,
        ])->save();
    }

    /**
     * Get the URL to the housing's cover image.
     *
     * @return string
     */
    public function getCoverImageUrlAttribute()
    {
        return $this->cover_image_path
                    ? Storage::disk($this->coverImageDisk())->url($this->cover_image_path)
                    : $this->defaultCoverImageUrl();
    }

    /**
     * Get the default cover image URL if no cover image has been uploaded.
     *
     * @return string
     */
    protected function defaultCoverImageUrl()
    {
        return 'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&h=1200&q=80';
    }

    /**
     * Get the disk that cover images should be stored on.
     *
     * @return string
     */
    protected function coverImageDisk()
    {
        return 'public';
    }
}