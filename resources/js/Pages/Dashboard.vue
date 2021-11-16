<template>
    <app-layout title="Dashboard">
        <div class="py-12 px-4 md:px-0">
            <div class="max-w-7xl mx-auto space-y-8 sm:px-6 lg:px-8">
                <div class="">
                    <h2>My properties</h2>
                    <div class="py-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <Link href="#">
                            <div class="relative shadow-xl rounded-xl overflow-hidden min-h-full group">
                                <div class="absolute inset-0">
                                    <img src="https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&h=1200&q=80" alt="" class="h-full w-full object-cover transform transition duration-200 ease-in-out group-hover:scale-110">
                                    <div class="absolute inset-0 bg-gradient-to-r from-sky-300 to-blue-300" :style="{ mixBlendMode: 'multiply' }"></div>
                                </div>
                                <div class="relative flex flex-col min-h-full px-4 pt-20 pb-4">
                                    <div class="flex-grow">
                                        <p class="font-bold text-white text-lg truncate">Greenleaf Apartments</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div class="">
                    <h2>Places I've lived</h2>
                    <template v-if="housings.length">
                        <div class="py-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <Link href="#">
                                <div class="relative shadow-xl rounded-xl overflow-hidden min-h-full group">
                                    <div class="absolute inset-0">
                                        <img src="https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&h=1200&q=80" alt="" class="h-full w-full object-cover transform transition duration-200 ease-in-out group-hover:scale-110">
                                        <div class="absolute inset-0 bg-gradient-to-r from-sky-300 to-blue-300" :style="{ mixBlendMode: 'multiply' }"></div>
                                    </div>
                                    <div class="relative flex flex-col min-h-full px-4 pt-20 pb-4">
                                        <div class="flex-grow">
                                            <p class="font-bold text-white text-lg truncate">Greenleaf Apartments</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
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
                <div class="">
                    <h2>Reviews by me</h2>
                    <template v-if="reviews.length">
                        <div class="py-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <Link v-for="(review, idx) in reviews" :key="idx" href="#" class="transform duration-200 hover:-translate-y-1">
                                <div class="bg-white overflow-hidden shadow-xl rounded-xl">
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

    export default {
        components: {
            AppLayout,
            Link,
            Stars,
        },
        props: ['housings', 'reviews'],
    }
</script>
