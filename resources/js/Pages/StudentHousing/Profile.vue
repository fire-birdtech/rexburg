<script setup>
import { ref } from 'vue';
import { Link, useForm } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import { CheckBadgeIcon, CheckCircleIcon, CheckIcon, ChevronRightIcon, MapPinIcon, EnvelopeIcon, PhoneIcon, UserIcon, UsersIcon } from '@heroicons/vue/24/solid';
import { DevicePhoneMobileIcon, EnvelopeIcon as MailOutlineIcon } from '@heroicons/vue/24/outline';
import TextEditor from '@/Components/TextEditor.vue';
import Stars from '@/Components/Stars.vue';
import JetInputError from '@/Jetstream/InputError.vue';
import ReviewList from '@/Components/ReviewList.vue';
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';

const props = defineProps({
    housing: Object,
    isAdmin: Boolean,
    canLogin: Boolean,
    canRegister: Boolean,
});

const form = useForm({
    'housing_id': props.housing.id,
    'street_address': null,
    'city': null,
    'postal_code': null,
});

const isClaimed = ref(props.housing.manager !== null || props.housing.claim !== null);
const claimDialogOpen = ref(false);
const pageDescription = ref(
    `Check out ${props.housing.name} ${props.housing.housing_type} student housing on Rexburg Guru!`
);
const contactNotNull = ref(
    props.housing.website_url !== null ||
    props.housing.phone_number !== null ||
    props.housing.email_address !== null
);

const scoredescription = () => {
    if (props.housing.score >= 5) { return "Excellent"; }
    if (props.housing.score >= 4) { return "Great"; }
    if (props.housing.score >= 3) { return "Good"; }
    if (props.housing.score >= 2) { return "Okay"; }
    if (props.housing.score >= 1) { return "Poor"; }
}

const createClaim = () => {
    form.post(route('claims.create'), {
        onSuccess: () => {
            isClaimed.value = true;
            claimDialogOpen.value = false;
        }
    });
}
</script>

