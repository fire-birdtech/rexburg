<template>
    <app-layout title="Welcome" :canLogin="canLogin" :canRegister="canRegister">
        <div class="relative bg-gray-50 px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28">
            <div class="absolute inset-0">
                <div class="h-1/3 bg-white sm:h-2/3"></div>
            </div>
            <div class="relative mx-auto max-w-7xl">
                <div class="text-center">
                    <h2 class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
                        Welcome to RexburgGuru!
                    </h2>
                </div>
                <div class="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-2">
                    <div class="flex flex-col overflow-hidden rounded-lg shadow-lg">
                        <div class="shrink-0">
                            <img :src="singleHousing" alt="a group of friends" class="h-64 w-full object-cover">
                        </div>
                        <div class="flex flex-1 flex-col justify-between bg-white p-6">
                            <div class="flex-1">
                                <Link href="#" class="block">
                                    <h3 class="mt-2 text-xl font-semibold leading-7 text-gray-900">
                                        Single Housing
                                    </h3>
                                    <p class="mt-3 text-base leading-6 text-gray-500">
                                        Single housing is the largest portion of BYU-I approved housing. You can find private rooms or apartments ranging from 4-8 people. Click the button below to find your preferences.
                                    </p>
                                </Link>
                            </div>
                            <div class="mt-6 flex items-center">
                                <Link :href="route('housing.single')" class="w-full rounded-md bg-gradient-to-r from-sky-400 to-blue-500 py-3 text-center text-base font-semibold leading-5 text-white shadow transition duration-150 ease-in-out hover:from-sky-500 hover:to-blue-700 focus:outline-none">
                                    View Listings
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col overflow-hidden rounded-lg shadow-lg">
                        <div class="shrink-0">
                            <img :src="marriedHousing" alt="married couple in front of trees" class="h-64 w-full object-cover" />
                        </div>
                        <div class="flex flex-1 flex-col justify-between bg-white p-6">
                            <div class="flex-1">
                                <Link href="#" class="block">
                                    <h3 class="mt-2 text-xl font-semibold leading-7 text-gray-900">
                                        Married Housing
                                    </h3>
                                    <p class="mt-3 text-base leading-6 text-gray-500">
                                        Married housing is crucial to find when you get married. Married housing comes in different sizes and amenities. Find what you prefer by clicking the button below.
                                    </p>
                                </Link>
                            </div>
                            <div class="mt-6 flex items-center">
                                <Link :href="route('housing.married')" class="w-full rounded-md bg-gradient-to-r from-blue-500 to-sky-400 py-3 text-center text-base font-semibold leading-5 text-white shadow transition duration-150 ease-in-out hover:from-blue-700 hover:to-sky-500 focus:outline-none">
                                    View Listings
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="overflow-hidden bg-gray-50 py-16 lg:py-24">
            <div class="relative mx-auto max-w-xl px-4 sm:px-6 lg:max-w-screen-xl lg:px-8">
                <svg class="absolute left-full hidden -translate-x-1/2 -translate-y-1/4 lg:block" width="404"
                    height="784" fill="none" viewBox="0 0 404 784">
                    <defs>
                        <pattern id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7" x="0" y="0" width="20" height="20"
                            patternUnits="userSpaceOnUse">
                            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width="404" height="784" fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)" />
                </svg>

                <div class="relative">
                    <h3 class="text-center text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
                        A better way to find student housing
                    </h3>
                    <p class="mx-auto mt-4 max-w-4xl text-center text-xl leading-7 text-gray-500">
                        Housing for students in Rexburg is notoriously difficult to find. We make it simpler by
                        having as comprehensive a list as possible. No more relying on search engine results.
                    </p>
                </div>

                <div class="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
                    <div class="relative">
                        <h4 class="text-2xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-3xl sm:leading-9">
                            Search our comprehensive listings
                        </h4>
                        <p class="mt-3 text-lg leading-7 text-gray-500">
                            Our promise is to provide up-to-date information and listing for each apartment complex we’re
                            partnered with. We encourage tenant reviews so each person can make a clear decision.
                        </p>

                        <ul class="mt-10">
                            <li>
                                <div class="flex">
                                    <div class="shrink-0">
                                        <div class="flex h-12 w-12 items-center justify-center rounded-md bg-sky-500 text-white">
                                            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd" fillRule="evenodd"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="ml-4">
                                        <h5 class="text-lg font-medium leading-6 text-gray-900">Up-to-date details</h5>
                                        <p class="mt-2 text-base leading-6 text-gray-500">
                                            We work with each listing manager to guarantee that their details are
                                            up-to-date. It's important to us that the most accurate information
                                            available to you.
                                        </p>
                                    </div>
                                </div>
                            </li>

                            <li class="mt-10">
                                <div class="flex">
                                    <div class="shrink-0">
                                        <div
                                            class="flex h-12 w-12 items-center justify-center rounded-md bg-sky-500 text-white">
                                            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                                </path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="ml-4">
                                        <h5 class="text-lg font-medium leading-6 text-gray-900">Reviews</h5>
                                        <p class="mt-2 text-base leading-6 text-gray-500">
                                            No listing would be complete without reviews from the community. See what
                                            others have said and be sure to share your own thoughts.
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="relative mt-10 sm:-mx-4 lg:mt-0">
                        <svg class="absolute left-1/2 -translate-x-1/2 translate-y-16 lg:hidden" width="784"
                            height="404" fill="none" viewBox="0 0 784 404">
                            <defs>
                                <pattern id="ca9667ae-9f92-4be7-abcb-9e3d727f2941" x="0" y="0" width="20" height="20"
                                    patternUnits="userSpaceOnUse">
                                    <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                                </pattern>
                            </defs>
                            <rect width="784" height="404" fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)" />
                        </svg>
                        <img class="relative mx-auto rounded-lg shadow-lg" width="450" :src="listingImage" alt="Apartment listing" />
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-gradient-to-r from-sky-500 to-orange-400">
            <div class="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
                <h2 class="text-3xl font-extrabold leading-9 text-white sm:text-4xl sm:leading-10">
                    <span class="block">Find the best housing for you.</span>
                    <span class="block text-sky-900">Start using RexburgGuru today.</span>
                </h2>
                <p class="mt-4 text-lg leading-6 text-teal-100">RexburgGuru is here to provide up-to-date information on apartment complexes in Rexburg. Find your apartment preferences today!</p>
                <Link :href="route('register')" class="mt-8 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium leading-6 text-teal-500 transition duration-150 ease-in-out hover:text-sky-900 sm:w-auto">
                    Sign up for free
                </Link>
            </div>
        </div>
        <Footer />
    </app-layout>
</template>

<script>
import { Link } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import Footer from '@/Components/Footer.vue';
import listingImage from '../../images/listing.png';
import singleHousing from '../../images/single-housing.jpg';
import marriedHousing from '../../images/married-housing.jpg';

export default {
  components: {
    AppLayout,
    Footer,
    Link,
  },

  data() {
    return {
      listingImage,
      marriedHousing,
      singleHousing,
    };
  },

  props: {
    canLogin: Boolean,
    canRegister: Boolean,
  },
};
</script>
