<template>
    <admin-layout>
        <div class="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-8xl lg:px-8">
            <div class="flex items-center space-x-5">
                <div class="flex-shrink-0">
                    <div class="relative">
                        <img class="h-16 w-16 rounded-full object-cover" :src="user.profile_photo_url" :alt="user.name" />
                        <span class="absolute inset-0 shadow-inner rounded-full" aria-hidden="true" />
                    </div>
                </div>
                <div>
                    <h1 class="text-2xl font-bold text-gray-900"> {{ user.name }} </h1>
                    <p class="text-sm font-medium text-gray-500">User since <time :datetime="convertDateTime(user.created_at)"> {{ convertDate(user.created_at) }} </time></p>
                </div>
            </div>
            <div class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                <!-- <Link :href="route('admin.user.edit', [user.id])" class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-sky-500">
                    <PencilAltIcon class="h-5 w-5" />
                </Link> -->
            </div>
        </div>

        <div class="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-8xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div class="space-y-6 lg:col-start-1 lg:col-span-2">
                <div v-if="user.suspended_until" class="rounded-md bg-yellow-100 p-4">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <ExclamationIcon class="h-5 w-5 text-yellow-500" aria-hidden="true" />
                        </div>
                        <div class="ml-3">
                            <h3 class="text-sm font-medium text-yellow-800">This user is currently suspended</h3>
                        </div>
                    </div>
                </div>

                <div v-if="user.suspensions.length" class="rounded-md bg-red-100 p-4">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div class="ml-3">
                            <h3 class="text-sm font-medium text-red-800">This user has been suspended {{ user.suspensions_count }} {{ user.suspensions_count > 1 ? 'times' : 'time' }}.</h3>
                            <div class="mt-2 text-sm text-red-700">
                                <ul role="list" class="list-disc pl-5 space-y-1">
                                    <li v-for="suspension in user.suspensions" :key="suspension.id">{{ suspension.reason }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Actions -->
                <section aria-labelledby="actions-title">
                    <div class="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                        <div class="divide-y divide-gray-200">
                            <div class="px-4 py-5 sm:px-6">
                                <h2 id="actions-title" class="text-lg font-medium text-gray-900">Actions</h2>
                            </div>
                            <div class="flex items-center justify-between px-4 py-6 sm:px-6">
                                <div>
                                    <h3 class="text-base leading-6 font-medium text-gray-900">Suspend this user account</h3>
                                    <p class="mt-1 max-w-2xl text-sm text-gray-500">User information will not be affected.</p>
                                </div>
                                <button type="button" @click.prevent="suspend" :disabled="$page.props.auth.id === user.id" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"> Suspend user </button>
                            </div>
                            <div class="flex items-center justify-between px-4 py-6 sm:px-6">
                                <div>
                                    <h3 class="text-base leading-6 font-medium text-gray-900">Delete this user account</h3>
                                    <p class="mt-1 max-w-2xl text-sm text-gray-500">Once you delete this user, there is no going back.</p>
                                </div>
                                <button type="button" :disabled="$page.props.auth.id === user.id" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"> Delete user </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section aria-labelledby="stats-title" class="lg:col-start-3 lg:col-span-1">
                <div class="bg-white shadow sm:rounded-lg">
                    <div class="px-4 py-5 sm:px-6">
                        <h2 id="stats-title" class="text-lg font-medium text-gray-900">User Statistics</h2>
                    </div>

                    <!-- User Statistics -->
                    <div class="flow-root border-t border-gray-200">
                        <ul role="list" class="divide-y divide-gray-200">
                            <li class="py-4 px-6">
                                <div class="relative">
                                    <div class="relative flex space-x-3">
                                        <div class="min-w-0 flex-1 flex justify-between space-x-4">
                                            <div>
                                                <p class="text-sm text-gray-500">
                                                    Reviews
                                                </p>
                                            </div>
                                            <div class="text-right text-sm whitespace-nowrap text-gray-500">
                                                {{ user.reviews_count }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    </admin-layout>
</template>

<script>
    import AdminLayout from '@/Layouts/AdminLayout';
    import { convertDate, convertDateTime } from '@/Utils/convertDate';
    import { ExclamationIcon, XCircleIcon } from '@heroicons/vue/solid';
    import { Inertia } from '@inertiajs/inertia';

    export default {
        components: {
            AdminLayout,
            ExclamationIcon,
            XCircleIcon,
        },
        props: {
            user: Object,
        },
        setup(props) {
            const suspend = () => {
                Inertia.post(route('admin.users.suspend', [props.user.id]), {
                    user_id: props.user.id,
                    reason: "",
                });
            }
            return {
                convertDate,
                convertDateTime,
                suspend,
            }
        },
    }
</script>