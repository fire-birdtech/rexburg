<template>
    <admin-layout>
        <div class="max-w-5xl mx-auto bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
                <div class="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                    <div class="ml-4 mt-2">
                        <h3 class="text-2xl leading-6 font-medium text-gray-900">Edit Housing</h3>
                    </div>
                    <div class="ml-4 mt-2 flex-shrink-0 space-x-2">
                        <!-- <Link :href="route('housing.profile', [housing.slug])" class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Back to profile</Link> -->
                        <button @click.prevent="updateHousingInformation" class="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Save changes</button>
                    </div>
                </div>
            </div>
            <div class="px-4 py-5 sm:p-6">
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
                        <form>
                            <div class="px-4 py-1 sm:px-6">
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6">
                                        <label for="housing-name" class="block text-sm font-medium text-gray-700">Housing name</label>
                                        <input type="text" v-model="housing.name" name="housing-name" id="housing-name" class="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>

                                    <div class="col-span-6">
                                        <label for="housing-website" class="block text-sm font-medium text-gray-700">
                                            Website
                                        </label>
                                        <div class="mt-1 flex rounded-md shadow-sm">
                                            <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                https://
                                            </span>
                                            <input type="text" name="housing-website" id="housing-website" class="focus:ring-sky-500 focus:border-sky-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="www.example.com" v-model="housing.website_url" />
                                        </div>
                                    </div>

                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="email-address" class="block text-sm font-medium text-gray-700">Email address</label>
                                        <input type="text" v-model="housing.email_address" name="email-address" id="email-address" autocomplete="email" class="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        <!-- <jet-input-error :message="housing?.errors.email_address" class="mt-1" /> -->
                                    </div>

                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="phone-number" class="block text-sm font-medium text-gray-700">Phone number</label>
                                        <input type="text" v-model="housing.phone_number" name="phone-number" id="phone-number" placeholder="(555) 555-5555" class="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        <!-- <jet-input-error :message="housing?.errors.phone_number" class="mt-1" /> -->
                                    </div>

                                    <div class="col-span-6">
                                        <label for="street-address" class="block text-sm font-medium text-gray-700">Street address</label>
                                        <input type="text" v-model="housing.street" name="street-address" id="street-address" class="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>

                                    <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                                        <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                                        <input type="text" v-model="housing.city" name="city" id="city" class="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>

                                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                        <label for="postal-code" class="block text-sm font-medium text-gray-700">ZIP / Postal</label>
                                        <input type="text" v-model="housing.postal_code" name="postal-code" id="postal-code" class="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>

                                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                        <label for="rent" class="block text-sm font-medium text-gray-700">Rent range</label>
                                        <input type="text" v-model="housing.rent_range" name="rent" id="rent" class="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>

                                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                        <label for="bedrooms" class="block text-sm font-medium text-gray-700">Bedroom range</label>
                                        <input type="text" v-model="housing.bedroom_range" name="bedrooms" id="bedrooms" class="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>

                                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                        <label for="bathrooms" class="block text-sm font-medium text-gray-700">Bathroom range</label>
                                        <input type="text" v-model="housing.bathroom_range" name="bathrooms" id="bathrooms" class="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
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
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="px-4 py-4 sm:px-6">
                <div class="flex justify-end">
                    <button @click.prevent="updateHousingInformation" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Save changes</button>
                </div>
            </div>
        </div>
    </admin-layout>
</template>

<script setup>
    import AdminLayout from '@/Layouts/AdminLayout.vue';
    import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue';
    import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid';
    import { ref } from 'vue';
    import { housingTypes } from '@/Utils/housingTypes';
    import { router } from '@inertiajs/vue3';

    const props = defineProps({
        housing: Object,
    });

    const selected = ref(housingTypes[
        housingTypes.findIndex(type => type.value === props.housing.housing_type)
    ]);

    const updateHousingType = (value) => {
        props.housing.housing_type = value;
    }

    const updateHousingInformation = () =>  {
        router.post(route('admin.housing.update', [props.housing.id]), props.housing, {
            errorBag: 'updateHousingInformation',
            preserveScroll: true,
        });
    }
</script>