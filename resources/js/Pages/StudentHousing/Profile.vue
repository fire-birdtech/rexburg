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
                <div v-if="$page.props.user" class="ml-auto space-x-4">
                    <button @click="createClaim" v-if="$page.props.user && ! isClaimed" class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0">Claim</button>
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
                                <Stars size="h-6 w-6" :score="housing.score" />
                            </div>
                            <span class="text-gray-800 font-bold text-xl">{{ housing.score }}</span>
                        </div>
                        <div class="mt-8 flex md:inline-flex w-auto border border-gray-400 rounded-md">
                            <div class="px-4 md:py-4 md:px-0 flex flex-col w-full md:flex-row items-center divide-y-2 md:divide-x-2 md:divide-y-0 divide-gray-400">
                                <div class="flex flex-col items-center w-full py-4 md:px-8 xl:px-12 md:py-0">
                                    <div class="text-lg text-gray-500">Semesterly Rent</div>
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
                                <h2 class="text-3xl">Tenant Reviews of {{ housing.name }}</h2>
                                <template v-if="housing.reviews_count > 0">
                                    <div class="mt-8 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12 ">
                                        <div class="flex flex-col rounded-md border-2 border-sky-800">
                                            <div class="flex-1 flex flex-col items-center justify-center px-10 py-6 text-sky-500">
                                                <div class="text-6xl font-medium">{{ housing.score }}</div>
                                                <div class="text-3xl">{{ scoredescription }}</div>
                                            </div>
                                            <div class="bg-sky-800 p-4">
                                                <div class="text-white text-2xl text-center">Out of 5</div>
                                            </div>
                                        </div>
                                        <div class="bg-gray-200 overflow-hidden rounded-md flex-1">
                                            <div class="p-10 flex flex-col md:flex-row items-center justify-center space-x-10">
                                                <div class="flex-shrink-0">
                                                    <div class="flex space-x-1">
                                                        <Stars size="h-8 w-8" :score="housing.score" />
                                                    </div>
                                                    <div class="mt-2 text-2xl font-medium">{{ housing.score }} score</div>
                                                    <div class="mt-3 text-md">{{ housing.reviews_count }} Renter {{ housing.reviews_count === 1 ? 'Review' : 'Reviews' }}</div>
                                                </div>
                                                <div class="flex-1">
                                                    <template v-if="$page.props.user">
                                                        <p class="text-lg">Share details of your own experience with {{ housing.name }}.</p>
                                                        <button @click="open = true" class="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Write my review</button>
                                                    </template>
                                                    <template v-else>
                                                        <p class="text-lg">Login or create a free account to share details of your experience with {{ housing.name }}.</p>
                                                        <div class="inline-flex mt-4">
                                                            <Link :href="route('register')" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Create an account</Link>
                                                            <Link :href="route('login')" class="ml-3 inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Login</Link>
                                                        </div>
                                                    </template>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-16 space-y-12">
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
                                                    <div class="text-sm leading-6 font-medium text-sky-600">Reviewed on {{ convertDate(review.created_at) }}</div>
                                                </div>
                                            </div>
                                            <div class="relative text-base leading-5 text-gray-900 md:flex-grow mt-4">
                                                <svg class="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-sky-400 opacity-25" fill="currentColor" viewBox="0 0 32 32">
                                                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                                </svg>
                                                <p class="relative">{{ review.body }}</p>
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
                                                <button @click="open = true" class="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Write my review</button>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <TransitionRoot as="template" :show="open">
                                    <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="open = false">
                                        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                                                <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                            </TransitionChild>

                                            <!-- This element is to trick the browser into centering the modal contents. -->
                                            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                                            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                                                <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
                                                    <div class="sm:flex sm:items-start">
                                                        <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 sm:mx-0 sm:h-10 sm:w-10">
                                                            <AnnotationIcon class="h-6 w-6 text-sky-600" aria-hidden="true" />
                                                        </div>
                                                        <div class="mt-3 w-full text-center sm:mt-0 sm:ml-6 sm:text-left">
                                                            <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                                                                Write a review of {{ housing.name }}
                                                            </DialogTitle>
                                                            <div class="mt-6">
                                                                <RadioGroup v-model="activeRating" class="mt-2">
                                                                    <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
                                                                        <RadioGroupOption as="template" v-for="rating in ratings" :key="rating.name" :value="rating" v-slot="{ active, checked }">
                                                                            <div @click="updateRating(rating)" :class="[active ? 'ring-2 ring-offset-2 ring-sky-500' : '', checked ? 'bg-sky-600 border-transparent text-white hover:bg-sky-700' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50', 'cursor-pointer focus:outline-none border rounded-md py-3 px-3 flex flex-col items-center justify-center text-sm font-medium uppercase sm:flex-1']">
                                                                                <RadioGroupLabel as="p" class="inline-flex items-center text-base">
                                                                                    {{ rating.name }}
                                                                                    <StarIcon :class="[checked ? 'text-sky-200' : 'text-sky-500', 'ml-1 h-5 w-5']" />
                                                                                </RadioGroupLabel>
                                                                            </div>
                                                                        </RadioGroupOption>
                                                                    </div>
                                                                </RadioGroup>
                                                            </div>
                                                            <div class="mt-4">
                                                                <text-editor
                                                                    :value="review.body"
                                                                    @input="updateBody($event)"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="mt-5 sm:ml-10 sm:pl-6 sm:flex">
                                                        <button @click="submitReview" type="button" class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:w-auto">
                                                            Submit review
                                                        </button>
                                                        <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:ml-3 sm:w-auto" @click="open = false" ref="cancelButtonRef">
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </TransitionChild>
                                        </div>
                                    </Dialog>
                                </TransitionRoot>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </app-layout>
