<template>
    <app-layout :canLogin="canLogin" :canRegister="canRegister">
        <div class="xl:overflow-y-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <main class="grid gap-4 md:grid-cols-2 lg:gap-8 lg:grid-cols-3 py-8">
                <div v-for="(listing, index) in housing" :key="index">
                    <Link :href="route('housing.profile', [listing.slug])">
                        <div class="bg-white overflow-hidden shadow hover:shadow-lg rounded-lg transform duration-200 hover:-translate-y-1">
                            <img :src="listing.cover_image_url" alt="" class="rounded-t-lg">
                            <div class="px-4 py-5 sm:p-6">
                                <h3 class="text-lg leading-6 font-semibold text-gray-900">{{ listing.name }}</h3>
                                <div class="mt-1">
                                    <span class="text-gray-900">{{ listing.rent_range }}</span>
                                    <span class="ml-1 text-sm text-gray-600">/semester</span>
                                </div>
                                <div class="mt-2 flex items-center text-sm text-gray-600">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-current text-teal-500">
                                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>
                                    </svg>
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-current text-teal-500">
                                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>
                                    </svg>
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-current text-teal-500">
                                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>
                                    </svg>
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-current text-teal-500">
                                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>
                                    </svg>
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-current text-gray-300">
                                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>
                                    </svg>
                                    <span class="ml-2">{{ listing.reviews_count }} reviews</span>
                                </div>
                            </div>
                            <div v-if="$page.props.user" class="bg-gray-50 px-4 py-3 sm:px-6">
                                <p class="text-sm leading-5 text-gray-500">Friends who've lived here</p>
                                <!-- <div class="flex -space-x-1 overflow-hidden mt-2">
                                    <img v-for="(friend, index) in listing.friends" :key="index" :src="friend.profile_photo_url" alt="" class="inline-block h-8 w-8 rounded-full ring-2 ring-white">
                                </div> -->
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
    
    export default {
        components: {
            AppLayout,
            Link,
        },
        props: {
            housing: Array,
            canLogin: Boolean,
            canRegister: Boolean,
        },
    }
</script>