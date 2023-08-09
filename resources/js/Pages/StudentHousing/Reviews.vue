<script setup>
import { ref } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { convertDateWithDay } from '@/Utils/convertDate';
import ReviewList from '@/Components/ReviewList.vue';
import { Link } from '@inertiajs/vue3';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
    housing: Object,
    canLogin: Boolean,
    canRegister: Boolean,
});

const pageDescription = ref(
    `Read reviews about ${props.housing.name} ${props.housing.housing_type} student housing on Rexburg Guru!`
);

const scoredescription = () => {
    if (props.housing.score >= 5) { return "Excellent"; }
    if (props.housing.score >= 4) { return "Great"; }
    if (props.housing.score >= 3) { return "Good"; }
    if (props.housing.score >= 2) { return "Okay"; }
    if (props.housing.score >= 1) { return "Poor"; }
}
</script>

<template>
    <AppLayout :title="`${housing.name} Reviews`" :description="pageDescription" :canLogin="canLogin" :canRegister="canRegister">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="pt-8">
                <img :src="housing.cover_image_url" :alt="housing.name" class="aspect-[16/4] w-full rounded-2xl bg-slate-100 object-cover">
            </div>
            <div class="max-w-8xl mx-auto px-4 pb-20 sm:px-6 lg:px-8">
                <div class="-mt-12 sm:-mt-16 sm:flex sm:items-start">
                    <div class="sm:flex sm:items-end sm:space-x-5">
                        <div class="flex">
                            <img class="h-24 w-24 rounded-full ring-4 ring-slate-900 sm:h-32 sm:w-32 bg-slate-300" :src="housing.profile_image_url" :alt="housing.name" />
                        </div>
                        <div class="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                            <div class="flex items-center sm:hidden md:flex mt-6 min-w-0 flex-1">
                                <h1 class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-slate-100 truncate">
                                    {{ housing.name }}
                                </h1>
                                <CheckBadgeIcon v-if="housing.verified" class="ml-4 h-6 w-6 text-sky-500" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hidden sm:block md:hidden mt-6 min-w-0 flex-1">
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-slate-100 truncate">
                        {{ housing.name }}
                    </h1>
                </div>
                <div class="mt-6">
                    <Link :href="route('housing.show', [housing.slug])" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
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
        </div>
    </AppLayout>
</template>
