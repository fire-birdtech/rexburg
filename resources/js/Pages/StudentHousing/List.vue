<template>
    <app-layout :canLogin="canLogin" :canRegister="canRegister">
        <div class="xl:overflow-y-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <main class="grid gap-4 md:grid-cols-2 lg:gap-8 lg:grid-cols-3 py-8">
                <div v-for="(listing, index) in housing" :key="index">
                    <Link :href="route('housing.profile', [listing.slug])">
                        <div class="bg-white overflow-hidden shadow hover:shadow-lg rounded-lg transform duration-200 hover:-translate-y-1">
                            <img :src="listing.cover_image_url" alt="" class="rounded-t-lg h-64">
                            <div class="px-4 py-5 sm:p-6">
                                <h3 class="text-lg leading-6 font-semibold text-gray-900">{{ listing.name }}</h3>
                                <div class="mt-1">
                                    <span class="text-gray-900">{{ listing.rent_range }}</span>
                                    <span v-if="listing.housing_type === 'single'" class="ml-1 text-sm text-gray-600">/semester</span>
                                    <span v-if="listing.housing_type === 'married'" class="ml-1 text-sm text-gray-600">/month</span>
                                </div>
                                <div class="mt-2 flex items-center text-sm text-gray-600">
                                    <Stars size="h-4 w-4" :score="listing.score" />
                                    <span class="ml-2 font-semibold">{{ listing.score }}</span>
                                    <span class="ml-4">{{ listing.reviews_count }} {{ listing.reviews_count === 1 ? 'review' : 'reviews' }}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </main>
        </div>
    </app-layout>
</template>

<script>
    import AppLayout from '@/Layouts/AppLayout.vue';
    import { Link } from '@inertiajs/inertia-vue3';
    import { UserGroupIcon } from'@heroicons/vue/solid';
    import Stars from '@/Components/Stars';
    
    export default {
        components: {
            AppLayout,
            Link,
            Stars,
            UserGroupIcon,
        },
        props: {
            housing: Array,
            canLogin: Boolean,
            canRegister: Boolean,
        },
    }
</script>