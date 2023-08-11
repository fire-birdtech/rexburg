<script setup>
import { ref } from 'vue';
import { Link } from '@inertiajs/vue3';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';
import AppLayout from '@/Layouts/AppLayout.vue';
import ReviewList from '@/Components/ReviewList.vue';

const props = defineProps({
  housing: Object,
  canLogin: Boolean,
  canRegister: Boolean,
});

const pageDescription = ref(
  `Read reviews about ${props.housing.name} ${props.housing.housing_type} student housing on Rexburg Guru!`,
);

const scoredescription = () => {
  if (props.housing.score >= 5) { return 'Excellent'; }
  if (props.housing.score >= 4) { return 'Great'; }
  if (props.housing.score >= 3) { return 'Good'; }
  if (props.housing.score >= 2) { return 'Okay'; }
  return 'Poor';
};
</script>

<template>
    <AppLayout :title="`${housing.name} Reviews`" :description="pageDescription" :canLogin="canLogin" :canRegister="canRegister">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="pt-8">
                <img :src="housing.cover_image_url" :alt="housing.name" class="aspect-[16/4] w-full rounded-2xl bg-slate-100 object-cover">
            </div>
            <div class="max-w-8xl mx-auto px-4 pb-20 sm:px-6 lg:px-8">
                <div class="-mt-12 sm:-mt-16 sm:flex sm:items-start">
                    <div class="sm:flex sm:items-end sm:space-x-5">
                        <div class="flex">
                            <img class="h-24 w-24 rounded-full bg-slate-300 ring-4 ring-slate-900 sm:h-32 sm:w-32" :src="housing.profile_image_url" :alt="housing.name" />
                        </div>
                        <div class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                            <div class="mt-6 flex min-w-0 flex-1 items-center sm:hidden md:flex">
                                <h1 class="truncate text-2xl font-bold text-gray-900 dark:text-slate-100 md:text-4xl">
                                    {{ housing.name }}
                                </h1>
                                <CheckBadgeIcon v-if="housing.verified" class="ml-4 h-6 w-6 text-sky-500" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
                    <h1 class="truncate text-3xl font-bold text-gray-900 dark:text-slate-100">
                        {{ housing.name }}
                    </h1>
                </div>
                <div class="mt-6">
                    <Link :href="route('housing.show', [housing.slug])" class="inline-flex items-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                        <ArrowLeftIcon class="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                        Back to profile
                    </Link>
                </div>
                <div class="mt-8 lg:flex">
                    <aside class="mt-8 md:order-2 md:w-1/3"></aside>
                    <div class="mt-8 md:order-1 md:mt-2 lg:w-2/3">
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
