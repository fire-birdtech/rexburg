<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;

trait UpdatesScore
{
    public static function bootUpdatesScore(): void
    {
        static::created(function (Model $model) {
            $model->updateReviewableScore();
        });
    }

    public function updateReviewableScore(): void
    {
        $reviewableReviews = $this->reviewable->reviews;
        $ratingTotal = null;
        foreach ($reviewableReviews as $review) {
            $ratingTotal += $review->rating;
        }
        $score = $ratingTotal / count($reviewableReviews);
        $this->reviewable->score = $score;
        $this->reviewable->save();
    }
}
