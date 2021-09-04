<template>
    <app-layout :canLogin="canLogin" :canRegister="canRegister">
        <div>
            <img :src="listing.image" alt="" class="h-32 w-full object-cover lg:h-56">
        </div>
        <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                <div class="flex">
                    <img class="h-24 w-24 rounded-full ring-4 ring-gray-100 sm:h-32 sm:w-32" :src="listing.image" alt="" />
                </div>
                <div class="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                    <div class="flex items-center sm:hidden md:flex mt-6 min-w-0 flex-1">
                        <h1 class="text-2xl md:text-4xl font-bold text-gray-900 truncate">
                            {{ listing.name }}
                        </h1>
                        <BadgeCheckIcon v-if="listing.verified" class="ml-4 h-6 w-6 text-sky-500" />
                    </div>
                </div>
            </div>
            <div class="hidden sm:block md:hidden mt-6 min-w-0 flex-1">
                <h1 class="text-3xl font-bold text-gray-900 truncate">
                    {{ listing.name }}
                </h1>
            </div>
            <div class="md:flex">
                <aside class="mt-8 md:w-1/3 md:order-2">
                    <div class="sticky top-12">
                        <div class="rounded-xl border-2 border-gray-400 p-4">
                            <div class="flex flex-col items-center">
                                <div class="text-xl font-bold text-sky-600">Contact {{ listing.name }}</div>
                                <div class="mt-6 w-full">
                                    <a :href="listing.website" target="_blank" class="block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-base text-center font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                                        Visit website
                                    </a>
                                </div>
                                <a :href="`tel:${listing.phone}`" class="mt-4 inline-flex md:hidden justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                    <PhoneIcon class="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    <span>{{ listing.phone }}</span>
                                </a>
                                <div class="hidden mt-4 md:flex md:items-center">
                                    <DeviceMobileIcon class="flex-shrink-0 w-6 h-6 text-gray-500" />
                                    <span class="ml-2 text-lg font-medium text-gray-700">{{ listing.phone }}</span>
                                </div>
                                <a :href="`mailto:${listing.email}`" class="mt-4 inline-flex md:hidden justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                    <MailIcon class="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    <span>Send an email</span>
                                </a>
                                <div class="hidden mt-4 md:flex md:items-center">
                                    <MailOutlineIcon class="flex-shrink-0 w-6 h-6 text-gray-500" />
                                    <span class="ml-2 text-lg font-mediu text-gray-700">{{ listing.email }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
                <div class="mt-8 lg:w-2/3 md:mt-2 md:order-1">
                    <div class="md:px-4 md:py-5">
                        <p class="text-xl font-medium text-gray-700">{{ `${listing.street}, ${listing.city}, Idaho ${listing.zip}` }}</p>
                        <div class="flex flex-col space-y-3 pt-4 text-gray-600 sm:space-x-6 sm:space-y-0 sm:mt-0 sm:flex-row sm:flex-wrap">
                            <template v-if="listing.housing_type == 'single'">
                                <div class="flex items-center text-md leading-5">
                                    <CheckIcon class="mr-2 flex-shrink-0 h-5 w-5 text-gray-500" />
                                    <span>BYU-Idaho Approved</span>
                                </div>
                                <div class="flex items-center text-md leading-5">
                                    <UserIcon class="mr-2 flex-shrink-0 h-5 w-5 text-gray-500" />
                                    <span>Single Housing</span>
                                </div>
                            </template>
                            <template v-if="listing.housing_type == 'married'">
                                <div class="flex items-center text-md leading-5">
                                    <UsersIcon class="mr-2 flex-shrink-0 h-5 w-5 text-gray-500" />
                                    <span>Married Housing</span>
                                </div>
                            </template>
                            <div class="flex items-center text-md leading-5">
                                <LocationMarkerIcon class="mr-2 flex-shrink-0 h-5 w-5 text-gray-500" />
                                <span>{{ listing.city }}</span>
                            </div>
                        </div>
                        <div class="pt-5 flex items-center space-x-4">
                            <div class="flex space-x-1">
                                <StarIcon class="h-6 w-6 fill-current text-sky-500" />
                                <StarIcon class="h-6 w-6 fill-current text-sky-500" />
                                <StarIcon class="h-6 w-6 fill-current text-sky-500" />
                                <StarIcon class="h-6 w-6 fill-current text-sky-500" />
                                <StarIcon class="h-6 w-6 fill-current text-sky-300" />
                            </div>
                            <span class="text-gray-800 font-bold text-xl">{{ listing.score }}</span>
                        </div>
                        <div class="mt-8 flex md:inline-flex w-auto border border-gray-400 rounded-md">
                            <div class="px-4 md:py-4 md:px-0 flex flex-col w-full md:flex-row items-center divide-y-2 md:divide-x-2 md:divide-y-0 divide-gray-400">
                                <div class="flex flex-col items-center w-full py-4 md:px-12 md:py-0">
                                    <div class="text-lg text-gray-500">Semesterly Rent</div>
                                    <div class="text-2xl text-gray-700 font-medium">{{ listing.rent }}</div>
                                </div>
                                <div class="flex flex-col items-center w-full py-4 md:px-12 md:py-0">
                                    <div class="text-lg text-gray-500">Bedrooms</div>
                                    <div class="text-2xl text-gray-700 font-medium">{{ listing.bedrooms }} bd</div>
                                </div>
                                <div class="flex flex-col items-center w-full py-4 md:px-12 md:py-0">
                                    <div class="text-lg text-gray-500">Bathrooms</div>
                                    <div class="text-2xl text-gray-700 font-medium">{{ listing.bathrooms }} ba</div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-12 space-y-12">
                            <div>
                                <h2 class="text-3xl">Amenities</h2>
                                <div class="py-4">
                                    <dl class="grid grid-cols-1 gap-y-4 sm:gap-y-2 gap-x-3 sm:grid-cols-2 md:grid-cols-3">
                                        <div v-for="(amenity, index) in listing.amenities" :key={index} class="sm:col-span-1">
                                            <dd class="flex mt-1 text-base leading-5 text-gray-900">
                                                <CheckCircleIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-sky-500" />
                                                {{ amenity }}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                            <div>
                                <h2 class="text-3xl">About {{ listing.name }}</h2>
                                <div class="mt-4 prose prose-lg" v-html="listing.about"></div>
                            </div>
                            <div>
                                <h2 class="text-3xl">Grocery Stores</h2>
                                <div class="mt-4">
                                    <div class="mt-1 text-gray-900">
                                        <ul role="list" class="border border-gray-300 rounded-md divide-y divide-gray-300">
                                            <li v-for="(store, index) in listing.grocery_stores" :key="index" class="px-5 py-3 flex items-center justify-between text-base">
                                                <div class="w-0 flex-1 flex items-center">
                                                    <span class="flex-1 w-0">{{ store.name }}</span>
                                                </div>
                                                <div class="ml-4 flex-shrink-0">
                                                    <span>{{ store.distance }}</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 class="text-3xl">Tenant Reviews of {{ listing.name }}</h2>
                                <div class="mt-8 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12 ">
                                    <div class="rounded-md border-2 border-sky-800">
                                        <div class="flex flex-col items-center px-10 py-6 text-sky-500">
                                            <div class="text-6xl font-medium">{{ listing.score }}</div>
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
                                                <div class="mt-2 text-2xl font-medium">{{ listing.score }} score</div>
                                                <div class="mt-3 text-md">{{ listing.reviews_count }} Renter Reviews</div>
                                            </div>
                                            <div class="flex-1">
                                                <p class="text-lg">Share details of your own experience with {{ listing.name }}.</p>
                                                <button class="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Write my review</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-16 space-y-10">
                                    <blockquote v-for="(review, index) in listing.reviews" :key="index" class="flex flex-col">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </app-layout>
</template>

<script>
    import AppLayout from '@/Layouts/AppLayout.vue';
    import { BadgeCheckIcon, CheckCircleIcon, CheckIcon, HomeIcon, LocationMarkerIcon, MailIcon, PhoneIcon, StarIcon, UserIcon, UsersIcon } from '@heroicons/vue/solid';
    import { DeviceMobileIcon, MailIcon as MailOutlineIcon } from '@heroicons/vue/outline';

    const listing = {
        image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&h=1200&q=80",
        name: "Greenleaf Apartments",
        street: "755 S 2nd E",
        city: "Rexburg",
        zip: "83440",
        phone: "(208) 123-4567",
        email: "manager@greenleafapartments.com",
        website: "https://greanleafapartments.com",
        verified: true,
        rent: "$1,900-$2,150",
        bedrooms: "3-5",
        bathrooms: "2-3",
        score: "4.0",
        reviews_count: 34,
        slug: "greenleaf-apartments",
        housing_type: "single",
        amenities: [
            "Theater Rooms",
            "Close to Campus",
            "24-Hour Maintenance",
            "Barbecue Grill(s)",
            "Awesome Clubhouse",
            "Shuffle Board",
            "Online Payments",
            "Two Private Gyms",
            "Yoga/Ballet Studio",
            "Professionally Managed",
            "On-Site Maintenance",
            "Pool Table",
        ],
        about: "<p>Welcome to Greenleaf – luxury apartment living redefining the modern Idaho high-rise lifestyle. Our central location offers spectacular urban views, and sleek interiors let you express yourself in new and surprising ways.</p><p>Choose between our stylishly and open comfort of our one bedroom layouts, and the beautiful, light-filled space of our two bedroom residences.</p><p>We invite you to reimagine what home looks like.</p>",
        grocery_stores: [
            { name: "Broulims", distance: "1.8 mi" },
            { name: "Albertson's", distance: "2.1 mi" },
            { name: "Walmart", distance: "3.5 mi" },
        ],
        reviews: [
            { user: { name: "Judith Black", profile_photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}, rating: 5, created_at: "Feb 23, 2020", body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.", helpful_count: 27 },
            { user: { name: "Mark Morgan", profile_photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}, rating: 5, created_at: "Jul 15, 2018", body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.", helpful_count: 13 },
            { user: { name: "Ruben Austin", profile_photo_url: "https://images.unsplash.com/photo-1506919258185-6078bba55d2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1415&q=80"}, rating: 4, created_at: "Mar 3, 2019", body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.", helpful_count: 9 },
            { user: { name: "Erica George", profile_photo_url: "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=934&h=934&q=80"}, rating: 5, created_at: "Dec 6, 2019", body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.", helpful_count: 6 },
        ],
        friends: [
            { profile_photo_url: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
            { profile_photo_url: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
            { profile_photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" },
            { profile_photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
        ]
    };

    export default {
        components: {
            AppLayout,
            BadgeCheckIcon,
            CheckCircleIcon,
            CheckIcon,
            DeviceMobileIcon,
            HomeIcon,
            LocationMarkerIcon,
            MailIcon,
            MailOutlineIcon,
            PhoneIcon,
            StarIcon,
            UserIcon,
            UsersIcon,
        },
        props: {
            canLogin: Boolean,
            canRegister: Boolean,
        },
        setup() {
            return {
                listing,
            }
        },
    }
</script>