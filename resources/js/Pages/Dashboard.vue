<template>
    <app-layout title="Dashboard">
        <div class="py-12 px-4 md:px-0">
            <div class="max-w-7xl mx-auto space-y-8 sm:px-6 lg:px-8">
                <div v-if="claims > 0">
                    <div class="max-w-7xl mx-auto">
                        <div class="p-2 rounded-lg bg-sky-500 shadow-lg sm:p-3">
                            <div class="flex items-center justify-between flex-wrap">
                                <div class="w-0 flex-1 flex items-center">
                                    <span class="flex p-2 rounded-lg bg-sky-600">
                                        <SpeakerphoneIcon class="h-6 w-6 text-white" aria-hidden="true" />
                                    </span>
                                    <p class="ml-3 font-medium text-white truncate">
                                        Your verification code is on the way!
                                    </p>
                                </div>
                                <div class="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                                    <Link :href="route('claims.verify')" class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-sky-600 bg-white hover:bg-sky-100">
                                        Verify
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <template v-if="housings.length === 0 && reviews.length === 0">
                    <div>
                        <h2 class="text-lg font-medium text-gray-900">
                            Welcome, {{ $page.props.user.name }}!
                        </h2>
                        <p class="mt-1 text-sm text-gray-500">
                            It seems you're new here. We're so glad you could join us. Get started by selecting the type of housing you're looking for.
                        </p>
                        <ul role="list" class="mt-6 border-t border-gray-200 py-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <li v-for="(item, itemIdx) in items" :key="itemIdx" class="flow-root">
                                <div class="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-200 focus-within:ring-2 focus-within:ring-sky-500">
                                    <div class="bg-sky-500 flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg">
                                        <component :is="item.icon" class="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <h3 class="text-md font-medium text-gray-900">
                                            <a :href="item.href" class="focus:outline-none">
                                                <span class="absolute inset-0" aria-hidden="true" />
                                                {{ item.title }}<span aria-hidden="true"> &rarr;</span>
                                            </a>
                                        </h3>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </template>
                <template v-else>
                    <div v-if="manages.length">
                        <h2>My properties</h2>
                        <div class="py-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <DashboardReviewable v-for="housing in manages" :key="housing.id" :image="housing.manageable.cover_image_url" :name="housing.manageable.name" :slug="housing.manageable.slug" />
                        </div>
                    </div>
                    <div v-if="housings.length">
                        <h2>Places I've lived</h2>
                        <div class="py-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <DashboardReviewable v-for="housing in housings" :key="housing.id" :image="housing.cover_image_url" :name="housing.name" :slug="housing.slug" />
                        </div>
                    </div>
                    <div v-if="reviews.length">
                        <h2>Reviews by me</h2>
                        <div class="py-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <Link v-for="(review, idx) in reviews" :key="idx" href="#" class="transform duration-200 hover:-translate-y-1">
                                <div class="bg-white shadow-xl rounded-xl">
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
                    </div>
                </template>
            </div>
        </div>
    </app-layout>
</template>

<script>
    import AppLayout from '@/Layouts/AppLayout.vue';
    import { Link } from '@inertiajs/inertia-vue3';
    import Stars from '@/Components/Stars';
    import DashboardReviewable from '@/Components/DashboardReviewable';
    import { SpeakerphoneIcon } from '@heroicons/vue/outline';
    import { UserIcon, UsersIcon } from '@heroicons/vue/solid';

    const items = [
        {
            title: 'Single Housing',
            icon: UserIcon,
            href: route('housing.single'),
        },
        {
            title: 'Married Housing',
            icon: UsersIcon,
            href: route('housing.married')
        },
    ];

    export default {
        components: {
            AppLayout,
            DashboardReviewable,
            Link,
            SpeakerphoneIcon,
            Stars,
        },
        props: ['claims', 'housings', 'manages', 'reviews'],
        setup() {
            return {
                items
            }
        },
    }
</script>
