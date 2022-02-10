<template>
    <app-layout>
        <div class="py-12 px-4 md:px-0">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <h2>Add new Student Housing</h2>
                <form class="mt-4">
                    <div class="space-y-6 sm:space-y-5">
                        <div>
                            <label for="housing-name" class="block text-sm font-medium text-gray-800">
                                Housing name
                            </label>
                            <div class="mt-1">
                                <input id="housing-name" name="housing-name" v-model="housing.name" type="text" autocomplete="housing-name" class="max-w-md shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                            </div>
                            <jet-input-error :message="housing.errors.name" class="mt-2" />
                        </div>

                        <div>
                            <Listbox as="div" v-model="selected">
                                <ListboxLabel class="block text-sm font-medium text-gray-700">
                                    Housing type
                                </ListboxLabel>
                                <div class="mt-1 relative max-w-md">
                                    <ListboxButton class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        <span class="block truncate">{{ selected.name }}</span>
                                        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                            <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                    </ListboxButton>

                                    <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                                        <ListboxOptions class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                            <ListboxOption as="template" v-for="type in types" :key="type.id" :value="type" v-slot="{ active, selected }">
                                                <li :class="[active ? 'text-white bg-sky-600' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-8 pr-4']" @click="updateHousingType(type.value)">
                                                    <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                                                        {{ type.name }}
                                                    </span>

                                                    <span v-if="selected" :class="[active ? 'text-white' : 'text-sky-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']">
                                                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                </li>
                                            </ListboxOption>
                                        </ListboxOptions>
                                    </transition>
                                </div>
                            </Listbox>
                            <jet-input-error :message="housing.errors.housing_type" class="mt-2" />
                        </div>

                        <div class="pt-2">
                            <button @click="createHousing" type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                                Create
                            </button>
                        </div>
                    </div>
                </form>
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

    const types = [
        { id: 1, name: 'Single', value: 'single' },
        { id: 2, name: 'Married', value: 'married' },
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
        },
        data() {
            return {
                housing: this.$inertia.form({
                    name: null,
                    housing_type: null,
                }),
            }
        },
        methods: {
            createHousing() {
                this.housing.post(route('admin.housing.store'), {
                    errorBag: 'createHousing',
                });
            },
            updateHousingType(type) {
                this.housing.housing_type = type;
            },
        },
        setup() {
            const selected = ref(types[0]);

            return {
                selected,
                types,
            }
        },
    }
</script>