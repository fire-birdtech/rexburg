<template>
    <app-layout :canLogin="canLogin" :canRegister="canRegister">
        <div>
            <img :src="housing.cover_image_url" :alt="housing.name" class="h-32 w-full object-cover lg:h-56 bg-gray-300">
        </div>
        <div class="max-w-8xl mx-auto px-4 pb-20 sm:px-6 lg:px-8">
            <div class="-mt-12 sm:-mt-16 sm:flex sm:items-start">
                <div class="sm:flex sm:items-end sm:space-x-5">
                    <div class="flex">
                        <img class="h-24 w-24 rounded-full ring-4 ring-gray-100 sm:h-32 sm:w-32 bg-gray-300" :src="housing.profile_image_url" :alt="housing.name" />
                    </div>
                    <div class="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div class="flex items-center sm:hidden md:flex mt-6 min-w-0 flex-1">
                            <h1 class="text-2xl md:text-4xl font-bold text-gray-900 truncate">
                                {{ housing.name }}
                            </h1>
                            <BadgeCheckIcon v-if="isClaimed" class="ml-4 h-6 w-6 text-sky-500" />
                        </div>
                    </div>
                </div>
                <div v-if="$page.props.user" class="ml-auto space-x-4">
                    <Link :href="route('housing.profile.edit', [housing.slug])" v-if="housing.manager?.user_id === $page.props.user.id" class="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0">
                        Edit profile
                    </Link>
                </div>
            </div>
            <div class="hidden sm:block md:hidden mt-6 min-w-0 flex-1">
                <h1 class="text-3xl font-bold text-gray-900 truncate">
                    {{ housing.name }}
                </h1>
            </div>
            <div class="lg:flex">
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
                                    <a :href="`mailto:${housing.email_address}`" class="mt-4 inline-flex xl:hidden justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                        <MailIcon class="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                        <span>Send an email</span>
                                    </a>
                                    <div class="hidden mt-4 xl:flex xl:items-center">
                                        <MailOutlineIcon class="flex-shrink-0 w-6 h-6 text-gray-500" />
                                        <span class="ml-2 text-base lg:text-lg font-medium text-gray-700">{{ housing.email_address }}</span>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </aside>
                <div class="mt-8 lg:w-2/3 md:mt-2 md:order-1">
                    <div class="md:px-4 md:py-5">
                        <button v-if="$page.props.user && ! isClaimed" @click="claimDialogOpen = true" class="inline-flex space-x-4 group">
                            <span class="rounded bg-sky-200 px-2.5 py-1 text-xs font-semibold text-sky-700 tracking-wide uppercase"> Claim this housing </span>
                            <span class="inline-flex items-center text-sm font-medium text-sky-700 space-x-1 group-hover:text-sky-900">
                                <span>Do you manage {{ housing.name }}?</span>
                                <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
                            </span>
                        </button>
                        <p class="mt-6 text-xl font-medium text-gray-700">{{ `${housing.street}, ${housing.city}, Idaho ${housing.postal_code}` }}</p>
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
                                <Stars size="h-6 w-6" :score="housing.score" />
                            </div>
                            <span class="text-gray-800 font-bold text-xl">{{ housing.score }}</span>
                        </div>
                        <div class="mt-8 flex md:inline-flex w-full max-w-3xl border border-gray-400 rounded-md">
                            <div class="px-4 md:py-4 md:px-0 flex flex-col w-full md:flex-row items-center divide-y-2 md:divide-x-2 md:divide-y-0 divide-gray-400">
                                <div class="flex flex-col items-center w-full py-4 md:px-8 xl:px-12 md:py-0">
                                    <div v-if="housing.housing_type === 'single'" class="text-lg text-gray-500">Semesterly Rent</div>
                                    <div v-if="housing.housing_type === 'married'" class="text-lg text-gray-500">Monthly Rent</div>
                                    <div class="text-2xl text-gray-700 font-medium">{{ housing.rent_range }}</div>
                                </div>
                                <div class="flex flex-col items-center w-full py-4 md:px-8 xl:px-12 md:py-0">
                                    <div class="text-lg text-gray-500">Bedrooms</div>
                                    <div class="text-2xl text-gray-700 font-medium">{{ housing.bedroom_range }} bd</div>
                                </div>
                                <div class="flex flex-col items-center w-full py-4 md:px-8 xl:px-12 md:py-0">
                                    <div class="text-lg text-gray-500">Bathrooms</div>
                                    <div class="text-2xl text-gray-700 font-medium">{{ housing.bathroom_range }} ba</div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-12 space-y-12">
                            <div v-if="housing.amenities.length">
                                <h2 class="text-3xl">Amenities</h2>
                                <div class="py-4">
                                    <dl class="grid grid-cols-1 gap-y-4 sm:gap-y-2 gap-x-3 sm:grid-cols-2 xl:grid-cols-3">
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
                                <ReviewList
                                    :housing-id="housing.id"
                                    :name="housing.name"
                                    :reviews="housing.reviews"
                                    :reviews-count="housing.reviews_count"
                                    :score="housing.score"
                                    :score-description="scoredescription"
                                    :slug="housing.slug"
                                />
                                <template v-if="housing.reviews_count > 0">
                                    <div class="mt-16 flex items-center w-full">
                                        <Link :href="route('housing.reviews', [housing.slug])" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">See all reviews</Link>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <TransitionRoot as="template" :show="claimDialogOpen">
            <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="open = false">
                <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                        <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </TransitionChild>

                    <!-- This element is to trick the browser into centering the modal contents. -->
                    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <div class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-sky-100">
                                    <BadgeCheckIcon class="h-6 w-6 text-sky-600" aria-hidden="true" />
                                </div>
                                <div class="mt-3 text-center sm:mt-5">
                                    <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900"> Claim {{ housing.name }} </DialogTitle>
                                    <div class="mt-3">
                                        <p class="text-base text-gray-600">By clicking "Claim" below, you verify that you are either the owner or manager of {{ housing.name }} and accept the responsibilty of maintaining this profile.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:col-start-2 sm:text-sm" @click="open = false">Claim</button>
                                <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:col-start-1 sm:text-sm" @click="claimDialogOpen = false" ref="cancelButtonRef">Cancel</button>
                            </div>
                        </div>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>
    </app-layout>
