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
                    <h2>Reviews by me</h2>
                    <div class="py-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <Link v-for="(review, idx) in reviews" :key="idx" href="#" class="hover:-translate-y-1 transition ease-in-out duration-100">
                            <div class="bg-white overflow-hidden shadow-xl rounded-xl">
                                <div class="px-4 py-5 sm:p-6">
                                    <h3 class="text-lg font-medium text-gray-900 tracking-tight">{{ review.listing.name }}</h3>
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
                                    </div>
                                    <div class="mt-2 leading-5 text-gray-900">{{ review.body }}</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </app-layout>
</template>

<script>
    import AppLayout from '@/Layouts/AppLayout.vue';
    import { Link } from '@inertiajs/inertia-vue3';

    const reviews = [
        { rating: 4, body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.", listing: { name: "Greenleaf Apartments" }},
        { rating: 4, body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.", listing: { name: "The Oasis Apartments" }},
        { rating: 4, body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.", listing: { name: "Champions Apartments" }},
    ];

    export default {
        components: {
            AppLayout,
            Link,
        },
        setup() {
            return {
                reviews,
            }
        },
    }
</script>
