<template>
    <app-layout :canLogin="canLogin" :canRegister="canRegister">
        <div>
            <img :src="housing.cover_image_url" :alt="housing.name" class="h-32 w-full object-cover lg:h-56">
        </div>
        <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="-mt-12 sm:-mt-16 sm:flex sm:items-start">
                <div class="sm:flex sm:items-end sm:space-x-5">
                    <div class="flex">
                        <img class="h-24 w-24 rounded-full ring-4 ring-gray-100 sm:h-32 sm:w-32" :src="housing.profile_image_url" :alt="housing.name" />
                    </div>
                    <div class="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div class="flex items-center sm:hidden md:flex mt-6 min-w-0 flex-1">
                            <h1 class="text-2xl md:text-4xl font-bold text-gray-900 truncate">
                                {{ housing.name }}
                            </h1>
                            <!-- <BadgeCheckIcon v-if="housing.verified" class="ml-4 h-6 w-6 text-sky-500" /> -->
                        </div>
                    </div>
                </div>
                <div v-if="$page.props.user" class="ml-auto">
                    <Link :href="route('housing.profile.edit', [housing.slug])" v-if="(housing.manager?.id === $page.props.user.id) || isAdmin" type="button" class="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0">
                        Edit profile
                    </Link>
                </div>
            </div>
            <div class="hidden sm:block md:hidden mt-6 min-w-0 flex-1">
                <h1 class="text-3xl font-bold text-gray-900 truncate">
                    {{ housing.name }}
                </h1>
            </div>
            <div class="md:flex">
                <aside v-if="contactNotNull" class="mt-8 md:w-1/3 md:order-2">
                    <div class="sticky top-12">
                        <div class="rounded-xl border-2 border-gray-400 p-4">
                            <div class="flex flex-col items-center">
                                <div class="text-xl font-bold text-sky-600">Contact {{ housing.name }}</div>
                                <template v-if="housing.website_url !== null">
                                    <div class="mt-6 w-full">
                                        <a :href="`https://${housing.website_url}`" target="_blank" rel="noopener noreferrer" class="block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-base text-center font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                                            Visit website
                                        </a>
                                    </div>
                                </template>
                                <template v-if="housing.phone_number !== null">
                                    <a :href="`tel:${housing.phone_number}`" class="mt-4 inline-flex md:hidden justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                        <PhoneIcon class="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                        <span>{{ housing.phone_number }}</span>
                                    </a>
                                    <div class="hidden mt-4 md:flex md:items-center">
                                        <DeviceMobileIcon class="flex-shrink-0 w-6 h-6 text-gray-500" />
                                        <span class="ml-2 text-lg font-medium text-gray-700">{{ housing.phone_number }}</span>
                                    </div>
                                </template>
                                <template v-if="housing.email_address !== null">
                                    <a :href="`mailto:${housing.email_address}`" class="mt-4 inline-flex md:hidden justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                        <MailIcon class="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                        <span>Send an email</span>
                                    </a>
                                    <div class="hidden mt-4 md:flex md:items-center">
                                        <MailOutlineIcon class="flex-shrink-0 w-6 h-6 text-gray-500" />
                                        <span class="ml-2 text-lg font-mediu text-gray-700">{{ housing.email_address }}</span>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </aside>
                <div class="mt-8 lg:w-2/3 md:mt-2 md:order-1">
                    <div class="md:px-4 md:py-5">
                        <p class="text-xl font-medium text-gray-700">{{ `${housing.street}, ${housing.city}, Idaho ${housing.postal_code}` }}</p>
                        <div class="flex flex-col space-y-3 pt-4 text-gray-600 sm:space-x-6 sm:space-y-0 sm:mt-0 sm:flex-row sm:flex-wrap">
                            <template v-if="housing.housing_type == 'single'">
                                <div v-if="housing.byui_approved" class="flex items-center text-md leading-5">
                                    <CheckIcon class="mr-2 flex-shrink-0 h-5 w-5 text-gray-500" />
                                    <span>BYU-Idaho Approved</span>
                                </div>
                                <div class="flex items-center text-md leading-5">
                                    <UserIcon class="mr-2 flex-shrink-0 h-5 w-5 text-gray-500" />
                                    <span>Single Housing</span>
                                </div>
                            </template>
                            <template v-if="housing.housing_type == 'married'">
                                <div class="flex items-center text-md leading-5">
                                    <UsersIcon class="mr-2 flex-shrink-0 h-5 w-5 text-gray-500" />
                                    <span>Married Housing</span>
                                </div>
                            </template>
                            <div class="flex items-center text-md leading-5">
                                <LocationMarkerIcon class="mr-2 flex-shrink-0 h-5 w-5 text-gray-500" />
                                <span>{{ housing.city }}</span>
                            </div>
                        </div>
                        <div v-if="housing.reviews_count > 0" class="pt-5 flex items-center space-x-4">
                            <div class="flex space-x-1">
                                <StarIcon class="h-6 w-6 fill-current text-sky-500" />
                                <StarIcon class="h-6 w-6 fill-current text-sky-500" />
                                <StarIcon class="h-6 w-6 fill-current text-sky-500" />
                                <StarIcon class="h-6 w-6 fill-current text-sky-500" />
                                <StarIcon class="h-6 w-6 fill-current text-sky-300" />
                            </div>
                            <!-- <span class="text-gray-800 font-bold text-xl">{{ housing.score }}</span> -->
                        </div>
                        <div class="mt-8 flex md:inline-flex w-auto border border-gray-400 rounded-md">
                            <div class="px-4 md:py-4 md:px-0 flex flex-col w-full md:flex-row items-center divide-y-2 md:divide-x-2 md:divide-y-0 divide-gray-400">
                                <div class="flex flex-col items-center w-full py-4 md:px-12 md:py-0">
                                    <div class="text-lg text-gray-500">Semesterly Rent</div>
                                    <div class="text-2xl text-gray-700 font-medium">{{ housing.rent_range }}</div>
                                </div>
                                <div class="flex flex-col items-center w-full py-4 md:px-12 md:py-0">
                                    <div class="text-lg text-gray-500">Bedrooms</div>
                                    <div class="text-2xl text-gray-700 font-medium">{{ housing.bedroom_range }} bd</div>
                                </div>
                                <div class="flex flex-col items-center w-full py-4 md:px-12 md:py-0">
                                    <div class="text-lg text-gray-500">Bathrooms</div>
                                    <div class="text-2xl text-gray-700 font-medium">{{ housing.bathroom_range }} ba</div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-12 space-y-12">
                            <div>
                                <h2 class="text-3xl">Amenities</h2>
                                <div class="py-4">
                                    <dl class="grid grid-cols-1 gap-y-4 sm:gap-y-2 gap-x-3 sm:grid-cols-2 md:grid-cols-3">
                                        <div v-for="(amenity, index) in housing.amenities" :key={index} class="sm:col-span-1">
                                            <dd class="flex mt-1 text-base leading-5 text-gray-900">
                                                <CheckCircleIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-sky-500" />
                                                {{ amenity.name }}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                            <div v-if="housing.about">
                                <h2 class="text-3xl">About {{ housing.name }}</h2>
                                <div class="mt-4 prose prose-lg" v-html="housing.about"></div>
                            </div>
                            <div>
                                <h2 class="text-3xl">Tenant Reviews of {{ housing.name }}</h2>
                                <template v-if="housing.reviews_count > 0">
                                    <div class="mt-8 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12 ">
                                        <div class="rounded-md border-2 border-sky-800">
                                            <div class="flex flex-col items-center px-10 py-6 text-sky-500">
                                                <!-- <div class="text-6xl font-medium">{{ housing.score }}</div> -->
                                                <div class="text-3xl">Great</div>
                                            </div>
                                            <div class="bg-sky-800 p-4">
                                                <div class="text-white text-2xl text-center">Out of 5</div>
                                            </div>
                                        </div>
                                        <div class="bg-gray-200 overflow-hidden rounded-md flex-1">
                                            <div class="p-10 flex flex-col md:flex-row items-center justify-center space-x-10">
                                                <div class="flex-shrink-0">
                                                    <div class="flex space-x-1">
                                                        <StarIcon class="h-8 w-8 fill-current text-sky-500" />
                                                        <StarIcon class="h-8 w-8 fill-current text-sky-500" />
                                                        <StarIcon class="h-8 w-8 fill-current text-sky-500" />
                                                        <StarIcon class="h-8 w-8 fill-current text-sky-500" />
                                                        <StarIcon class="h-8 w-8 fill-current text-sky-300" />
                                                    </div>
                                                    <!-- <div class="mt-2 text-2xl font-medium">{{ housing.score }} score</div> -->
                                                    <div class="mt-3 text-md">{{ housing.reviews_count }} Renter Reviews</div>
                                                </div>
                                                <div class="flex-1">
                                                    <p class="text-lg">Share details of your own experience with {{ housing.name }}.</p>
                                                    <button class="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Write my review</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-16 space-y-10">
                                        <blockquote v-for="(review, index) in housing.reviews" :key="index" class="flex flex-col">
                                            <div class="flex">
                                                <div class="flex-shrink-0 inline-flex rounded-full border-2 border-sky-600">
                                                    <img :src="review.user.profile_photo_url" alt="" class="h-12 w-12 rounded-full">
                                                </div>
                                                <div class="ml-4">
                                                    <div class="flex items-center text-base leading-6 font-medium text-gray-900">
                                                        {{ review.user.name }}
                                                        <div class="inline-flex items-center px-2.5 py-0.5 ml-3 rounded-full text-xs font-medium leading-4 bg-sky-200 text-sky-800">
                                                            {{ review.rating }}
                                                            <StarIcon class="ml-1 -mr-0.5 h-3 w-3 text-sky-400" />
                                                        </div>
                                                    </div>
                                                    <div class="text-xs leading-6 font-medium text-sky-600">Reviewed on {{ review.created_at }}</div>
                                                </div>
                                            </div>
                                            <div class="relative text-sm leading-5 text-gray-900 md:flex-grow mt-4">
                                                <svg class="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-sky-400 opacity-25" fill="currentColor" viewBox="0 0 32 32">
                                                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                                </svg>
                                                <p class="relative">{{ review.body }}</p>
                                            </div>
                                            <div class="mt-4">
                                                <div class="text-sm text-gray-500">{{ review.helpful_count }} people found this helpful</div>
                                                <span class="inline-flex rounded-md shadow-sm mt-2">
                                                    <button type="button" class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-sky-300 focus:shadow-outline-sky active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                                                        Helpful
                                                    </button>
                                                </span>
                                            </div>
                                        </blockquote>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="mt-8 bg-gray-200 overflow-hidden rounded-md flex-1">
                                        <div class="p-10 flex flex-col md:flex-row items-center justify-center space-x-10">
                                            <div class="flex-1">
                                                <p class="text-lg">We currently don't have any reviews for {{ housing.name }}.</p>
                                                <p class="mt-4 text-md text-gray-800">Be the first to share details of your own experience.</p>
                                                <button class="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Write my review</button>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </app-layout>
