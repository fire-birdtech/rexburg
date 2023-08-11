<script setup>
import { ref } from 'vue';
import { Link, useForm } from '@inertiajs/vue3';
import {
  CheckBadgeIcon, CheckCircleIcon, CheckIcon, ChevronRightIcon, MapPinIcon, EnvelopeIcon, PhoneIcon, UserIcon, UsersIcon,
} from '@heroicons/vue/24/solid';
import { DevicePhoneMobileIcon, EnvelopeIcon as MailOutlineIcon } from '@heroicons/vue/24/outline';
import {
  Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot,
} from '@headlessui/vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import Stars from '@/Components/Stars.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';

const props = defineProps({
  housing: Object,
  isAdmin: Boolean,
  canEdit: Boolean,
  canLogin: Boolean,
  canRegister: Boolean,
});

const form = useForm({
  housing_id: props.housing.id,
  street_address: null,
  city: null,
  postal_code: null,
});

const isClaimed = ref(props.housing.manager !== null || props.housing.claim !== null);
const claimDialogOpen = ref(false);
const pageDescription = ref(
  `Check out ${props.housing.name} ${props.housing.housing_type} student housing on Rexburg Guru!`,
);
const contactNotNull = ref(
  props.housing.website_url !== null
    || props.housing.phone_number !== null
    || props.housing.email_address !== null,
);

const scoredescription = () => {
  if (props.housing.score >= 5) { return 'Excellent'; }
  if (props.housing.score >= 4) { return 'Great'; }
  if (props.housing.score >= 3) { return 'Good'; }
  if (props.housing.score >= 2) { return 'Okay'; }
  return 'Poor';
};

const createClaim = () => {
  form.post(route('claims.create'), {
    onSuccess: () => {
      isClaimed.value = true;
      claimDialogOpen.value = false;
    },
  });
};
</script>

