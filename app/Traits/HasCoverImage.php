<?php

namespace App\Traits;

use App\Models\Business;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait HasCoverImage
{
    public function updateCoverImage(UploadedFile $photo): void
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

    public function deleteCoverImage(): void
    {
        Storage::disk($this->coverImageDisk())->delete($this->cover_image_path);

        $this->forceFill([
            'cover_image_path' => null,
        ])->save();
    }

    public function getCoverImageUrlAttribute(): string
    {
        return $this->cover_image_path
                    ? Storage::disk($this->coverImageDisk())->url($this->cover_image_path)
                    : $this->defaultCoverImageUrl();
    }

    protected function defaultCoverImageUrl(): string
    {
        if (get_class($this) === Business::class) {
            return asset('images/default-business-image.jpg');
        }

        return asset('images/default-apartment-image.jpg');
    }

    protected function coverImageDisk(): string
    {
        return 'public';
    }
}
