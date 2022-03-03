<template>
    <admin-layout title="Admin Housing">
        <div class="py-12 px-4 md:px-0">
            <div class="max-w-7xl mx-auto">
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-semibold text-gray-900">Housing</h2>
                    <Link :href="route('admin.housing.create')" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                        Create Housing
                    </Link>
                </div>
                <div class="py-4 flex flex-col">
                    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Housing Type</th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager</th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"># of Reviews</th>
                                            <th scope="col" class="relative px-6 py-3">
                                                <span class="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(housing, housingIdx) in housings" :key="housing.id" :class="housingIdx % 2 === 0 ? 'bg-white' : 'bg-gray-100'">
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {{ housing.name }}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {{ housing.housing_type }}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {{ housing.manager?.user.name }}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {{ housing.reviews_count }}
                                            </td>
                                            <td class="flex items-center justify-end space-x-4 px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link :href="route('admin.housing.show', [housing.id])" class="text-sky-600 hover:text-sky-900">
                                                    <EyeIcon class="h-6 w-6" />
                                                </Link>
                                                <Link :href="route('admin.housing.edit', [housing.id])" class="text-sky-600 hover:text-sky-900">
                                                    <PencilAltIcon class="h-6 w-6" />
                                                </Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </admin-layout>
</template>

<script>
    import AdminLayout from '@/Layouts/AdminLayout';
    import { Link } from '@inertiajs/inertia-vue3';
    import { EyeIcon, PencilAltIcon } from '@heroicons/vue/outline';

    export default {
        components: {
            AdminLayout,
            EyeIcon,
            Link,
            PencilAltIcon,
        },
        props: {
            housings: Object,
        },
    }
</script>