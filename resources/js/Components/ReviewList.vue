<template>
    <h2 class="text-3xl">Tenant Reviews of {{ name }}</h2>
        <template v-if="reviewsCount > 0">
            <div class="mt-8 flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-4 md:space-x-8">
                <div class="flex flex-col rounded-md border-2 border-sky-800">
                    <div class="flex-1 flex flex-col items-center justify-center px-10 py-6 text-sky-500">
                        <div class="text-6xl font-medium">{{ score }}</div>
                        <div class="text-3xl">{{ scoreDescription }}</div>
                    </div>
                    <div class="bg-sky-800 p-4">
                        <div class="text-white text-2xl text-center">Out of 5</div>
                    </div>
                </div>
                <div class="bg-gray-200 overflow-hidden rounded-md flex-1">
                    <div class="p-8 xl:p-10 flex flex-col space-y-4">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-center space-y-8 sm:space-y-0 sm:space-x-6 xl:space-x-10">
                            <div class="flex-shrink-0">
                                <div class="flex space-x-1">
                                    <Stars size="h-8 w-8 sm:h-6 sm:w-6 md:h-8 md:w-8" :score="score" />
                                </div>
                                <div class="mt-2 text-xl md:text-2xl font-medium">{{ score }} score</div>
                                <div class="mt-3 text-md">{{ reviewsCount }} Renter {{ reviewsCount === 1 ? 'Review' : 'Reviews' }}</div>
                            </div>
                            <div class="flex-1">
                                <template v-if="$page.props.user">
                                    <p class="text-lg">Share details of your own experience with {{ name }}.</p>
                                    <button @click="open = true" class="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Write my review</button>
                                </template>
                                <template v-else>
                                    <p class="text-base xl:text-lg">Login or create a free account to share details of your experience with {{ name }}.</p>
                                    <div class="hidden md:inline-flex md:flex-col md:mt-4 md:w-full xl:flex-row">
                                        <Link :href="route('register')" class="inline-flex items-center justify-center w-full md:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Create an account</Link>
                                        <Link :href="route('login')" class="mt-3 xl:mt-0 xl:ml-3 inline-flex items-center justify-center w-full md:w-auto px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Login</Link>
                                    </div>
                                </template>
                            </div>
                        </div>
                        <div class="md:hidden">
                            <template v-if="$page.props.user">
                                <button @click="open = true" class="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Write my review</button>
                            </template>
                            <template v-else>
                                <div class="inline-flex flex-col sm:flex-row mt-4 w-full sm:space-x-2">
                                    <Link :href="route('register')" class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Create an account</Link>
                                    <Link :href="route('login')" class="mt-3 sm:mt-0 inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Login</Link>
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
            <div class="mt-8 bg-gray-200 overflow-hidden rounded-md flex-1">
                <div class="p-10 flex flex-col md:flex-row items-center justify-center space-x-10">
                    <div class="flex-1">
                        <p class="text-lg">We currently don't have any reviews for {{ name }}.</p>
                        <p class="mt-4 text-md text-gray-800">Be the first to share details of your own experience.</p>
                        <button v-if="$page.props.user" @click="open = true" class="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Write my review</button>
                        <div v-else class="inline-flex flex-col sm:flex-row mt-4 w-full sm:space-x-2">
                            <Link :href="route('register')" class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Create an account</Link>
                            <Link :href="route('login')" class="mt-3 sm:mt-0 inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Login</Link>
                        </div>
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
                                        Write a review of {{ name }}
                                    </DialogTitle>
                                    <div class="mt-6">
                                        <RadioGroup v-model="activeRating" class="mt-2">
                                            <div class="grid grid-cols-3 gap-4 sm:grid-cols-6">
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
                                    <jet-input-error :message="review.errors.rating" class="mt-1" />
                                    <div class="mt-4">
                                        <text-editor
                                            :value="review.body"
                                            @input="updateBody($event)"
                                        />
                                    </div>
                                    <div class="mt-4">
                                        <p>Have you lived at {{ name }}?</p>
                                        <RadioGroup v-model="activeTenantOption" class="mt-2">
                                            <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
                                                <RadioGroupOption as="template" v-for="tenantOption in tenant" :key="tenantOption.name" :value="tenantOption" v-slot="{ active, checked }">
                                                    <div @click="updateTenantOption(tenantOption)" :class="[active ? 'ring-2 ring-offset-2 ring-sky-500' : '', checked ? 'bg-sky-600 border-transparent text-white hover:bg-sky-700' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50', 'cursor-pointer focus:outline-none border rounded-md py-2 px-2 flex flex-col items-center justify-center text-sm font-medium uppercase sm:flex-1']">
                                                        <RadioGroupLabel as="p" class="inline-flex items-center text-base">
                                                            {{ tenantOption.name }}
                                                        </RadioGroupLabel>
                                                    </div>
                                                </RadioGroupOption>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-5 sm:ml-10 sm:pl-6 sm:flex md:mt-8">
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
</template>

<script>
    import { ref } from 'vue';
    import { Link } from '@inertiajs/inertia-vue3';
    import Stars from '@/Components/Stars';
    import Review from '@/Components/Review';
    import { Dialog, DialogOverlay, DialogTitle, RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption, TransitionChild, TransitionRoot } from '@headlessui/vue';
    import { AnnotationIcon } from '@heroicons/vue/outline';
    import { StarIcon } from '@heroicons/vue/solid';
    import TextEditor from '@/Components/TextEditor';
    import JetInputError from '@/Jetstream/InputError';

    const ratings = [
        { name: "5" },
        { name: "4" },
        { name: "3" },
        { name: "2" },
        { name: "1" },
    ];

    const tenant = [
        { name: "Yes" },
        { name: "No" },
    ];

    export default {
        props: [
            'housingId',
            'name',
            'reviews',
            'reviewsCount',
            'score',
            'scoreDescription',
            'slug',
        ],
        components: {
            AnnotationIcon,
            Dialog,
            DialogOverlay,
            DialogTitle,
            JetInputError,
            Link,
            RadioGroup,
            RadioGroupDescription,
            RadioGroupLabel,
            RadioGroupOption,
            Review,
            StarIcon,
            Stars,
            TextEditor,
            TransitionChild,
            TransitionRoot,
        },
        data () {
            return {
                open: false,
                review: this.$inertia.form({
                    'housing_id': this.housingId,
                    body: null,
                    rating: null,
                    livedHere: null,
                }),
            }
        },
        methods: {
            clearReview() {
                this.open = false;
                this.review.body = null;
                this.review.rating = null;
            },
            submitReview() {
                this.review.post(route('reviews.create'), {
                    errorBag: 'createReview',
                    preserveScroll: true,
                    onSuccess: () => this.clearReview(),
                });
            },
            updateBody(event) {
                this.review.body = event.target.innerHTML;
            },
            updateRating(rating) {
                this.review.rating = Number(rating.name);
            },
            updateTenantOption(option) {
                this.review.livedHere = option.name;
            },
        },
        setup() {
            const activeRating = ref({});
            const activeTenantOption = ref({});

            return {
                activeRating,
                activeTenantOption,
                ratings,
                tenant,
            }
        },
    }
</script>