<template>
    <AppLayout :title="housing.name" :description="pageDescription" :canLogin="canLogin" :canRegister="canRegister">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="pt-8">
                <img :src="housing.cover_image_url" :alt="housing.name" class="aspect-[16/4] w-full rounded-2xl bg-slate-100 object-cover">
            </div>
            <div class="max-w-8xl mx-auto px-4 pb-20 sm:px-6 lg:px-8">
                <div class="-mt-12 sm:-mt-16 sm:flex sm:items-start">
                    <div class="sm:flex sm:items-end sm:space-x-5">
                        <div class="flex">
                            <img class="h-24 w-24 rounded-full bg-slate-300 ring-4 ring-slate-900 sm:h-32 sm:w-32" :src="housing.profile_image_url" :alt="housing.name" />
                        </div>
                        <div class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                            <div class="mt-6 flex min-w-0 flex-1 items-center sm:hidden md:flex">
                                <h1 class="truncate text-2xl font-bold text-slate-100 md:text-4xl">
                                    {{ housing.name }}
                                </h1>
                                <CheckBadgeIcon v-if="isClaimed" class="ml-4 h-6 w-6 text-sky-500" />
                            </div>
                        </div>
                    </div>
                    <div v-if="canEdit" class="ml-auto space-x-4">
                        <PrimaryButton as="link" :href="route('housing.edit', [housing.slug])" class="mt-3 sm:mt-0">
                            Edit profile
                        </PrimaryButton>
                    </div>
                </div>
                <div class="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
                    <h1 class=":text-slate-100 truncate text-3xl font-bold">
                        {{ housing.name }}
                    </h1>
                </div>
                <button v-if="$page.props.user !== null && isClaimed === false" @click="claimDialogOpen = true" class="group mt-6 inline-flex space-x-4">
                    <span class="rounded bg-sky-200 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700"> Claim this housing </span>
                    <span class="inline-flex items-center space-x-1 text-sm font-medium text-sky-400 group-hover:text-sky-500">
                        <span>Do you manage {{ housing.name }}?</span>
                        <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                </button>
                <p class="mt-6 text-xl font-medium text-slate-300">{{ `${housing.street}, ${housing.city}, Idaho ${housing.postal_code}` }}</p>
                <div class="flex flex-col space-y-3 pt-4 text-slate-300 sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6 sm:space-y-0">
                    <template v-if="housing.housing_type == 'single'">
                        <div v-if="housing.byui_approved" class="flex items-center text-base leading-5">
                            <CheckIcon class="mr-2 h-5 w-5 shrink-0 text-slate-400" />
                            <span>BYU-Idaho Approved</span>
                        </div>
                        <div class="flex items-center text-base leading-5">
                            <UserIcon class="mr-2 h-5 w-5 shrink-0 text-slate-400" />
                            <span>Single Housing</span>
                        </div>
                    </template>
                    <template v-if="housing.housing_type == 'married'">
                        <div class="flex items-center text-base leading-5">
                            <UsersIcon class="mr-2 h-5 w-5 shrink-0 text-slate-400" />
                            <span>Married Housing</span>
                        </div>
                    </template>
                    <div class="flex items-center text-base leading-5">
                        <MapPinIcon class="mr-2 h-5 w-5 shrink-0 text-slate-400" />
                        <span>{{ housing.city }}</span>
                    </div>
                </div>
                <div v-if="housing.reviews_count > 0" class="flex items-center space-x-4 pt-5">
                    <div class="flex space-x-1">
                        <Stars size="h-6 w-6" :score="housing.score" />
                    </div>
                    <span class="text-xl font-bold text-slate-200">{{ housing.score }}</span>
                    <Link href="#review-list" class="hover:underline hover:underline-offset-2">See reviews</Link>
                </div>
                <div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div class="overflow-hidden rounded-xl border border-slate-600 bg-slate-900 px-4 py-5 shadow sm:p-6">
                        <div v-if="housing.housing_type === 'single'" class="truncate text-sm font-medium text-slate-400">Semesterly Rent</div>
                        <div v-if="housing.housing_type === 'married'" class="truncate text-sm font-medium text-slate-400">Monthly Rent</div>
                        <div class="mt-1 text-3xl font-semibold tracking-tight text-slate-200">{{ housing.rent_range }}</div>
                    </div>
                    <div class="overflow-hidden rounded-xl border border-slate-600 bg-slate-900 px-4 py-5 shadow sm:p-6">
                        <div class="truncate text-sm font-medium text-slate-400">Bedrooms</div>
                        <div class="mt-1 text-3xl font-semibold tracking-tight text-slate-200">{{ housing.bedroom_range }} bd</div>
                    </div>
                    <div class="overflow-hidden rounded-xl border border-slate-600 bg-slate-900 px-4 py-5 shadow sm:p-6">
                        <div class="truncate text-sm font-medium text-slate-400">Bathrooms</div>
                        <div class="mt-1 text-3xl font-semibold tracking-tight text-slate-200">{{ housing.bathroom_range }} ba</div>
                    </div>
                </div>
                <div class="lg:flex">
                    <aside v-if="contactNotNull" class="mt-8 md:order-2 md:ml-5 md:w-1/3">
                        <div class="sticky top-12">
                            <div class="rounded-xl border border-slate-600 bg-slate-900 px-4 py-5 shadow sm:p-6">
                                <div class="flex flex-col items-center">
                                    <div class="text-xl font-bold text-slate-100">Contact {{ housing.name }}</div>
                                    <template v-if="housing.website_url !== null">
                                        <div class="mt-6 w-full">
                                            <a :href="`https://${housing.website_url}`" target="_blank" rel="noopener noreferrer" class="block w-full rounded-md bg-[#B3D9E6] px-3.5 py-2.5 text-center text-sm font-semibold text-slate-800 shadow-sm transition duration-150 ease-in-out hover:bg-[#DBEDF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:cursor-not-allowed disabled:bg-[#B3D9E6]/80">
                                                Visit website
                                            </a>
                                        </div>
                                    </template>
                                    <template v-if="housing.phone_number !== null">
                                        <a :href="`tel:${housing.phone_number}`" class="mt-4 inline-flex w-full justify-center rounded-md border border-slate-700 bg-slate-700/40 px-4 py-2 text-sm font-medium text-slate-200 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 md:hidden">
                                            <PhoneIcon class="-ml-1 mr-2 h-5 w-5 text-slate-400" aria-hidden="true" />
                                            <span>{{ housing.phone_number }}</span>
                                        </a>
                                        <div class="mt-4 hidden md:flex md:items-center">
                                            <DevicePhoneMobileIcon class="h-6 w-6 shrink-0 text-slate-400" />
                                            <span class="ml-2 text-lg font-medium text-slate-300">{{ housing.phone_number }}</span>
                                        </div>
                                    </template>
                                    <template v-if="housing.email_address !== null">
                                        <a :href="`mailto:${housing.email_address}`" class="mt-4 inline-flex w-full justify-center rounded-md border border-slate-700 bg-slate-700/40 px-4 py-2 text-sm font-medium text-slate-200 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 xl:hidden">
                                            <EnvelopeIcon class="-ml-1 mr-2 h-5 w-5 text-slate-400" aria-hidden="true" />
                                            <span>Send an email</span>
                                        </a>
                                        <div class="mt-4 hidden xl:flex xl:items-center">
                                            <MailOutlineIcon class="h-6 w-6 shrink-0 text-slate-400" />
                                            <span class="ml-2 text-base font-medium text-slate-300 lg:text-lg">{{ housing.email_address }}</span>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </aside>
                    <div class="mt-8 md:order-1 md:w-2/3">
                        <div class="space-y-10">
                            <div v-if="housing.amenities.length">
                                <h2 class="text-3xl">Amenities</h2>
                                <div class="py-4">
                                    <dl class="grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-2 sm:gap-y-2 xl:grid-cols-3">
                                        <div v-for="(amenity, index) in housing.amenities" :key={index} class="sm:col-span-1">
                                            <dd class="mt-1 flex text-base leading-5 text-slate-100">
                                                <CheckCircleIcon class="mr-1.5 h-5 w-5 shrink-0 text-sky-500" />
                                                {{ amenity.name }}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                            <div v-if="housing.about">
                                <h2 class="text-3xl text-slate-100">About {{ housing.name }}</h2>
                                <div class="prose prose-invert mt-4 max-w-none" v-html="housing.about" />
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
                                    <div class="mt-16 flex w-full items-center">
                                        <Link :href="route('housing.reviews', [housing.slug])" class="inline-flex items-center rounded-md border border-transparent bg-sky-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">See all reviews</Link>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <TransitionRoot as="template" :show="claimDialogOpen">
                <Dialog as="div" class="fixed inset-0 z-10 overflow-y-auto" @close="claimDialogOpen = false">
                    <div class="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
                        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                            <DialogOverlay class="fixed inset-0 bg-slate-500/75 transition-opacity" />
                        </TransitionChild>

                        <!-- This element is to trick the browser into centering the modal contents. -->
                        <span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>
                        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                            <div class="relative inline-block overflow-hidden rounded-lg bg-slate-800 px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
                                <div>
                                    <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-700/40">
                                        <CheckBadgeIcon class="h-6 w-6 text-sky-500" aria-hidden="true" />
                                    </div>
                                    <div class="mt-3 text-center sm:mt-5">
                                        <DialogTitle as="h3" class="text-lg font-medium leading-6 text-slate-200"> Claim {{ housing.name }} </DialogTitle>
                                    </div>
                                    <div class="mt-3">
                                        <form>
                                            <p class="text-sm text-slate-300">Please enter the address of {{ housing.name }}.</p>
                                            <div class="mt-3 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-6">
                                                <div class="sm:col-span-6">
                                                    <label for="street-address" class="block text-sm font-medium text-slate-400"> Street address </label>
                                                    <div class="mt-1">
                                                        <input type="text" v-model="form.street_address" name="street-address" id="street-address" autocomplete="street-address" class="block w-full rounded-md border-slate-500 bg-slate-700/40 text-slate-100 shadow-sm focus:border-sky-700 focus:ring-sky-700 sm:text-sm" />
                                                    </div>
                                                </div>

                                                <div class="sm:col-span-3">
                                                    <label for="city" class="block text-sm font-medium text-slate-400"> City </label>
                                                    <div class="mt-1">
                                                        <input type="text" v-model="form.city" name="city" id="city" autocomplete="address-level2" class="block w-full rounded-md border-slate-500 bg-slate-700/40 text-slate-100 shadow-sm focus:border-sky-700 focus:ring-sky-700 sm:text-sm" />
                                                    </div>
                                                </div>

                                                <div class="sm:col-span-3">
                                                    <label for="region" class="block text-sm font-medium text-slate-400"> ZIP / Postal code </label>
                                                    <div class="mt-1">
                                                        <input type="text" v-model="form.postal_code" name="postal-code" id="postal-code" autocomplete="postal-code" class="block w-full rounded-md border-slate-500 bg-slate-700/40 text-slate-100 shadow-sm focus:border-sky-700 focus:ring-sky-700 sm:text-sm" />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="mt-6">
                                        <p class="text-sm text-slate-300">By clicking "Claim" below, you verify that you are either the owner or manager of {{ housing.name }} and accept the responsibilty of maintaining this profile.</p>
                                    </div>
                                </div>
                                <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                    <PrimaryButton class="sm:col-start-2" :disabled="!form.street_address || !form.city || !form.postal_code" @click="createClaim">Claim</PrimaryButton>
                                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-slate-700 bg-slate-700/40 px-4 py-2 text-base font-medium text-slate-200 shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2  sm:col-start-1 sm:mt-0 sm:text-sm" @click="claimDialogOpen = false" ref="cancelButtonRef">Cancel</button>
                                </div>
                            </div>
                        </TransitionChild>
                    </div>
                </Dialog>
            </TransitionRoot>
        </div>
    </AppLayout>
</template>
