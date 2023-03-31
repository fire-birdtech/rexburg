<template>
    <div>
        <Head :title="title">
            <meta head-key="description" name="description" :content="description || defaultDescription" />
        </Head>

        <div class="min-h-screen bg-gray-100">
            <nav class="bg-sky-500">
                <!-- Primary Navigation Menu -->
                <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between h-16">
                        <div class="flex items-center">
                            <!-- Logo -->
                            <div class="flex-shrink-0 flex items-center">
                                <Link :href="route('home')" :active="route().current('home')">
                                    <application-mark class="block h-6 w-auto" />
                                </Link>
                            </div>

                            <!-- Navigation Links -->
                            <div class="hidden ml-10 space-x-2 lg:flex lg:items-center">
                                <jet-nav-link v-if="$page.props.user" :href="route('dashboard')" :active="route().current('dashboard')">
                                    Dashboard
                                </jet-nav-link>

                                <Popover class="relative" v-slot="{ open }">
                                    <PopoverButton :class="[open ? 'bg-sky-600' : '', 'group text-base font-medium inline-flex items-center text-white hover:text-sky-50 px-4 py-2 rounded-md hover:bg-sky-600 hover:bg-opacity-75']">
                                        <span>Student Housing</span>
                                        <ChevronDownIcon :class="[open ? 'text-sky-100' : 'text-white', 'ml-2 h-5 w-5 group-hover:text-sky-100']" aria-hidden="true" />
                                    </PopoverButton>

                                    <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
                                        <PopoverPanel class="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
                                            <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                    <Link v-for="item in housing" :key="item.name" :href="item.href" class="-m-3 p-3 flex items-start rounded-lg hover:bg-sky-100 transition ease-in-out duration-150">
                                                        <component :is="item.icon" class="flex-shrink-0 h-6 w-6 text-sky-600" aria-hidden="true" />
                                                        <div class="ml-4">
                                                            <p class="text-base font-medium text-gray-900">{{ item.name }}</p>
                                                            <p class="mt-1 text-sm text-gray-500">{{ item.description }}</p>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </PopoverPanel>
                                    </transition>
                                </Popover>
                            </div>
                        </div>

                        <div class="hidden sm:flex sm:items-center sm:ml-6">
                            <!-- User Dropdown -->
                            <template v-if="$page.props.user">
                                <Menu as="div" class="ml-3 relative">
                                    <div>
                                        <MenuButton class="max-w-xs bg-sky-500 rounded-full flex items-center text-sm focus:outline-none lg:p-2 lg:rounded-md lg:hover:bg-sky-600 lg:hover:bg-opacity-75">
                                            <img class="h-10 w-10 rounded-full object-cover" :src="$page.props.user.profile_photo_url" :alt="$page.props.auth.name" />
                                            <span class="hidden ml-3 text-white text-sm font-medium lg:block"><span class="sr-only">Open user menu for </span>{{ $page.props.auth.name }}</span>
                                            <ChevronDownIcon class="hidden flex-shrink-0 ml-1 h-5 w-5 text-sky-50 lg:block" aria-hidden="true" />
                                        </MenuButton>
                                    </div>
                                    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                        <MenuItems class="origin-top-right absolute right-0 z-20 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <MenuItem v-slot="{ active }">
                                                <Link :href="route('profile.show')" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Your Profile</Link>
                                            </MenuItem>
                                            <MenuItem v-slot="{ active }">
                                                <Link :href="route('logout')" method="POST" as="button" :class="[active ? 'bg-gray-100' : '', 'block w-full text-left px-4 py-2 text-sm text-gray-700']">Logout</Link>
                                            </MenuItem>
                                        </MenuItems>
                                    </transition>
                                </Menu>
                            </template>

                            <template v-else>
                                <div class="ml-10 space-x-4">
                                    <Link :href="route('login')" class="inline-block bg-sky-400 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">
                                        Log in
                                    </Link>

                                    <Link v-if="canRegister" :href="route('register')" class="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-sky-600 hover:bg-sky-100">
                                        Register
                                    </Link>
                                </div>
                            </template>
                        </div>

                        <!-- Hamburger -->
                        <div class="-mr-2 flex items-center sm:hidden">
                            <button @click="showingNavigationDropdown = ! showingNavigationDropdown" class="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-sky-100 hover:bg-sky-400 focus:outline-none focus:bg-sky-400 transition">
                                <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path :class="{'hidden': showingNavigationDropdown, 'inline-flex': ! showingNavigationDropdown }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                    <path :class="{'hidden': ! showingNavigationDropdown, 'inline-flex': showingNavigationDropdown }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Responsive Navigation Menu -->
                <div :class="{'block': showingNavigationDropdown, 'hidden': ! showingNavigationDropdown}" class="sm:hidden">
                    <div class="pt-2 pb-3 space-y-1">
                        <jet-responsive-nav-link v-if="$page.props.user" :href="route('dashboard')" :active="route().current('dashboard')">
                            Dashboard
                        </jet-responsive-nav-link>

                        <jet-responsive-nav-link :href="route('housing.single')" :active="route().current('housing.single')">
                            Single Housing
                        </jet-responsive-nav-link>

                        <jet-responsive-nav-link :href="route('housing.married')" :active="route().current('housing.married')">
                            Married Housing
                        </jet-responsive-nav-link>
                    </div>

                    <!-- Responsive Settings Options -->
                    <div v-if="$page.props.user" class="pt-4 pb-1 border-t border-gray-200">
                        <div class="flex items-center px-4">
                            <div v-if="$page.props.jetstream.managesProfilePhotos" class="flex-shrink-0 mr-3" >
                                <img class="h-10 w-10 rounded-full object-cover" :src="$page.props.user.profile_photo_url" :alt="$page.props.user.name" />
                            </div>

                            <div>
                                <div class="font-medium text-base text-gray-50">{{ $page.props.user?.name }}</div>
                                <div class="font-medium text-sm text-gray-100">{{ $page.props.user?.email }}</div>
                            </div>
                        </div>

                        <div class="mt-3 space-y-1">
                            <jet-responsive-nav-link :href="route('profile.show')" :active="route().current('profile.show')">
                                Profile
                            </jet-responsive-nav-link>

                            <!-- Authentication -->
                            <form method="POST" @submit.prevent="logout">
                                <jet-responsive-nav-link as="button">
                                    Log Out
                                </jet-responsive-nav-link>
                            </form>
                        </div>
                    </div>

                    <div v-else class="pt-6 pb-2 px-5">
                        <div class="text-center text-base font-medium text-sky-200">
                            <Link :href="route('register')" class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-sky-500 bg-white">Register</Link>
                            <Link :href="route('login')" class="block mt-2 py-4 text-white">Log in</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Page Content -->
            <main>
                <slot></slot>
            </main>
        </div>
        <Notification />
    </div>