</template>

<script>
    import { defineComponent, ref } from 'vue';
    import { Link } from '@inertiajs/inertia-vue3';
    import AppLayout from '@/Layouts/AppLayout.vue';
    import { BadgeCheckIcon, CheckCircleIcon, CheckIcon, ChevronRightIcon, HomeIcon, LocationMarkerIcon, MailIcon, PhoneIcon, StarIcon, UserIcon, UsersIcon } from '@heroicons/vue/solid';
    import { DeviceMobileIcon, MailIcon as MailOutlineIcon } from '@heroicons/vue/outline';
    import TextEditor from '@/Components/TextEditor';
    import Stars from '@/Components/Stars';
    import JetInputError from '@/Jetstream/InputError';
    import ReviewList from '@/Components/ReviewList';
    import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';

    export default defineComponent({
        components: {
            AppLayout,
            BadgeCheckIcon,
            CheckCircleIcon,
            CheckIcon,
            ChevronRightIcon,
            DeviceMobileIcon,
            Dialog,
            DialogOverlay,
            DialogTitle,
            HomeIcon,
            JetInputError,
            Link,
            LocationMarkerIcon,
            MailIcon,
            MailOutlineIcon,
            PhoneIcon,
            ReviewList,
            StarIcon,
            Stars,
            TextEditor,
            TransitionChild,
            TransitionRoot,
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
        data() {
            return {
                form: this.$inertia.form({
                    'housing_id': this.housing.id,
                }),
                isClaimed: this.housing.manager || this.housing.claim,
                scoredescription: this.calculateDescription(),
            }
        },
        methods: {
            calculateDescription() {
                if (this.housing.score >= 5) { return "Excellent"; }
                if (this.housing.score >= 4) { return "Great"; }
                if (this.housing.score >= 3) { return "Good"; }
                if (this.housing.score >= 2) { return "Okay"; }
                if (this.housing.score >= 1) { return "Poor"; }
            },
            createClaim() {
                this.form.post(route('claims.create'), {
                    onSuccess: () => {
                        this.isClaimed = true;
                        this.claimDialogOpen = false;
                    },
                });
            },
        },
        setup() {
            const claimDialogOpen = ref(false);
            
            return {
                claimDialogOpen,
            }
        },
    })
</script>