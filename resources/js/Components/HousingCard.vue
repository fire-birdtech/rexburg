<script setup>
import { defineComponent } from 'vue';
import { Link } from '@inertiajs/vue3';
import Stars from '@/Components/Stars.vue';

defineProps(['housing']);
</script>

<template>
    <Link
        :href="route('housing.show', [housing.slug])"
        class="scale-100 p-6 bg-white dark:bg-slate-800/50 dark:bg-gradient-to-bl from-slate-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-slate-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-sky-500"
    >
        <img class="absolute inset-0 h-full w-full rounded-lg object-cover brightness-50 saturate-40" :src="housing.cover_image_url" :alt="housing.name" />
        <div class="relative flex">
            <div class="pt-32">
                <div class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-slate-300">
                    <div class="flex items-center">
                        <Stars size="h-4 w-4" :score="housing.score" />
                        <span class="ml-2 font-semibold">{{ housing.score }}</span>
                        <span class="ml-4">{{ housing.reviews_count }} {{ housing.reviews_count === 1 ? 'review' : 'reviews' }}</span>
                    </div>
                </div>
                <div class="mt-2 flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-slate-300">
                    <div class="flex items-center gap-x-4">
                        <div class="flex items-baseline text-slate-100">
                            {{ housing.rent_range }}
                            <span v-if="housing.housing_type === 'single'" class="ml-1 text-sm text-slate-300">/semester</span>
                            <span v-if="housing.housing_type === 'married'" class="ml-1 text-sm text-slate-300">/month</span>
                        </div>
                    </div>
                </div>
                <h3 class="mt-3 text-lg font-semibold leading-6 text-white">
                    <Link :href="route('housing.show', [housing.slug])">
                        <span class="absolute inset-0" />
                        {{ housing.name }}
                    </Link>
                </h3>
            </div>
        </div>
    </Link>
</template>
