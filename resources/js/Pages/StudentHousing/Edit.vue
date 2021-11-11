<template>
    <app-layout :canLogin="canLogin" :canRegister="canRegister">
        <div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
            <div>
                <div class="md:grid md:grid-cols-3 md:gap-6">
                    <div class="md:col-span-1">
                        <div class="px-4 sm:px-0">
                            <h3 class="text-lg font-medium leading-6 text-gray-900" @click="consoleHousing">Profile</h3>
                            <p class="mt-1 text-sm text-gray-600">
                                This information will be displayed publicly so be careful what you share.
                            </p>
                        </div>
                    </div>
                    <div class="mt-5 md:mt-0 md:col-span-2">
                        <div class="shadow sm:rounded-md sm:overflow-hidden">
                            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                                <div>
                                    <label for="about" class="block text-sm font-medium text-gray-700">
                                        About
                                    </label>
                                    <div class="mt-1">
                                        <text-editor
                                            :value="currentHousing.about"
                                            @input="updateAbout($event)"
                                        />
                                    </div>
                                    <p class="mt-2 text-sm text-gray-500">
                                        Brief description for your property.
                                    </p>
                                </div>

                                <div>
                                    <!-- Profile Image File Input -->
                                    <input type="file" class="hidden"
                                                ref="profile"
                                                @change="updateProfilePreview">

                                    <label class="block text-sm font-medium text-gray-700">
                                        Profile image
                                    </label>        
                                    <div class="mt-1 flex items-center">
                                        <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                            <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </span>
                                        <button type="button" @click.prevent="selectNewProfileImage" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                                            Change
                                        </button>
                                    </div>
                                    <jet-input-error :message="currentHousing.errors.profile" class="mt-2" />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700">
                                        Cover image
                                    </label>
                                    <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                        <div class="space-y-1 text-center">
                                            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <div class="flex text-sm text-gray-600">
                                                <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-sky-600 hover:text-sky-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                                                    <span>Upload a file</span>
                                                    <input id="file-upload" ref="cover" name="file-upload" type="file" class="sr-only" />
                                                </label>
                                            </div>
                                            <p class="text-xs text-gray-500">
                                                PNG, JPG, GIF up to 10MB
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit" @click.prevent="updateHousingInformation" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="hidden sm:block" aria-hidden="true">
                <div class="py-5">
                    <div class="border-t border-gray-200" />
                </div>
            </div>

            <div class="mt-10 sm:mt-0">
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
                        <div class="shadow overflow-hidden sm:rounded-md">
                            <div class="px-4 py-5 bg-white sm:p-6">
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
                            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit" @click.prevent="updateHousingInformation" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="hidden sm:block" aria-hidden="true">
                <div class="py-5">
                    <div class="border-t border-gray-200" />
                </div>
            </div>

            <div class="mt-10 sm:mt-0">
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
                        <div class="shadow overflow-hidden sm:rounded-md">
                            <div class="px-4 py-5 bg-white sm:p-6">
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
                            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit" @click.prevent="updateHousingInformation" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </app-layout>
</template>

<script>
    import { ref } from 'vue';
    import AppLayout from '@/Layouts/AppLayout';
    import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue';
    import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid';
    import JetInputError from '@/Jetstream/InputError.vue';
    import TextEditor from '@/Components/TextEditor';

    const housingTypes = [
        { name: "Single", value: "single" },
        { name: "Married", value: "married" },
    ];

    export default {
        components: {
            AppLayout,
            CheckIcon,
            JetInputError,
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
            }
        },
    }
</script>