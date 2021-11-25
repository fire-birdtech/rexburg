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
                                    <span class="ml-1 text-sm text-gray-600">/semester</span>
                                </div>
                                <div class="mt-2 flex items-center text-sm text-gray-600">
                                    <Stars size="h-4 w-4" :score="listing.score" />
                                    <span class="ml-2 font-semibold">{{ listing.score }}</span>
                                    <span class="ml-4">{{ listing.reviews_count }} {{ listing.reviews_count === 1 ? 'review' : 'reviews' }}</span>
                                </div>
                            </div>
                            <div v-if="$page.props.user" class="bg-gray-50 px-4 py-3 sm:px-6">
                                <p class="text-sm leading-5 text-gray-500">Friends who've lived here</p>
                                <template v-if="listing.friends">
                                    <div class="flex -space-x-1 overflow-hidden mt-2">
                                        <img v-for="(friend, index) in listing.friends" :key="index" :src="friend.profile_photo_url" alt="" class="inline-block h-8 w-8 rounded-full ring-2 ring-white">
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="flex overflow-hidden mt-2">
                                        <div class="flex justify-start items-center w-full py-1">
                                            <div class="flex-shrink-0">
                                                <UserGroupIcon class="h-6 w-6 text-sky-500" aria-hidden="true" />
                                            </div>
                                            <div class="ml-3 w-0 flex-1 inline-flex items-center pt-0.5">
                                                <p class="text-sm font-medium text-gray-500">
                                                    No friends to display
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </template>
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