</template>

<script>
    import { defineComponent, ref } from 'vue';
    import dayjs from 'dayjs';
    import { Link } from '@inertiajs/inertia-vue3';
    import AppLayout from '@/Layouts/AppLayout.vue';
    import { Dialog, DialogOverlay, DialogTitle, RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption, TransitionChild, TransitionRoot } from '@headlessui/vue';
    import { BadgeCheckIcon, CheckCircleIcon, CheckIcon, HomeIcon, LocationMarkerIcon, MailIcon, PhoneIcon, StarIcon, UserIcon, UsersIcon } from '@heroicons/vue/solid';
    import { AnnotationIcon, DeviceMobileIcon, MailIcon as MailOutlineIcon } from '@heroicons/vue/outline';
    import TextEditor from '@/Components/TextEditor';
    import Stars from '@/Components/Stars';

    const ratings = [
        { name: "5" },
        { name: "4" },
        { name: "3" },
        { name: "2" },
        { name: "1" },
    ];

    export default defineComponent({
        components: {
            AnnotationIcon,
            AppLayout,
            BadgeCheckIcon,
            CheckCircleIcon,
            CheckIcon,
            Dialog,
            DialogOverlay,
            DialogTitle,
            DeviceMobileIcon,
            HomeIcon,
            Link,
            LocationMarkerIcon,
            MailIcon,
            MailOutlineIcon,
            PhoneIcon,
            RadioGroup,
            RadioGroupDescription,
            RadioGroupLabel,
            RadioGroupOption,
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
                review: this.$inertia.form({
                    'housing_id': this.housing.id,
                    body: null,
                    rating: null,
                }),
                isClaimed: this.housing.manager || this.housing.claim,
                scoredescription: this.calculateDescription(),
            }
        },
        methods: {
            calculateDescription() {
                if (this.housing.score >= 5) {
                    return "Execllent";
                } else if (this.housing.score >= 4) {
                    return "Great";
                } else if (this.housing.score >= 3) {
                    return "Good";
                } else if (this.housing.score >=2) {
                    return "Okay";
                } else if (this.housing.score >=1) {
                    return "Poor";
                }
            },
            clearReview() {
                this.open = false;
                this.review.body = null;
                this.review.rating = null;
            },
            createClaim() {
                this.form.post(route('claims.create'), {
                    onSuccess: () => (this.isClaimed = true),
                });
            },
            convertDate(date) {
                return dayjs(date).format('dddd, D MMMM YYYY');
            },
            updateBody(event) {
                this.review.body = event.target.innerHTML;
            },
            updateRating(rating) {
                this.review.rating = Number(rating.name);
            },
            submitReview() {
                this.review.post(route('reviews.create'), {
                    preserveScroll: true,
                    onSuccess: () => this.clearReview(),
                });
            }
        },
        setup() {
            const open = ref(false);
            const activeRating = ref({});
            return {
                activeRating,
                open,
                ratings,
            }
        },
    })
</script>