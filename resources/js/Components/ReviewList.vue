<script setup>
import { ref } from 'vue';
import { Link, useForm } from '@inertiajs/vue3';
import {
  Dialog, DialogOverlay, DialogTitle, RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption, TransitionChild, TransitionRoot,
} from '@headlessui/vue';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/vue/24/outline';
import { StarIcon } from '@heroicons/vue/24/solid';
import Review from '@/Components/Review.vue';
import Stars from '@/Components/Stars.vue';
import TextEditor from '@/Components/TextEditor.vue';
import JetInputError from '@/Jetstream/InputError.vue';
import PrimaryButton from './PrimaryButton.vue';

const ratings = [
  { name: '5' },
  { name: '4' },
  { name: '3' },
  { name: '2' },
  { name: '1' },
];

const props = defineProps([
  'housingId',
  'name',
  'reviews',
  'reviewsCount',
  'score',
  'scoreDescription',
  'slug',
]);

const tenant = [
  { name: 'Yes' },
  { name: 'No' },
];

const open = ref(false);

const activeRating = ref({});
const activeTenantOption = ref({});

const review = useForm({
  housing_id: props.housingId,
  body: null,
  rating: null,
  livedHere: null,
});

const clearReview = () => {
  open.value = false;
  review.reset(route('reviews.create'), {
    errorBag: 'createReview',
    preserveScroll: true,
    onSuccess: () => clearReview(),
  });
};

const submitReview = () => {
  review.post(route('reviews.create'), {
    errorBag: 'createReview',
    preserveScroll: true,
    onSuccess: () => clearReview(),
  });
};

const updateBody = (event) => {
  review.body = event.target.innerHTML;
};

const updateRating = (rating) => {
  review.rating = Number(rating.name);
};

const updateTenantOption = (option) => {
  review.livedHere = option.name;
};
</script>

