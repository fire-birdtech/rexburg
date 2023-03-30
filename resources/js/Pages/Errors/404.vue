<template>
    <app-layout title="404">
        <div class="min-h-full pt-32 pb-12 flex flex-col">
            <main class="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div class="py-16">
                    <div class="text-center">
                        <p class="text-sm font-semibold text-sky-600 uppercase tracking-wide">404 error</p>
                        <h1 class="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Page not found.</h1>
                        <p class="mt-2 text-base text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
                        <div class="mt-6 flex flex-col space-y-4">
                            <Link :href="route('housing.single')" class="text-base font-medium text-sky-600 hover:text-sky-700">Go to single housing listings<span aria-hidden="true"> &rarr;</span></Link>
                            <Link :href="route('housing.married')" class="text-base font-medium text-sky-600 hover:text-sky-700">Go to married housing listings<span aria-hidden="true"> &rarr;</span></Link>
                        </div>
                    </div>
                </div>
            </main>
            <footer class="flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                <nav class="flex justify-center space-x-4">
                    <a href="#" class="text-sm font-medium text-gray-500 hover:text-gray-600">Contact Support</a>
                </nav>
            </footer>
        </div>
    </app-layout>
</template>

<script>
    import { Link } from '@inertiajs/inertia-vue3';
    import AppLayout from '@/Layouts/AppLayout.vue';
    import ApplicationMark from '@/Components/ApplicationMarkBlue.vue';

    export default {
        components: {
            AppLayout,
            ApplicationMark,
            Link,
        },
    }
</script>