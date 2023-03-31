<template>
    <Head :title="title" />
    <div class="min-h-screen bg-gray-100">
        <div>
            <TransitionRoot as="template" :show="sidebarOpen">
                <Dialog as="div" class="fixed inset-0 flex z-40 md:hidden" @close="sidebarOpen = false">
                    <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
                        <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </TransitionChild>
                    <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
                        <div class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
                            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                                <div class="absolute top-0 right-0 -mr-12 pt-2">
                                    <button type="button" class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="sidebarOpen = false">
                                        <span class="sr-only">Close sidebar</span>
                                        <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </TransitionChild>
                            <div class="flex-shrink-0 flex items-center px-4">
                                <application-mark class="block h-8 w-auto" />
                            </div>
                            <div class="mt-5 flex-1 h-0 overflow-y-auto">
                                <nav class="px-2 space-y-1">
                                    <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'group flex items-center px-2 py-2 text-base font-medium rounded-md']">
                                        <component :is="item.icon" :class="[item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300', 'mr-4 flex-shrink-0 h-6 w-6']" aria-hidden="true" />
                                        {{ item.name }}
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </TransitionChild>
                    <div class="flex-shrink-0 w-14" aria-hidden="true">
                    <!-- Dummy element to force sidebar to shrink to fit close icon -->
                    </div>
                </Dialog>
            </TransitionRoot>

            <!-- Static sidebar for desktop -->
            <div class="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
                <!-- Sidebar component, swap this element with another sidebar if you like -->
                <div class="flex-1 flex flex-col min-h-0 bg-sky-600">
                    <div class="flex items-center h-16 flex-shrink-0 px-4 bg-sky-700">
                        <application-mark class="block h-8 w-auto" />
                    </div>
                    <div class="flex-1 flex flex-col overflow-y-auto">
                        <nav class="flex-1 px-2 py-4 space-y-1">
                            <Link v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.components.includes($page.component) ? 'bg-sky-700 text-white' : 'hover:bg-sky-500 text-white', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']">
                                <component :is="item.icon" :class="[item.components.includes($page.component) ? 'text-sky-200' : 'text-sky-300 group-hover:text-sky-200', 'mr-3 flex-shrink-0 h-6 w-6']" aria-hidden="true" />
                                {{ item.name }}
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
            <div class="md:pl-72 flex flex-col">
                <div class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
                    <button type="button" class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500 md:hidden" @click="sidebarOpen = true">
                        <span class="sr-only">Open sidebar</span>
                        <MenuAlt2Icon class="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div class="flex-1 px-6 flex justify-end">
                        <div class="ml-4 flex items-center md:ml-6">
                            <button type="button" class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                                <span class="sr-only">View notifications</span>
                                <BellIcon class="h-6 w-6" aria-hidden="true" />
                            </button>

                            <!-- Profile dropdown -->
                            <Menu as="div" class="ml-4 relative">
                                <div>
                                    <MenuButton class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                                        <span class="sr-only">Open user menu</span>
                                        <img class="h-8 w-8 rounded-full object-cover" :src="$page.props.auth.profile_photo_url" alt="" />
                                    </MenuButton>
                                </div>
                                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                    <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <MenuItem v-slot="{ active }">
                                            <Link :href="route('dashboard')" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Main site</Link>
                                        </MenuItem>
                                    </MenuItems>
                                </transition>
                            </Menu>
                        </div>
                    </div>
                </div>

                <main class="flex-1">
                    <div class="py-6">
                        <slot />
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue';
    import {
        Dialog,
        DialogOverlay,
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        TransitionChild,
        TransitionRoot,
    } from '@headlessui/vue';
    import {
        BellIcon,
        HomeIcon,
        MenuAlt2Icon,
        UsersIcon,
        ViewGridIcon,
        XIcon,
    } from '@heroicons/vue/24/outline';
    import { SearchIcon } from '@heroicons/vue/24/solid';
    import ApplicationMark from '@/Components/ApplicationMarkWhite.vue';
    import { Head, Link } from '@inertiajs/vue3';

    const navigation = [
        { name: 'Dashboard', href: route('admin.home'), icon: ViewGridIcon, components: ['Admin/Home'] },
        { name: 'Housing', href: route('admin.housing.index'), icon: HomeIcon, components: ['Admin/Claims/Index', 'Admin/Claims/Show', 'Admin/Housing/Index', 'Admin/Housing/Create', 'Admin/Housing/Show', 'Admin/Housing/Edit'] },
        { name: 'Users', href: route('admin.users.index'), icon: UsersIcon, components: ['Admin/Users/Index', 'Admin/Users/Show'] },
    ];

    export default {
        props: {
            title: String,
        },
        components: {
            ApplicationMark,
            Dialog,
            DialogOverlay,
            Head,
            Link,
            Menu,
            MenuButton,
            MenuItem,
            MenuItems,
            TransitionChild,
            TransitionRoot,
            BellIcon,
            MenuAlt2Icon,
            SearchIcon,
            XIcon
        },
        setup() {
            const sidebarOpen = ref(false);

            return {
                navigation,
                sidebarOpen,
            }
        },
    }
</script>