<template>
    <h2 class="text-3xl text-slate-900 dark:text-slate-100">Tenant Reviews of {{ name }}</h2>
        <template v-if="reviewsCount > 0">
            <!-- Has Reviews -->
            <div class="mt-8 flex flex-col space-y-6 sm:flex-row sm:space-x-4 sm:space-y-0 md:space-x-8">
                <div class="flex flex-col rounded-md border-2 border-sky-800">
                    <div class="flex flex-1 flex-col items-center justify-center px-10 py-6 text-sky-500">
                        <div class="text-6xl font-medium">{{ score }}</div>
                        <div class="text-3xl">{{ scoreDescription }}</div>
                    </div>
                    <div class="bg-sky-800 p-4">
                        <div class="text-center text-2xl text-white">Out of 5</div>
                    </div>
                </div>
                <div class="flex-1 overflow-hidden rounded-md bg-slate-200">
                    <div class="flex flex-col space-y-4 p-8 xl:p-10">
                        <div class="flex flex-col justify-center space-y-8 sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0 xl:space-x-10">
                            <div class="shrink-0">
                                <div class="flex space-x-1">
                                    <Stars size="h-8 w-8 sm:h-6 sm:w-6 md:h-8 md:w-8" :score="score" />
                                </div>
                                <div class="mt-2 text-xl font-medium md:text-2xl">{{ score }} score</div>
                                <div class="mt-3 text-base">{{ reviewsCount }} Renter {{ reviewsCount === 1 ? 'Review' : 'Reviews' }}</div>
                            </div>
                            <div class="flex-1">
                                <template v-if="$page.props.user">
                                    <p class="text-lg">Share details of your own experience with {{ name }}.</p>
                                    <PrimaryButton @click="open = true">Write my review</PrimaryButton>
                                </template>
                                <template v-else>
                                    <p class="text-base xl:text-lg">Login or create a free account to share details of your experience with {{ name }}.</p>
                                    <div class="hidden md:mt-4 md:inline-flex md:w-full md:flex-col xl:flex-row">
                                        <Link :href="route('register')" class="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-sky-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 md:w-auto">Create an account</Link>
                                        <Link :href="route('login')" class="mt-3 inline-flex w-full items-center justify-center rounded-md border border-slate-300 bg-white px-6 py-3 text-base font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 md:w-auto xl:ml-3 xl:mt-0">Login</Link>
                                    </div>
                                </template>
                            </div>
                        </div>
                        <div class="md:hidden">
                            <template v-if="$page.props.user">
                                <PrimaryButton @click="open = true">Write my review</PrimaryButton>
                            </template>
                            <template v-else>
                                <div class="mt-4 inline-flex w-full flex-col sm:flex-row sm:space-x-2">
                                    <Link :href="route('register')" class="inline-flex items-center justify-center rounded-md border border-transparent bg-sky-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">Create an account</Link>
                                    <Link :href="route('login')" class="mt-3 inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-6 py-3 text-base font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:mt-0">Login</Link>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-16 space-y-20">
                <Review v-for="(review, index) in reviews" :key="index" :review="review" />
            </div>
        </template>
        <template v-else>
            <!-- No Reviews -->
            <div class="mt-8 flex-1 overflow-hidden rounded-xl border border-slate-600 bg-slate-900">
                <div class="flex flex-col items-center justify-center space-x-10 px-4 py-5 sm:p-6 md:flex-row">
                    <div class="flex-1">
                        <p class="text-lg dark:text-slate-200">We currently don't have any reviews for {{ name }}.</p>
                        <p class="mt-3 text-base text-slate-800 dark:text-slate-400">Be the first to share details of your own experience.</p>
                        <PrimaryButton v-if="$page.props.auth.user" @click="open = true" class="mt-4">Write my review</PrimaryButton>
                        <div v-else class="mt-4 inline-flex w-full flex-col sm:flex-row sm:space-x-2">
                            <Link :href="route('register')" class="inline-flex items-center justify-center rounded-md border border-transparent bg-sky-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">Create an account</Link>
                            <Link :href="route('login')" class="mt-3 inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-6 py-3 text-base font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:mt-0">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <TransitionRoot as="template" :show="open">
            <Dialog as="div" class="fixed inset-0 z-10 overflow-y-auto" @close="open = false">
                <div class="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                        <DialogOverlay class="fixed inset-0 bg-slate-700 bg-opacity-75 transition-opacity" />
                    </TransitionChild>

                    <!-- This element is to trick the browser into centering the modal contents. -->
                    <span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <div class="inline-block overflow-hidden rounded-xl bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all dark:bg-slate-800 sm:my-8 sm:w-full sm:max-w-2xl sm:p-6 sm:align-middle">
                            <div class="sm:flex sm:items-start">
                                <div class="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-700 dark:bg-opacity-40 sm:mx-0 sm:h-10 sm:w-10">
                                    <ChatBubbleBottomCenterTextIcon class="h-6 w-6 text-sky-600 dark:text-sky-500" aria-hidden="true" />
                                </div>
                                <div class="mt-3 w-full text-center sm:ml-6 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" class="text-lg font-medium leading-6 text-slate-900 dark:text-slate-200">
                                        Write a review of {{ name }}
                                    </DialogTitle>
                                    <div class="mt-6">
                                        <RadioGroup v-model="activeRating" class="mt-2">
                                            <div class="grid grid-cols-3 gap-4 sm:grid-cols-6">
                                                <RadioGroupOption as="template" v-for="rating in ratings" :key="rating.name" :value="rating" v-slot="{ active, checked }">
                                                    <div
                                                        @click="updateRating(rating)"
                                                        :class="[
                                                            active ? 'ring-2 ring-sky-500' : '',
                                                            checked ? 'border-transparent bg-sky-600 text-white hover:bg-sky-700' : 'border-slate-200 bg-white text-slate-900 hover:bg-slate-50 dark:border-slate-500 dark:bg-slate-700 dark:hover:bg-slate-600',
                                                            'flex cursor-pointer flex-col items-center justify-center rounded-md border p-3 text-sm font-medium uppercase focus:outline-none sm:flex-1'
                                                        ]"
                                                    >
                                                        <RadioGroupLabel as="p" class="inline-flex items-center text-base dark:text-slate-200">
                                                            {{ rating.name }}
                                                            <StarIcon :class="[checked ? 'text-sky-200' : 'text-sky-500', 'ml-1 h-5 w-5']" />
                                                        </RadioGroupLabel>
                                                    </div>
                                                </RadioGroupOption>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                    <jet-input-error :message="review.errors.rating" class="mt-1" />
                                    <div class="mt-4">
                                        <text-editor
                                            :value="review.body"
                                            @input="updateBody($event)"
                                        />
                                    </div>
                                    <div class="mt-4">
                                        <p class="dark:text-slate-300">Have you lived at {{ name }}?</p>
                                        <RadioGroup v-model="activeTenantOption" class="mt-2">
                                            <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
                                                <RadioGroupOption as="template" v-for="tenantOption in tenant" :key="tenantOption.name" :value="tenantOption" v-slot="{ active, checked }">
                                                    <div
                                                        @click="updateTenantOption(tenantOption)"
                                                        :class="[
                                                            active ? 'ring-2 ring-sky-500' : '',
                                                            checked ? 'border-transparent bg-sky-600 text-white hover:bg-sky-700' : 'border-slate-200 bg-white text-slate-900 hover:bg-slate-50 dark:border-slate-500 dark:bg-slate-700 dark:hover:bg-slate-600',
                                                            'flex cursor-pointer flex-col items-center justify-center rounded-md border p-2 text-sm font-medium uppercase focus:outline-none sm:flex-1'
                                                        ]"
                                                    >
                                                        <RadioGroupLabel as="p" class="inline-flex items-center text-base dark:text-slate-200">
                                                            {{ tenantOption.name }}
                                                        </RadioGroupLabel>
                                                    </div>
                                                </RadioGroupOption>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-5 sm:ml-10 sm:flex sm:pl-6 md:mt-8">
                                <PrimaryButton @click="submitReview" type="button">
                                    Submit review
                                </PrimaryButton>
                                <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-base font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-700 dark:bg-opacity-40 dark:text-slate-200 dark:hover:bg-slate-800 sm:ml-3 sm:mt-0 sm:w-auto" @click="open = false" ref="cancelButtonRef">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>
</template>
