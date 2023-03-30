<template>
    <app-layout :canLogin="canLogin" :canRegister="canRegister">
        <div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
                    <div class="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                        <div class="ml-4 mt-2">
                            <h3 class="text-2xl leading-6 font-medium text-gray-900">Edit Housing</h3>
                        </div>
                        <div class="ml-4 mt-2 flex-shrink-0 space-x-2">
                            <Link :href="route('housing.profile', [housing.slug])" class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Back to profile</Link>
                            <button @click.prevent="updateHousingInformation" class="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Save changes</button>
                        </div>
                    </div>
                </div>
                <form>
                    <div class="divide-y divide-gray-200">
                        <div class="p-4 sm:p-6 lg:px-8">
                            <div class="md:grid md:grid-cols-3 md:gap-6">
                                <div class="md:col-span-1">
                                    <div class="px-4 sm:px-0">
                                        <h3 class="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                                        <p class="mt-1 text-sm text-gray-600">
                                            This information will be displayed publicly so be careful what you share.
                                        </p>
                                    </div>
                                </div>
                                <div class="mt-5 md:mt-0 md:col-span-2">
                                    <div>
                                        <div class="px-4 py-1 space-y-6 sm:px-6">
                                            <div>
                                                <label for="about" class="block text-sm font-medium text-gray-700">
                                                    About
                                                </label>
                                                <div class="mt-1 rounded-md">
                                                    <text-editor
                                                        :value="currentHousing.about"
                                                        @input="updateAbout($event)"
                                                        :warning="tooManyCharacters"
                                                    />
                                                </div>
                                                <div class="mt-2 text-sm text-gray-500 flex items-center justify-between">
                                                    <p>
                                                        Brief description for your property.
                                                    </p>
                                                    <div>
                                                        <p :class="[tooManyCharacters && 'text-red-600 font-medium']">
                                                            1,000 character limit
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Profile Image -->
                                            <div>
                                                <!-- Profile Image File Input -->
                                                <input type="file" class="hidden"
                                                            ref="profile"
                                                            @change="updateImagePreview('profile')">

                                                <label class="block text-sm font-medium text-gray-700">
                                                    Profile image
                                                </label>

                                                <!-- Current Profile Image -->
                                                <div class="mt-2" v-show="! profilePreview">
                                                    <img :src="housing.profile_image_url" :alt="housing.name" class="rounded-full h-28 w-28 object-cover">
                                                </div>

                                                <!-- New Profile Image Preview -->
                                                <div class="mt-2" v-show="profilePreview">
                                                    <span class="block rounded-full w-28 h-28 object-cover"
                                                        :style="'background-size: cover; background-repeat: no-repeat; background-position: center center; background-image: url(\'' + profilePreview + '\');'">
                                                    </span>
                                                </div>

                                                <button @click.prevent="selectNewProfileImage" class="mt-3 mr-2 inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition">
                                                    Select A New Profile Image
                                                </button>

                                                <button @click.prevent="deleteProfileImage" v-if="housing.profile_image_path" class="mt-2 inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition">
                                                    Remove Profile Image
                                                </button>

                                                <jet-input-error :message="currentHousing.errors.profile" class="mt-2" />
                                            </div>

                                            <div>
                                                <!-- Cover Image File Input -->
                                                <input type="file" class="hidden"
                                                            ref="cover"
                                                            @change="updateImagePreview('cover')">

                                                <label class="block text-sm font-medium text-gray-700">
                                                    Cover image
                                                </label>

                                                <!-- Current Cover Image -->
                                                <div v-show="! coverPreview" class="mt-2 relative block w-full h-56 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-sky-500 overflow-hidden">
                                                    <img :src="housing.cover_image_url" :alt="`${housing.name} cover image`" class="object-cover pointer-events-none group-hover:opacity-75" />
                                                </div>

                                                <!-- New Cover Image Preview -->
                                                <div v-show="coverPreview" class="mt-2 relative overflow-hidden">
                                                    <span class="block w-full h-56 rounded-lg" :style="'background-size: cover; background-repeat: no-repeat; background-position: center center; background-image: url(\'' + coverPreview + '\');'" />
                                                </div>

                                                <button @click.prevent="selectNewCoverImage" class="mt-3 mr-2 inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition">
                                                    Select A New Cover Image
                                                </button>

                                                <button @click.prevent="deleteCoverImage" v-if="housing.cover_image_path" class="mt-2 inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition">
                                                    Remove Cover Image
                                                </button>

                                                <jet-input-error :message="currentHousing.errors.cover" class="mt-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="p-4 sm:p-6 lg:px-8">
                            <div class="md:grid md:grid-cols-3 md:gap-6">
                                <div class="md:col-span-1">
                                    <div class="px-4 sm:px-0">
                                        <h3 class="text-lg font-medium leading-6 text-gray-900">Housing Information</h3>
                                        <p class="mt-1 text-sm text-gray-600">
                                            Use a permanent address where you can receive mail.
                                        </p>
                                    </div>
                                </div>
                                <div class="mt-5 md:mt-0 md:col-span-2">
                                    <div>
                                        <div class="px-4 py-1 sm:px-6">
                                            <div class="grid grid-cols-6 gap-6">
                                                <div class="col-span-6 sm:col-span-4">
                                                    <label for="housing-name" class="block text-sm font-medium text-gray-700">Housing name</label>
                                                    <input type="text" v-model="currentHousing.name" name="housing-name" id="housing-name" class="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                </div>

                                                <div class="col-span-6 sm:col-span-4">
                                                    <label for="housing-website" class="block text-sm font-medium text-gray-700">
                                                        Website
                                                    </label>
                                                    <div class="mt-1 flex rounded-md shadow-sm">
                                                        <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                            https://
                                                        </span>
                                                        <input type="text" name="housing-website" id="housing-website" class="focus:ring-sky-500 focus:border-sky-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="www.example.com" v-model="currentHousing.website_url" />
                                                    </div>
                                                </div>

                                                <div class="col-span-6 sm:col-span-3">
                                                    <label for="email-address" class="block text-sm font-medium text-gray-700">Email address</label>
                                                    <input type="text" v-model="currentHousing.email_address" name="email-address" id="email-address" autocomplete="email" class="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                    <jet-input-error :message="currentHousing.errors.email_address" class="mt-1" />
                                                </div>

                                                <div class="col-span-6 sm:col-span-3">
                                                    <label for="phone-number" class="block text-sm font-medium text-gray-700">Phone number</label>
                                                    <input type="text" v-model="currentHousing.phone_number" name="phone-number" id="phone-number" placeholder="(555) 555-5555" class="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                    <jet-input-error :message="currentHousing.errors.phone_number" class="mt-1" />
                                                </div>

                                                <div class="col-span-6 sm:col-span-4">
                                                    <label for="street-address" class="block text-sm font-medium text-gray-700">Street address</label>
                                                    <input type="text" v-model="currentHousing.street" name="street-address" id="street-address" class="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                </div>

                                                <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                                                    <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                                                    <input type="text" v-model="currentHousing.city" name="city" id="city" class="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                </div>

                                                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                                    <label for="postal-code" class="block text-sm font-medium text-gray-700">ZIP / Postal</label>
                                                    <input type="text" v-model="currentHousing.postal_code" name="postal-code" id="postal-code" class="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                </div>

                                                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                                    <label for="rent" class="block text-sm font-medium text-gray-700">Rent range</label>
                                                    <input type="text" v-model="currentHousing.rent_range" name="rent" id="rent" class="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                </div>

                                                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                                    <label for="bedrooms" class="block text-sm font-medium text-gray-700">Bedroom range</label>
                                                    <input type="text" v-model="currentHousing.bedroom_range" name="bedrooms" id="bedrooms" class="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                </div>

                                                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                                    <label for="bathrooms" class="block text-sm font-medium text-gray-700">Bathroom range</label>
                                                    <input type="text" v-model="currentHousing.bathroom_range" name="bathrooms" id="bathrooms" class="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                </div>

                                                <div class="col-span-6 sm:col-span-3">
                                                    <Listbox as="div" v-model="selected">
                                                        <ListboxLabel class="block text-sm font-medium text-gray-700">
                                                            Housing type
                                                        </ListboxLabel>
                                                        <div class="mt-1 relative">
                                                            <ListboxButton class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
                                                                <span class="block truncate">{{ selected.name }}</span>
                                                                <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                    <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                </span>
                                                            </ListboxButton>

                                                            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                                                                <ListboxOptions class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                                    <ListboxOption as="template" v-for="(type, typeIdx) in housingTypes" :key="typeIdx" :value="type" v-slot="{ active, selected }">
                                                                        <li @click="updateHousingType(type.value)" :class="[active ? 'text-white bg-sky-600' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-3 pr-9']">
                                                                            <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                                                                                {{ type.name }}
                                                                            </span>

                                                                            <span v-if="selected" :class="[active ? 'text-white' : 'text-sky-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                                                                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                                                            </span>
                                                                        </li>
                                                                    </ListboxOption>
                                                                </ListboxOptions>
                                                            </transition>
                                                        </div>
                                                    </Listbox>
                                                </div>

                                                <div v-if="currentHousing.housing_type === 'single'" class="col-span-6 sm:col-span-4">
                                                    <div class="flex items-start">
                                                        <div class="flex items-center h-5">
                                                            <input id="byui-approved" v-model="currentHousing.byui_approved" name="byui-approved" type="checkbox" class="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300 rounded" />
                                                        </div>
                                                        <div class="ml-3 text-sm">
                                                            <label for="byui-approved" class="font-medium text-gray-700">BYU-Idaho Approved</label>
                                                            <p class="text-gray-500">By checking this box, you certify that this property is BYU-Idaho approved single student housing.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="p-4 sm:p-6 lg:px-8">
                            <div class="md:grid md:grid-cols-3 md:gap-6">
                                <div class="md:col-span-1">
                                    <div class="px-4 sm:px-0">
                                        <h3 class="text-lg font-medium leading-6 text-gray-900">Amenities</h3>
                                        <p class="mt-1 text-sm text-gray-600">
                                            Select the amenities available at this property.
                                        </p>
                                    </div>
                                </div>
                                <div class="mt-5 md:mt-0 md:col-span-2">
                                    <div>
                                        <div class="px-4 py-1 sm:px-6">
                                            <div class="grid grid-cols-6 gap-6">
                                                <template v-for="amenity in amenities" :key="amenity.id">
                                                    <div class="col-span-6 sm:col-span-2">
                                                        <label class="flex items-start" @change="updateAmenities(amenity)">
                                                            <div class="flex items-center h-5">
                                                                <input type="checkbox" :checked="findAmenity(amenity.name)" class="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300 rounded" />
                                                            </div>
                                                            <div class="ml-3 text-sm">
                                                                <span class="font-medium text-gray-700">{{ amenity.name }}</span>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="px-4 py-4 sm:px-6">
                            <div class="flex justify-end">
                                <button @click.prevent="updateHousingInformation" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Save changes</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </app-layout>
