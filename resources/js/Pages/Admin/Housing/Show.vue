<template>
    <admin-layout>
        <div class="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-8xl lg:px-8">
            <div class="flex items-center space-x-5">
                <div class="flex-shrink-0">
                    <div class="relative">
                        <img class="h-16 w-16 rounded-full object-cover" :src="housing.profile_image_url" :alt="housing.name" />
                        <span class="absolute inset-0 shadow-inner rounded-full" aria-hidden="true" />
                    </div>
                </div>
                <div>
                    <h1 class="text-2xl font-bold text-gray-900"> {{ housing.name }} </h1>
                    <p v-if="housing.manager" class="text-sm font-medium text-gray-500">Managed by <Link :href="route('admin.users.show', [housing.manager.user.id])" class="text-gray-900"> {{ housing.manager.user.name }} </Link> since <time :datetime="convertDateTime(housing.manager.created_at)"> {{ convertDate(housing.manager.created_at) }} </time></p>
                </div>
            </div>
            <div class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                <Link :href="route('housing.show', [housing.slug])" class="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-sky-500">
                    <EyeIcon class="h-5 w-5" />
                </Link>
                <Link :href="route('admin.housing.edit', [housing.id])" class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-sky-500">
                    <PencilSquareIcon class="h-5 w-5" />
                </Link>
            </div>
        </div>

        <div class="my-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-8xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div class="space-y-6 lg:col-start-1 lg:col-span-2">
                <!-- Profile Cover Image -->
                <section>
                    <div class="shadow sm:rounded-lg sm:overflow-hidden">
                        <img class="h-36 w-full object-cover" :src="housing.cover_image_url" :alt="housing.name" />
                    </div>
                </section>

                <!-- Description list-->
                <section aria-labelledby="housing-information-title">
                    <div class="relative bg-white shadow sm:rounded-lg sm:overflow-hidden">
                        <div class="px-4 py-5 sm:px-6">
                            <h2 id="housing-information-title" class="text-lg leading-6 font-medium text-gray-900">Housing Information</h2>
                        </div>
                        <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
                            <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">Name</dt>
                                    <dd class="mt-1 text-sm text-gray-900"> {{ housing.name }} </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">Website</dt>
                                    <dd class="mt-1 text-sm text-gray-900"> {{ housing.website_url }} </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">Email address</dt>
                                    <dd class="mt-1 text-sm text-gray-900"> {{ housing.email_address }} </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">Phone</dt>
                                    <dd class="mt-1 text-sm text-gray-900"> {{ housing.phone_number }} </dd>
                                </div>
                                <div class="sm:col-span-2">
                                    <dt class="text-sm font-medium text-gray-500">Address</dt>
                                    <dd class="mt-1 text-sm text-gray-900"> {{ `${housing.street}, ${housing.city}, Idaho ${housing.postal_code}` }} </dd>
                                </div>
                                <div class="sm:col-span-2">
                                    <dt class="text-sm font-medium text-gray-500">About</dt>
                                    <div class="mt-1 prose prose-lg text-sm text-gray-900" v-html="housing.about" />
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">Rent</dt>
                                    <dd class="mt-1 text-sm text-gray-900"> {{ housing.rent_range }} </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">Housing Type</dt>
                                    <dd class="mt-1 text-sm text-gray-900"> {{ housing.housing_type }} </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">Bedrooms</dt>
                                    <dd class="mt-1 text-sm text-gray-900"> {{ housing.bedroom_range }} </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">Bathrooms</dt>
                                    <dd class="mt-1 text-sm text-gray-900"> {{ housing.bathroom_range }} </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </section>

                <!-- Reviews-->
                <section aria-labelledby="reviews-title">
                    <div class="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                        <div class="divide-y divide-gray-200">
                            <div class="px-4 py-5 sm:px-6">
                                <h2 id="reviews-title" class="text-lg font-medium text-gray-900">Reviews</h2>
                            </div>
                            <div class="px-4 py-6 sm:px-6">
                                <ul role="list" class="space-y-8">
                                    <li v-for="review in housing.reviews" :key="review.id">
                                        <div class="flex space-x-3">
                                            <div class="flex-shrink-0">
                                                <img class="h-10 w-10 rounded-full object-cover" :src="review.user.profile_photo_url" :alt="review.user.name" />
                                            </div>
                                            <div>
                                                <div class="text-sm">
                                                    <a href="#" class="font-medium text-gray-900">{{ review.user.name }}</a>
                                                </div>
                                                <div class="mt-1 text-sm text-gray-700">
                                                    <p>{{ review.body }}</p>
                                                </div>
                                                <div class="mt-2 text-sm space-x-2">
                                                    <span class="text-gray-500 font-medium">{{ convertDateFromNow(review.created_at) }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <Link href="#" class="block bg-sky-50 text-sm font-medium text-sky-500 text-center px-4 py-4 hover:text-sky-700 sm:rounded-b-lg"> View all reviews </Link>
                        </div>
                    </div>
                </section>

                <!-- Actions -->
                <section aria-labelledby="actions-title">
                    <div class="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                        <div class="divide-y divide-gray-200">
                            <div class="px-4 py-5 sm:px-6">
                                <h2 id="actions-title" class="text-lg font-medium text-gray-900">Actions</h2>
                            </div>
                            <div v-if="housing.manager" class="flex items-center justify-between px-4 py-6 sm:px-6">
                                <div>
                                    <h3 class="text-base leading-6 font-medium text-gray-900">Remove housing manager</h3>
                                    <p class="mt-1 max-w-2xl text-sm text-gray-500">Housing information will not be affected.</p>
                                </div>
                                <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-sky-700 bg-sky-100 hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"> Remove manager </button>
                            </div>
                            <div class="flex items-center justify-between px-4 py-6 sm:px-6">
                                <div>
                                    <h3 class="text-base leading-6 font-medium text-gray-900">Delete housing</h3>
                                    <p class="mt-1 max-w-2xl text-sm text-gray-500">Once you delete this housing, there is no going back.</p>
                                </div>
                                <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"> Delete housing </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section aria-labelledby="revision-history-title" class="lg:col-start-3 lg:col-span-1">
                <div class="bg-white shadow sm:rounded-lg">
                    <div class="px-4 py-5 sm:px-6">
                        <h2 id="revision-history-title" class="text-lg font-medium text-gray-900">Revision History</h2>
                    </div>

                    <!-- Revision History -->
                    <div class="flow-root border-t border-gray-200">
                        <ul role="list" class="divide-y divide-gray-200">
                            <li v-for="item in housing.revision_history" :key="item.id" class="p-4">
                                <template v-if="item.key === 'created_at'">
                                    <div class="flex">
                                        <div class="flex-1">
                                            <p class="text-sm text-gray-500">
                                                <span class="font-medium text-gray-700">{{ convertKey(item.key) }}</span>
                                                on <span class="italic">{{ convertDate(item.new_value) }}</span>
                                            </p>
                                        </div>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="flex space-x-3">
                                        <img class="h-6 w-6 rounded-full object-cover" :src="item.user.profile_photo_url" :alt="item.user.name" />
                                        <div class="flex-1 space-y-1">
                                            <div class="flex items-center justify-between">
                                                <h3 class="text-sm font-medium">{{ item.user.name }}</h3>
                                                <p class="text-sm text-gray-500">{{ convertDateFromNowNoSuffix(item.updated_at) }}</p>
                                            </div>
                                            <p class="text-sm text-gray-500">
                                                {{ getRevisionAction(item.key) }} <span class="font-medium text-gray-700">{{ convertKey(item.key) }}</span>
                                                <template v-if="item.old_value"> from <span class="italic">{{ item.old_value }}</span></template>
                                                {{' '}}
                                                to <span class="italic">{{ item.new_value }}</span>
                                            </p>
                                        </div>
                                    </div>
                                </template>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Link href="#" class="block bg-sky-50 text-sm font-medium text-sky-500 text-center px-4 py-4 hover:text-sky-700 sm:rounded-b-lg"> View full history </Link>
                    </div>
                </div>
            </section>
        </div>
    </admin-layout>
</template>

<script>
    import AdminLayout from '@/Layouts/AdminLayout.vue';
    import { Link } from '@inertiajs/vue3';
    import { EyeIcon, PencilSquareIcon } from '@heroicons/vue/24/outline';
    import convertKey from '@/Utils/convertKey';
    import { convertDate, convertDateFromNow, convertDateFromNowNoSuffix, convertDateTime } from '@/Utils/convertDate';

    export default {
        components: {
            AdminLayout,
            EyeIcon,
            Link,
            PencilSquareIcon,
        },
        props: {
            housing: Object,
        },
        methods: {
            convertDate,
            convertDateTime,
            convertDateFromNow,
            convertDateFromNowNoSuffix,
            convertKey,
            getRevisionAction(key) {
                switch (key) {
                    case 'created_at':
                        return 'Created';
                        break;

                    default:
                        return 'Updated';
                        break;
                }
            },
        }
    }
</script>