<template>
    <AppLayout :title="housing.name" :description="pageDescription" :canLogin="canLogin" :canRegister="canRegister">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="pt-8">
                <img :src="housing.cover_image_url" :alt="housing.name" class="aspect-[16/4] w-full rounded-2xl bg-slate-100 object-cover">
            </div>
            <div class="max-w-8xl mx-auto px-4 pb-20 sm:px-6 lg:px-8">
                <div class="-mt-12 sm:-mt-16 sm:flex sm:items-start">
                    <div class="sm:flex sm:items-end sm:space-x-5">
                        <div class="flex">
                            <img class="h-24 w-24 rounded-full ring-4 ring-slate-900 sm:h-32 sm:w-32 bg-slate-300" :src="housing.profile_image_url" :alt="housing.name" />
                        </div>
                        <div class="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                            <div class="flex items-center sm:hidden md:flex mt-6 min-w-0 flex-1">
                                <h1 class="text-2xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 truncate">
                                    {{ housing.name }}
                                </h1>
                                <CheckBadgeIcon v-if="isClaimed" class="ml-4 h-6 w-6 text-sky-500" />
                            </div>
                        </div>
                    </div>
                    <div v-if="housing.manager?.user_id === $page.props.auth?.user.id" class="ml-auto space-x-4">
                        <Link :href="route('housing.profile.edit', [housing.slug])" class="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0">
                            Edit profile
                        </Link>
                    </div>
                </div>
                <div class="hidden sm:block md:hidden mt-6 min-w-0 flex-1">
                    <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-100 truncate">
                        {{ housing.name }}
                    </h1>
                </div>
                <button v-if="$page.props.user !== null && isClaimed === false" @click="claimDialogOpen = true" class="mt-6 inline-flex space-x-4 group">
                    <span class="rounded bg-sky-200 px-2.5 py-1 text-xs font-semibold text-sky-700 tracking-wide uppercase"> Claim this housing </span>
                    <span class="inline-flex items-center text-sm font-medium text-sky-700 dark:text-sky-400 space-x-1 group-hover:text-sky-900 dark:group-hover:text-sky-500">
                        <span>Do you manage {{ housing.name }}?</span>
                        <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                </button>
                <p class="mt-6 text-xl font-medium text-slate-700 dark:text-slate-300">{{ `${housing.street}, ${housing.city}, Idaho ${housing.postal_code}` }}</p>
                <div class="flex flex-col space-y-3 pt-4 text-slate-600 dark:text-slate-300 sm:space-x-6 sm:space-y-0 sm:mt-0 sm:flex-row sm:flex-wrap">
                    <template v-if="housing.housing_type == 'single'">
                        <div v-if="housing.byui_approved" class="flex items-center text-md leading-5">
                            <CheckIcon class="mr-2 flex-shrink-0 h-5 w-5 text-slate-500 dark:text-slate-400" />
                            <span>BYU-Idaho Approved</span>
                        </div>
                        <div class="flex items-center text-md leading-5">
                            <UserIcon class="mr-2 flex-shrink-0 h-5 w-5 text-slate-500 dark:text-slate-400" />
                            <span>Single Housing</span>
                        </div>
                    </template>
                    <template v-if="housing.housing_type == 'married'">
                        <div class="flex items-center text-md leading-5">
                            <UsersIcon class="mr-2 flex-shrink-0 h-5 w-5 text-slate-500 dark:text-slate-400" />
                            <span>Married Housing</span>
                        </div>
                    </template>
                    <div class="flex items-center text-md leading-5">
                        <MapPinIcon class="mr-2 flex-shrink-0 h-5 w-5 text-slate-500 dark:text-slate-400" />
                        <span>{{ housing.city }}</span>
                    </div>
                </div>
                <div v-if="housing.reviews_count > 0" class="pt-5 flex items-center space-x-4">
                    <div class="flex space-x-1">
                        <Stars size="h-6 w-6" :score="housing.score" />
                    </div>
                    <span class="text-slate-800 font-bold text-xl dark:text-slate-200">{{ housing.score }}</span>
                    <Link href="#review-list" class="hover:underline hover:underline-offset-2">See reviews</Link>
                </div>
                <div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div class="overflow-hidden rounded-xl bg-slate-900 border border-slate-600 px-4 py-5 shadow sm:p-6">
                        <div v-if="housing.housing_type === 'single'" class="truncate text-sm font-medium text-slate-500 dark:text-slate-400">Semesterly Rent</div>
                        <div v-if="housing.housing_type === 'married'" class="truncate text-sm font-medium text-slate-500 dark:text-slate-400">Monthly Rent</div>
                        <div class="mt-1 text-3xl font-semibold tracking-tight text-slate-800 dark:text-slate-200">{{ housing.rent_range }}</div>
                    </div>
                    <div class="overflow-hidden rounded-xl bg-slate-900 border border-slate-600 px-4 py-5 shadow sm:p-6">
                        <div class="truncate text-sm font-medium text-slate-500 dark:text-slate-400">Bedrooms</div>
                        <div class="mt-1 text-3xl font-semibold tracking-tight text-slate-800 dark:text-slate-200">{{ housing.bedroom_range }} bd</div>
                    </div>
                    <div class="overflow-hidden rounded-xl bg-slate-900 border border-slate-600 px-4 py-5 shadow sm:p-6">
                        <div class="truncate text-sm font-medium text-slate-500 dark:text-slate-400">Bathrooms</div>
                        <div class="mt-1 text-3xl font-semibold tracking-tight text-slate-800 dark:text-slate-200">{{ housing.bathroom_range }} ba</div>
                    </div>
                </div>
                <div class="lg:flex">
                    <aside v-if="contactNotNull" class="mt-8 md:w-1/3 md:order-2 md:ml-5">
                        <div class="sticky top-12">
                            <div class="rounded-xl bg-slate-900 border border-slate-600 px-4 py-5 shadow sm:p-6">
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
                                        <a :href="`tel:${housing.phone_number}`" class="mt-4 inline-flex md:hidden justify-center w-full px-4 py-2 border border-slate-300 dark:border-slate-700 shadow-sm text-sm font-medium rounded-md text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 dark:bg-opacity-40 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
                                            <PhoneIcon class="-ml-1 mr-2 h-5 w-5 text-slate-400" aria-hidden="true" />
                                            <span>{{ housing.phone_number }}</span>
                                        </a>
                                        <div class="hidden mt-4 md:flex md:items-center">
                                            <DevicePhoneMobileIcon class="flex-shrink-0 w-6 h-6 text-slate-500 dark:text-slate-400" />
                                            <span class="ml-2 text-lg font-medium text-slate-700 dark:text-slate-300">{{ housing.phone_number }}</span>
                                        </div>
                                    </template>
                                    <template v-if="housing.email_address !== null">
                                        <a :href="`mailto:${housing.email_address}`" class="mt-4 inline-flex xl:hidden justify-center w-full px-4 py-2 border border-slate-300 dark:border-slate-700 shadow-sm text-sm font-medium rounded-md text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 dark:bg-opacity-40 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
                                            <EnvelopeIcon class="-ml-1 mr-2 h-5 w-5 text-slate-400" aria-hidden="true" />
                                            <span>Send an email</span>
                                        </a>
                                        <div class="hidden mt-4 xl:flex xl:items-center">
                                            <MailOutlineIcon class="flex-shrink-0 w-6 h-6 text-slate-500 dark:text-slate-400" />
                                            <span class="ml-2 text-base lg:text-lg font-medium text-slate-700 dark:text-slate-300">{{ housing.email_address }}</span>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </aside>
                    <div class="mt-8 md:w-2/3 md:order-1">
                        <div class="space-y-10">
                            <div v-if="housing.amenities.length">
                                <h2 class="text-3xl">Amenities</h2>
                                <div class="py-4">
                                    <dl class="grid grid-cols-1 gap-y-4 sm:gap-y-2 gap-x-3 sm:grid-cols-2 xl:grid-cols-3">
                                        <div v-for="(amenity, index) in housing.amenities" :key={index} class="sm:col-span-1">
                                            <dd class="flex mt-1 text-base leading-5 text-slate-900 dark:text-slate-100">
                                                <CheckCircleIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-sky-500" />
                                                {{ amenity.name }}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                            <div v-if="housing.about">
                                <h2 class="text-3xl text-slate-900 dark:text-slate-100">About {{ housing.name }}</h2>
                                <div class="mt-4 prose max-w-none prose-slate dark:prose-invert" v-html="housing.about" />
                            </div>
                            <div id="review-list" class="scroll-mt-4">
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
            
            <TransitionRoot as="template" :show="claimDialogOpen">
                <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="claimDialogOpen = false">
                    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                            <DialogOverlay class="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity" />
                        </TransitionChild>

                        <!-- This element is to trick the browser into centering the modal contents. -->
                        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                            <div class="relative inline-block align-bottom bg-white dark:bg-slate-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div>
                                    <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 dark:bg-sky-700 dark:bg-opacity-40">
                                        <CheckBadgeIcon class="h-6 w-6 text-sky-600 dark:text-sky-500" aria-hidden="true" />
                                    </div>
                                    <div class="mt-3 text-center sm:mt-5">
                                        <DialogTitle as="h3" class="text-lg leading-6 font-medium text-slate-900 dark:text-slate-200"> Claim {{ housing.name }} </DialogTitle>
                                    </div>
                                    <div class="mt-3">
                                        <form>
                                            <p class="text-sm text-slate-600 dark:text-slate-300">Please enter the address of {{ housing.name }}.</p>
                                            <div class="mt-3 grid grid-cols-1 gap-y-3 gap-x-4 sm:grid-cols-6">
                                                <div class="sm:col-span-6">
                                                    <label for="street-address" class="block text-sm font-medium text-slate-700 dark:text-slate-400"> Street address </label>
                                                    <div class="mt-1">
                                                        <input type="text" v-model="form.street_address" name="street-address" id="street-address" autocomplete="street-address" class="shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full sm:text-sm border-slate-300 rounded-md dark:text-slate-100 dark:bg-slate-700 dark:bg-opacity-40 dark:border-slate-500 dark:focus:ring-sky-700 dark:focus:border-sky-700" />
                                                    </div>
                                                </div>

                                                <div class="sm:col-span-3">
                                                    <label for="city" class="block text-sm font-medium text-slate-700 dark:text-slate-400"> City </label>
                                                    <div class="mt-1">
                                                        <input type="text" v-model="form.city" name="city" id="city" autocomplete="address-level2" class="shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full sm:text-sm border-slate-300 rounded-md dark:text-slate-100 dark:bg-slate-700 dark:bg-opacity-40 dark:border-slate-500 dark:focus:ring-sky-700 dark:focus:border-sky-700" />
                                                    </div>
                                                </div>

                                                <div class="sm:col-span-3">
                                                    <label for="region" class="block text-sm font-medium text-slate-700 dark:text-slate-400"> ZIP / Postal code </label>
                                                    <div class="mt-1">
                                                        <input type="text" v-model="form.postal_code" name="postal-code" id="postal-code" autocomplete="postal-code" class="shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full sm:text-sm border-slate-300 rounded-md dark:text-slate-100 dark:bg-slate-700 dark:bg-opacity-40 dark:border-slate-500 dark:focus:ring-sky-700 dark:focus:border-sky-700" />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="mt-6">
                                        <p class="text-sm text-slate-600 dark:text-slate-300">By clicking "Claim" below, you verify that you are either the owner or manager of {{ housing.name }} and accept the responsibilty of maintaining this profile.</p>
                                    </div>
                                </div>
                                <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                    <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:col-start-2 sm:text-sm disabled:cursor-not-allowed disabled:bg-opacity-80" :disabled="!form.street_address || !form.city || !form.postal_code" @click="createClaim">Claim</button>
                                    <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-slate-300 dark:border-slate-700 shadow-sm px-4 py-2 bg-white dark:bg-slate-700 dark:bg-opacity-40 text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:col-start-1 sm:text-sm" @click="claimDialogOpen = false" ref="cancelButtonRef">Cancel</button>
                                </div>
                            </div>
                        </TransitionChild>
                    </div>
                </Dialog>
            </TransitionRoot>
        </div>
    </AppLayout>
</template>