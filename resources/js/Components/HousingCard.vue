<script setup>
import { defineComponent } from 'vue';
import { Link } from '@inertiajs/vue3';
import Stars from '@/Components/Stars.vue';

defineProps(['housing']);
</script>

<template>
    <article class="scale-100 relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-slate-900 px-8 pb-5 pt-60 motion-safe:hover:scale-[1.01] sm:pt-48 lg:pt-60">
        <img :src="housing.cover_image_url" alt="" class="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div class="absolute inset-0 -z-10 bg-gradient-to-t from-slate-800 via-slate-900/40" />
        <div class="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-slate-900/10" />

        <div class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-slate-300">
            <div class="flex items-center">
                <Stars size="h-4 w-4" :score="housing.score" />
                <span class="ml-2 font-semibold">{{ housing.score }}</span>
                <span class="ml-4">{{ housing.reviews_count }} {{ housing.reviews_count === 1 ? 'review' : 'reviews' }}</span>
            </div>
        </div>
        <div class="mt-2 flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-slate-300">
            <div class="flex items-center gap-x-4">
                <svg viewBox="0 0 2 2" class="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                    <circle cx="1" cy="1" r="1" />
                </svg>
                <div class="flex gap-x-2.5 text-slate-100">
                    <!-- <img :src="post.author.imageUrl" alt="" class="h-6 w-6 flex-none rounded-full bg-white/10" /> -->
                    {{ housing.rent_range }}
                    <span v-if="housing.housing_type === 'single'" class="ml-1 text-sm text-slate-300">/semester</span>
                    <span v-if="housing.housing_type === 'married'" class="ml-1 text-sm text-slate-300">/month</span>
                </div>
            </div>
        </div>
        <h3 class="mt-3 text-lg font-semibold leading-6 text-white">
            <Link href="#">
                <span class="absolute inset-0" />
                {{ housing.name }}
            </Link>
        </h3>
    </article>
</template>