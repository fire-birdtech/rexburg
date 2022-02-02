<template>
    <app-layout title="Dashboard">
        <div class="py-12 px-4 md:px-0">
            <div class="max-w-7xl mx-auto space-y-8 sm:px-6 lg:px-8">
                <div v-if="claims > 0">
                    <div class="max-w-7xl mx-auto">
                        <div class="p-2 rounded-lg bg-sky-500 shadow-lg sm:p-3">
                            <div class="flex items-center justify-between flex-wrap">
                                <div class="w-0 flex-1 flex items-center">
                                    <span class="flex p-2 rounded-lg bg-sky-600">
                                        <SpeakerphoneIcon class="h-6 w-6 text-white" aria-hidden="true" />
                                    </span>
                                    <p class="ml-3 font-medium text-white truncate">
                                        Your verification code is on the way!
                                    </p>
                                </div>
                                <div class="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                                    <Link :href="route('claims.verify')" class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-sky-600 bg-white hover:bg-sky-100">
                                        Verify
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="manages.length">
                    <h2>My properties</h2>
                    <div class="py-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <DashboardReviewable v-for="housing in manages" :key="housing.id" :image="housing.manageable.cover_image_url" :name="housing.manageable.name" :slug="housing.manageable.slug" />
                    </div>
                </div>
                <div>
                    <h2>Places I've lived</h2>
                    <template v-if="housings.length">
                        <div class="py-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <DashboardReviewable v-for="housing in housings" :key="housing.id" :image="housing.cover_image_url" :name="housing.name" :slug="housing.slug" />
                        </div>
                    </template>
                    <template v-else>
                        <p class="mt-1 text-sm text-gray-500">You haven’t added any places that you've lived at yet.</p>
                        <div class="mt-3 sm:flex-shrink-0">
                            <Link href="#" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                                Add places you've lived
                            </Link>
                        </div>
                    </template>
                </div>
                <div>
                    <h2>Reviews by me</h2>
                    <template v-if="reviews.length">
                        <div class="py-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <Link v-for="(review, idx) in reviews" :key="idx" href="#" class="transform duration-200 hover:-translate-y-1">
                                <div class="bg-white shadow-xl rounded-xl">
                                    <div class="px-4 py-5 sm:p-6">
                                        <h3 class="text-lg font-medium text-gray-900 tracking-tight">{{ review.reviewable.name }}</h3>
                                        <div class="mt-2 flex items-center text-sm text-gray-600">
                                            <Stars size="h-4 w-4" :score="review.rating" />
                                        </div>
                                        <div class="mt-2 leading-5 text-gray-900">{{ review.body }}</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </template>
                    <template v-else>
                        <p class="mt-1 text-sm text-gray-500">You haven’t added any reviews yet.</p>
                    </template>
                </div>
            </div>
        </div>
    </app-layout>
</template>

<script>
    import AppLayout from '@/Layouts/AppLayout.vue';
    import { Link } from '@inertiajs/inertia-vue3';
    import Stars from '@/Components/Stars';
    import DashboardReviewable from '@/Components/DashboardReviewable';
    import { SpeakerphoneIcon } from '@heroicons/vue/outline';

    export default {
        components: {
            AppLayout,
            DashboardReviewable,
            Link,
            SpeakerphoneIcon,
            Stars,
        },
        props: ['claims', 'housings', 'manages', 'reviews'],
    }
</script>
