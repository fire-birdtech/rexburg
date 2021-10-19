<template>
    <app-layout title="Admin Housing">
        <div class="py-12 px-4 md:px-0">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <h2>Housing</h2>
                <div class="py-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <Link :href="route('admin.housing.create')" class="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span class="mt-2 block text-sm font-medium text-gray-900">
                            Create housing
                        </span>
                    </Link>
                    <Link v-for="housing in housings" :key="housing.id" href="#">
                        <div class="relative shadow-xl rounded-xl overflow-hidden min-h-full group">
                            <div class="absolute inset-0">
                                <img :src="housing.cover_image_url" alt="" class="h-full w-full object-cover transform transition duration-200 ease-in-out group-hover:scale-110">
                                <div class="absolute inset-0 bg-gradient-to-r from-sky-300 to-blue-300" :style="{ mixBlendMode: 'multiply' }"></div>
                            </div>
                            <div class="relative flex flex-col min-h-full px-4 pt-20 pb-4">
                                <div class="flex-grow">
                                    <p class="font-bold text-white text-lg truncate">{{ housing.name }}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </app-layout>
</template>

<script>
    import AppLayout from '@/Layouts/AppLayout';
    import { Link } from '@inertiajs/inertia-vue3';

    export default {
        components: {
            AppLayout,
            Link,
        },
        props: {
            housings: Object,
        },
    }
</script>