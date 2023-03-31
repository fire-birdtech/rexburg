<script setup>
import { ref } from 'vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import { Head, Link } from '@inertiajs/vue3';
import { ChevronDownIcon, UserIcon, UsersIcon } from '@heroicons/vue/24/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import Notification from '@/Components/Notification.vue';

defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
    title: String,
    description: String,
});

const showingNavigationDropdown = ref(false);

const housing = [
    { name: "Single Housing", href: route('housing.single'), icon: UserIcon },
    { name: "Married Housing", href: route('housing.married'), icon: UsersIcon },
];

const navigation = [
  { name: 'Housing', href: '#' },
//   { name: 'Businesses', href: '#' },
//   { name: 'Jobs', href: '#' },
//   { name: 'Rides', href: '#' },
//   { name: 'Activities', href: '#' },
];

const defaultDescription = "We are the go-to place for everything Rexburg. Students at BYU-Idaho can find housing and more to come. Create your free account today!";
</script>

<template>
    <Head :title="title">
        <meta head-key="description" name="description" :content="description || defaultDescription" />
    </Head>

    <div class="min-h-screen bg-slate-100 dark:bg-dots-lighter dark:bg-slate-900 selection:bg-sky-500 selection:text-white">
        <header class="absolute inset-x-0 top-0 z-50">
            <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 lg:py-10" aria-label="Global">
                <div class="flex lg:flex-1">
                    <Link :href="route('dashboard')" class="-m-1.5 p-1.5">
                        <span class="sr-only">RexburgGuru</span>
                        <ApplicationLogo class="h-6 w-auto" />
                    </Link>
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
                    <template v-if="$page.props.auth.user">
                    <!-- Settings Dropdown -->
                        <Dropdown align="right" width="48">
                            <template #trigger>
                                <span class="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-semibold rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 focus:outline-none transition ease-in-out duration-150"
                                    >
                                        {{ $page.props.auth.user.name }}

                                        <svg
                                            class="ml-2 -mr-0.5 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </template>

                            <template #content>
                                <DropdownLink :href="route('profile.edit')"> Profile </DropdownLink>
                                <DropdownLink :href="route('logout')" method="post" as="button">
                                    Log Out
                                </DropdownLink>
                            </template>
                        </Dropdown>
                    </template>
                    <template v-else>
                        <Link :href="route('register')" class="rounded-md bg-[#B3D9E6] px-3.5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-[#DBEDF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">Register</Link>
                        <Link :href="route('login')" class="text-sm font-semibold leading-6 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">Log in <span aria-hidden="true">&rarr;</span></Link>
                    </template>
                </div>
            </nav>
        </header>

        <main class="py-20">
            <slot />
        </main>
    </div>
    <Notification />
</template>
