<template>
    <admin-layout title="Admin Users">
        <div class="py-4">
            <div class="max-w-8xl mx-auto px-8">
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-semibold text-gray-900">Users</h2>
                </div>
                <div class="py-4 flex flex-col">
                    <div class="-my-2 overflow-x-auto -mx-8">
                        <div class="py-2 align-middle inline-block min-w-full px-8">
                            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                                            <th scope="col" class="relative px-6 py-3">
                                                <span class="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(user, userIdx) in users" :key="user.id" :class="userIdx % 2 === 0 ? 'bg-white' : 'bg-gray-100'">
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {{ user.name }}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {{ user.email }}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {{ convertDate(user.created_at) }}
                                            </td>
                                            <td class="flex items-center justify-end space-x-4 px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link :href="route('admin.users.show', [user.id])" class="text-sky-600 hover:text-sky-900">
                                                    <EyeIcon class="h-6 w-6" />
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
    import AdminLayout from '@/Layouts/AdminLayout.vue';
    import { Link } from '@inertiajs/vue3';
    import { EyeIcon } from '@heroicons/vue/24/outline';
    import { convertDate } from '@/Utils/convertDate';

    export default {
        components: {
            AdminLayout,
            EyeIcon,
            Link,
        },
        props: {
            users: Object,
        },
        methods: {
            convertDate,
        },
    }
</script>
