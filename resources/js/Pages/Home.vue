<template>
    <Head title="Welcome" />

    <app-layout :canLogin="canLogin" :canRegister="canRegister">
        <div class="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
            <div class="absolute inset-0">
                <div class="bg-white h-1/3 sm:h-2/3"></div>
            </div>
            <div class="relative max-w-7xl mx-auto">
                <div class="text-center">
                    <h2 class="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
                        Welcome to RexburgGuru!
                    </h2>
                </div>
                <div class="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-2 lg:max-w-none">
                    <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
                        <div class="flex-shrink-0">
                            <img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&crop=focalpoint&fp-y=0.61&w=887&h=400&q=80" alt="" class="h-64 w-full object-cover">
                        </div>
                        <div class="flex-1 bg-white p-6 flex flex-col justify-between">
                            <div class="flex-1">
                                <Link href="#" class="block">
                                    <h3 class="mt-2 text-xl leading-7 font-semibold text-gray-900">
                                        Single Housing
                                    </h3>
                                    <p class="mt-3 text-base leading-6 text-gray-500">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.
                                    </p>
                                </Link>
                            </div>
                            <div class="mt-6 flex items-center">
                                <Link :href="route('housing.single')" class="w-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-md shadow py-3 text-md leading-5 font-semibold text-white text-center hover:from-sky-500 hover:to-blue-700 focus:outline-none focus:shadow-outline-gray transition duration-150 ease-in-out">
                                    View Listings
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
                        <div class="flex-shrink-0">
                            <img class="h-64 w-full object-cover" src="https://images.unsplash.com/photo-1528213049955-adbe6fe1dcbd?ixlib=rb-1.2.1&auto=format&fit=crop&crop=focalpoint&fp-y=0.36&w=1350&h=550&q=80" alt="" />
                        </div>
                        <div class="flex-1 bg-white p-6 flex flex-col justify-between">
                            <div class="flex-1">
                                <Link href="#" class="block">
                                    <h3 class="mt-2 text-xl leading-7 font-semibold text-gray-900">
                                        Married Housing
                                    </h3>
                                    <p class="mt-3 text-base leading-6 text-gray-500">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.
                                    </p>
                                </Link>
                            </div>
                            <div class="mt-6 flex items-center">
                                <Link :href="route('housing.married')" class="w-full bg-gradient-to-r from-blue-500 to-sky-400 rounded-md shadow py-3 text-md leading-5 font-semibold text-white text-center hover:from-blue-700 hover:to-sky-500 focus:outline-none focus:shadow-outline-gray transition duration-150 ease-in-out">
                                    View Listings
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="py-16 bg-gray-50 overflow-hidden lg:py-24">
            <div class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
                <svg class="hidden lg:block absolute left-full transform -translate-x-1/2 -translate-y-1/4" width="404"
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
                    <h3 class="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
                        A better way to find student housing
                    </h3>
                    <p class="mt-4 max-w-4xl mx-auto text-center text-xl leading-7 text-gray-500">
                        Housing for students in Rexburg is notoriously difficult to find. We make it simpler by
                        having as comprehensive a list as possible. No more relying on search engine results.
                    </p>
                </div>

                <div class="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                    <div class="relative">
                        <h4 class="text-2xl leading-8 font-extrabold text-gray-900 tracking-tight sm:text-3xl sm:leading-9">
                            Search our comprehensive listings
                        </h4>
                        <p class="mt-3 text-lg leading-7 text-gray-500">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur minima sequi recusandae,
                            porro maiores officia assumenda aliquam laborum ab aliquid veritatis impedit odit adipisci
                            optio iste blanditiis facere. Totam, velit.
                        </p>

                        <ul class="mt-10">
                            <li>
                                <div class="flex">
                                    <div class="flex-shrink-0">
                                        <div class="flex items-center justify-center h-12 w-12 rounded-md bg-sky-500 text-white">
                                            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd" fillRule="evenodd"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="ml-4">
                                        <h5 class="text-lg leading-6 font-medium text-gray-900">Up-to-date details</h5>
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
                                    <div class="flex-shrink-0">
                                        <div
                                            class="flex items-center justify-center h-12 w-12 rounded-md bg-sky-500 text-white">
                                            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                                </path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="ml-4">
                                        <h5 class="text-lg leading-6 font-medium text-gray-900">Reviews</h5>
                                        <p class="mt-2 text-base leading-6 text-gray-500">
                                            No listing would be complete without reviews from the community. See what
                                            others have said and be sure to share your own thoughts.
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="mt-10 sm:-mx-4 relative lg:mt-0">
                        <svg class="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden" width="784"
                            height="404" fill="none" viewBox="0 0 784 404">
                            <defs>
                                <pattern id="ca9667ae-9f92-4be7-abcb-9e3d727f2941" x="0" y="0" width="20" height="20"
                                    patternUnits="userSpaceOnUse">
                                    <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                                </pattern>
                            </defs>
                            <rect width="784" height="404" fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)" />
                        </svg>
                        <img class="relative mx-auto shadow-lg rounded-lg" width="450" :src="listingImage" alt="Apartment listing" />
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-gradient-to-r from-sky-500 to-orange-400">
            <div class="max-w-2xl mx-auto py-16 px-4 text-center sm:py-20 sm:px-6 lg:px-8">
                <h2 class="text-3xl leading-9 font-extrabold text-white sm:text-4xl sm:leading-10">
                    <span class="block">Find the best housing for you.</span>
                    <span class="block text-sky-900">Start using RexburgGuru today.</span>
                </h2>
                <p class="mt-4 text-lg leading-6 text-teal-100">Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla nec.</p>
                <Link href="#" class="mt-8 w-full bg-white border border-transparent rounded-md py-3 px-5 inline-flex items-center justify-center text-base leading-6 font-medium text-teal-500 hover:text-sky-900 transition duration-150 ease-in-out sm:w-auto">
                    Sign up for free
                </Link>
            </div>
        </div>
    </app-layout>
</template>

<script>
    import { Head, Link } from '@inertiajs/inertia-vue3';
    import AppLayout from '@/Layouts/AppLayout.vue';

    export default {
        components: {
            AppLayout,
            Head,
            Link,
        },

        data() {
            return {
                listingImage: 'images/listing.png',
            }
        },

        props: {
            canLogin: Boolean,
            canRegister: Boolean,
        }
    }
</script>
