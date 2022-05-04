<template>
    <app-layout :title="`${housing.name} Reviews`" :canLogin="canLogin" :canRegister="canRegister">
        <div>
            <img :src="housing.cover_image_url" :alt="housing.name" class="h-32 w-full object-cover lg:h-56 bg-gray-300">
        </div>
        <div class="max-w-8xl mx-auto px-4 pb-20 sm:px-6 lg:px-8">
            <div class="-mt-12 sm:-mt-16 sm:flex sm:items-start">
                <div class="sm:flex sm:items-end sm:space-x-5">
                    <div class="flex">
                        <img class="h-24 w-24 rounded-full ring-4 ring-gray-100 sm:h-32 sm:w-32 bg-gray-300" :src="housing.profile_image_url" :alt="housing.name" />
                    </div>
                    <div class="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div class="flex items-center sm:hidden md:flex mt-6 min-w-0 flex-1">
                            <h1 class="text-2xl md:text-4xl font-bold text-gray-900 truncate">
                                {{ housing.name }}
                            </h1>
                            <!-- <BadgeCheckIcon v-if="housing.verified" class="ml-4 h-6 w-6 text-sky-500" /> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="hidden sm:block md:hidden mt-6 min-w-0 flex-1">
                <h1 class="text-3xl font-bold text-gray-900 truncate">
                    {{ housing.name }}
                </h1>
            </div>
            <div class="mt-6">
                <Link :href="route('housing.profile', [housing.slug])" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                    <ArrowLeftIcon class="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                    Back to profile
                </Link>
            </div>
            <div class="mt-8 lg:flex">
                <aside class="mt-8 md:w-1/3 md:order-2"></aside>
                <div class="mt-8 lg:w-2/3 md:mt-2 md:order-1">
                    <div class="md:px-4 md:py-5">
                        <ReviewList
                            :housing-id="housing.id"
                            :name="housing.name"
                            :reviews="housing.reviews"
                            :reviews-count="housing.reviews_count"
                            :score="housing.score"
                            :score-description="scoredescription"
                            :slug="housing.slug"
                        />
                    </div>
                </div>
            </div>
        </div>
    </app-layout>
</template>

<script>
    import AppLayout from '@/Layouts/AppLayout';
    import { convertDateWithDay } from '@/Utils/convertDate';
    import ReviewList from '@/Components/ReviewList';
    import { Link } from '@inertiajs/inertia-vue3';
    import { ArrowLeftIcon } from '@heroicons/vue/outline';

    export default {
        components: {
            AppLayout,
            ArrowLeftIcon,
            Link,
            ReviewList,
        },
        props: {
            housing: Object,
            canLogin: Boolean,
            canRegister: Boolean,
        },
        data() {
            return {
                scoredescription: this.calculateDescription(),
            }
        },
        methods: {
            convertDateWithDay,
            calculateDescription() {
                if (this.housing.score >= 5) { return "Excellent"; }
                if (this.housing.score >= 4) { return "Great"; }
                if (this.housing.score >= 3) { return "Good"; }
                if (this.housing.score >= 2) { return "Okay"; }
                if (this.housing.score >= 1) { return "Poor"; }
            },
        },
    }
</script>