</template>

<script>
    import { Link } from '@inertiajs/inertia-vue3';
    import AppLayout from '@/Layouts/AppLayout.vue';
    import { BadgeCheckIcon, CheckCircleIcon, CheckIcon, HomeIcon, LocationMarkerIcon, MailIcon, PhoneIcon, StarIcon, UserIcon, UsersIcon } from '@heroicons/vue/solid';
    import { DeviceMobileIcon, MailIcon as MailOutlineIcon } from '@heroicons/vue/outline';

    export default {
        components: {
            AppLayout,
            BadgeCheckIcon,
            CheckCircleIcon,
            CheckIcon,
            DeviceMobileIcon,
            HomeIcon,
            Link,
            LocationMarkerIcon,
            MailIcon,
            MailOutlineIcon,
            PhoneIcon,
            StarIcon,
            UserIcon,
            UsersIcon,
        },
        props: {
            housing: Object,
            isAdmin: Boolean,
            canLogin: Boolean,
            canRegister: Boolean,
        },
        computed: {
            contactNotNull() {
                return (
                    this.housing.website_url !== null ||
                    this.housing.phone_number !== null ||
                    this.housing.email_address !== null
                );
            },
        },
        methods: {
            showAmenities() {
                console.log(this.housing.amenities);
            }
        },
    }
</script>