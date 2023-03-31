<script setup>
import { defineComponent, h, ref } from 'vue';
import { Head, Link } from '@inertiajs/vue3';
import { Dialog, DialogPanel } from '@headlessui/vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';

import singleHousing from '../../images/single-housing.jpg';
import marriedHousing from '../../images/married-housing.jpg';

const mobileMenuOpen = ref(false);

const navigation = [
  { name: 'Housing', href: '#' },
//   { name: 'Businesses', href: '#' },
//   { name: 'Jobs', href: '#' },
//   { name: 'Rides', href: '#' },
//   { name: 'Activities', href: '#' },
];

defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String,
});
</script>

<template>
    <Head title="Welcome" />

    <div class="bg-slate-100 dark:bg-dots-lighter dark:bg-slate-900 selection:bg-sky-500 selection:text-white">
        <header class="absolute inset-x-0 top-0 z-50">
            <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 lg:py-10" aria-label="Global">
                <div class="flex lg:flex-1">
                    <a href="#" class="-m-1.5 p-1.5">
                        <span class="sr-only">RexburgGuru</span>
                        <ApplicationLogo class="h-6 w-auto" />
                    </a>
                </div>
                <div class="flex lg:hidden">
                    <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
                        <span class="sr-only">Open main menu</span>
                        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div class="hidden lg:flex lg:gap-x-12">
                    <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-sm font-semibold leading-6 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">{{ item.name }}</a>
                </div>
                <div class="hidden lg:flex lg:items-center lg:flex-1 lg:justify-end lg:space-x-6">
                    <Link v-if="$page.props.auth.user" :href="route('login')" class="text-sm font-semibold leading-6 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">Dashboard <span aria-hidden="true">&rarr;</span></Link>
                    <template v-else>
                        <Link :href="route('register')" class="rounded-md bg-[#B3D9E6] px-3.5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-[#DBEDF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">Register</Link>
                        <Link :href="route('login')" class="text-sm font-semibold leading-6 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">Log in <span aria-hidden="true">&rarr;</span></Link>
                    </template>
                </div>
            </nav>
        </header>

        <main class="isolate">
            <div class="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-slate-400/20 pt-14">
                <div class="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
                    <div class="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
                        <h1 class="max-w-2xl text-4xl font-bold tracking-tight text-zinc-100 sm:text-6xl lg:col-span-2 xl:col-auto">
                            We're changing the way students enjoy Rexburg.
                        </h1>
                        <div class="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                            <p class="text-lg leading-8 text-slate-300">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua. Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.</p>
                        </div>
                        <div class="mt-10 aspect-[6/5] max-w-lg space-y-6 sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2">
                            <Link
                                :href="route('housing.single')"
                                class="scale-100 p-6 bg-white dark:bg-slate-800/50 dark:bg-gradient-to-bl from-slate-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-slate-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-sky-500"
                            >
                                <img class="absolute inset-0 h-full w-full rounded-lg object-cover brightness-50 saturate-40" :src="singleHousing" alt="" />
                                <div class="hidden md:absolute md:bottom-16 md:left-[50rem] md:block md:transform-gpu md:blur-3xl" aria-hidden="true">
                                    <div class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-25" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
                                </div>
                                <div class="relative flex">
                                    <div class="pt-16">
                                        <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Single Housing</h2>

                                        <p class="mt-4 font-medium text-slate-300 dark:text-slate-300 text-sm leading-relaxed">
                                            Find BYU-I approved housing for single students. You can get private 
                                            rooms or apartments ranging from 4-8 people.
                                        </p>
                                    </div>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        class="self-center shrink-0 stroke-sky-200 w-6 h-6 mx-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                        />
                                    </svg>
                                </div>
                            </Link>
                            <Link
                                :href="route('housing.married')"
                                class="scale-100 p-6 bg-white dark:bg-slate-800/50 dark:bg-gradient-to-bl from-slate-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-slate-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-sky-500"
                            >
                                <img class="absolute inset-0 h-full w-full rounded-lg object-cover brightness-50 saturate-40" :src="marriedHousing" alt="" />
                                <div class="hidden md:absolute md:bottom-16 md:left-[50rem] md:block md:transform-gpu md:blur-3xl" aria-hidden="true">
                                    <div class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-25" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
                                </div>
                                <div class="relative flex">
                                    <div class="pt-16">
                                        <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Married Housing</h2>

                                        <p class="mt-4 font-medium text-slate-300 dark:text-slate-300 text-sm leading-relaxed">
                                            Married housing is crucial, but difficult to find. We're making it easier. 
                                            You can find different sizes and amenities.
                                        </p>
                                    </div>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        class="self-center shrink-0 stroke-sky-200 w-6 h-6 mx-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                        />
                                    </svg>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