</template>

<script>
    import { ref } from 'vue';
    import { Link } from '@inertiajs/inertia-vue3';
    import AppLayout from '@/Layouts/AppLayout.vue';
    import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue';
    import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid';
    import JetInputError from '@/Jetstream/InputError.vue';
    import TextEditor from '@/Components/TextEditor.vue';

    const housingTypes = [
        { name: "Single", value: "single" },
        { name: "Married", value: "married" },
    ];

    export default {
        components: {
            AppLayout,
            CheckIcon,
            JetInputError,
            Link,
            Listbox,
            ListboxButton,
            ListboxLabel,
            ListboxOption,
            ListboxOptions,
            SelectorIcon,
            TextEditor,
        },
        props: {
            housing: Object,
            amenities: Array,
            canLogin: Boolean,
            canRegister: Boolean,
        },
        data() {
            return {
                currentHousing: this.$inertia.form({
                    _method: 'PUT',
                    ...this.housing,
                    profile: null,
                    cover: null,
                    updatedAmenities: [],
                }),
                coverPreview: null,
                profilePreview: null,
                selected: ref(housingTypes[0]),
            }
        },
        setup() {
            return {
                housingTypes,
            }
        },
        created() {
            this.selected = housingTypes[
                housingTypes.findIndex(type => type.value === this.currentHousing.housing_type)
            ];
        },
        computed: {
            tooManyCharacters() {
                return this.currentHousing.about.length > 1000;
            },
        },
        methods: {
            findAmenity(amenityToFind) {
                return this.housing.amenities.find(amenity => amenity.name === amenityToFind);
            },
            updateHousingInformation() {
                if (this.$refs.profile) {
                    this.currentHousing.profile = this.$refs.profile.files[0];
                }
                if (this.$refs.cover) {
                    this.currentHousing.cover = this.$refs.cover.files[0];
                }

                this.currentHousing.amenities.forEach(amenity => {
                    this.currentHousing.updatedAmenities.push(amenity.id)
                })
                console.log(this.currentHousing.updatedAmenities);

                this.currentHousing.post(route('housing.profile.update'), {
                    errorBag: 'updateHousingInformation',
                    preserveScroll: true,
                    onSuccess: () => (this.clearImageInputs()),
                });
            },
            selectNewProfileImage() {
                this.$refs.profile.click();
            },
            selectNewCoverImage() {
                this.$refs.cover.click();
            },
            clearImageInputs() {
                if (this.$refs.profile?.value) {
                    this.$refs.profile.value = null;
                }
                if (this.$refs.cover?.value) {
                    this.$refs.cover.value = null;
                }
            },
            updateHousingType(value) {
                this.currentHousing.housing_type = value;
            },
            updateAbout(event) {
                this.currentHousing.about = event.target.innerHTML;
            },
            updateAmenities(currentAmenity) {
                let index = this.currentHousing.amenities.findIndex(amenity => amenity.name === currentAmenity.name)
                if (index < 0) {
                    this.currentHousing.amenities.push(currentAmenity);
                } else {
                    this.currentHousing.amenities.splice(index, 1);
                }
            },
            updateImagePreview(imageRef) {
                const image = imageRef === 'profile'
                    ? this.$refs.profile.files[0]
                    : this.$refs.cover.files[0];

                if (! image) return;

                const reader = new FileReader();

                reader.onload = (e) => {
                    imageRef === 'profile'
                        ? this.profilePreview = e.target.result
                        : this.coverPreview = e.target.result;
                };

                reader.readAsDataURL(image);
            },
            deleteCoverImage() {
                this.$inertia.delete(route('housing-cover-image.destroy', [this.housing.id]), {
                    preserveScroll: true,
                    onSuccess: () => {
                        this.coverPreview = null;
                        this.clearCoverImageInput();
                    },
                });
            },
            clearCoverImageInput() {
                if (this.$refs.cover?.value) {
                    this.$refs.cover.value = null;
                }
            },
            deleteProfileImage() {
                this.$inertia.delete(route('housing-profile-image.destroy', {
                    id: this.housing.id
                }), {
                    preserveScroll: true,
                    onSuccess: () => {
                        this.profilePreview = null;
                        this.clearProfileImageInput();
                    },
                });
            },
            clearCoverImageInput() {
                if (this.$refs.profile?.value) {
                    this.$refs.profile.value = null;
                }
            },
        },
    }
</script>