</template>

<script>
    import ApplicationMark from '@/Components/ApplicationMarkWhite.vue'
    import JetBanner from '@/Jetstream/Banner.vue'
    import JetDropdown from '@/Jetstream/Dropdown.vue'
    import JetDropdownLink from '@/Jetstream/DropdownLink.vue'
    import JetNavLink from '@/Jetstream/NavLink.vue'
    import JetResponsiveNavLink from '@/Jetstream/ResponsiveNavLink.vue'
    import { Head, Link } from '@inertiajs/vue3';
    import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
    import { ChevronDownIcon, UserIcon, UsersIcon } from '@heroicons/vue/24/solid';
    import Notification from '@/Components/Notification.vue';
    import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

    const housing = [
        { name: "Single Housing", href: route('housing.single'), icon: UserIcon },
        { name: "Married Housing", href: route('housing.married'), icon: UsersIcon },
    ];

    export default {
        props: {
            canLogin: Boolean,
            canRegister: Boolean,
            title: String,
            description: String,
        },

        components: {
            ApplicationMark,
            ChevronDownIcon,
            Head,
            JetBanner,
            JetDropdown,
            JetDropdownLink,
            JetNavLink,
            JetResponsiveNavLink,
            Link,
            Menu,
            MenuButton,
            MenuItem,
            MenuItems,
            Notification,
            Popover,
            PopoverButton,
            PopoverPanel,
        },

        data() {
            return {
                showingNavigationDropdown: false,
            }
        },

        methods: {
            switchToTeam(team) {
                this.$inertia.put(route('current-team.update'), {
                    'team_id': team.id
                }, {
                    preserveState: false
                })
            },

            logout() {
                this.$inertia.post(route('logout'));
            },
        },
        
        setup(props) {
            const defaultDescription = "We are the go-to place for everything Rexburg. Students at BYU-Idaho can find housing and more to come. Create your free account today!";

            return {
                defaultDescription,
                housing,
            }
        },
    }
</script>
