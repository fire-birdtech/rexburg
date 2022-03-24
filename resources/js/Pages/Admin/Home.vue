<template>
    <admin-layout title="Admin Dashboard">
        <div class="py-12 px-4 md:px-0">
            <div class="max-w-8xl mx-auto space-y-8 sm:px-6 lg:px-8">
                <h2>Admin Dashboard</h2>
                <div class="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
                    <ul role="list" class="divide-y divide-gray-200">
                        <li v-for="(link, linkIdx) in links" :key="linkIdx">
                            <Link :href="link.route">
                                <div class="px-4 py-4 flex items-center sm:px-6">
                                    <div class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                        <span>{{ link.name }}</span>
                                    </div>
                                    <div class="ml-5 flex-shrink-0">
                                        <ChevronRightIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </admin-layout>
</template>

<script>
    import AdminLayout from '@/Layouts/AdminLayout';
    import { Link } from '@inertiajs/inertia-vue3';
    import { ChevronRightIcon } from '@heroicons/vue/outline';

    const links = [
        { name: "Housing", route: route('admin.housing.index') },
        { name: "Claims", route: route('admin.claims.index') },
    ];

    export default {
        components: {
            AdminLayout,
            ChevronRightIcon,
            Link,
        },
        setup() {
            return {
                links,
            }
        },
    }
</script>