<template>
    <div class="flex justify-end">
        <button type="button" @click="open = true" class="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
            Open filters
            <!-- <FilterIcon class="ml-3 -mr-1 h-5 w-5" aria-hidden="true" /> -->
        </button>
    </div>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="open = false">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                    <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <!-- This element is to trick the browser into centering the modal contents. -->
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                        <div>
                            <div>
                                <div class="block text-sm font-medium text-gray-700">
                                    Bedrooms
                                </div>
                                <span class="mt-1 relative z-0 inline-flex shadow-sm rounded-md">
                                    <button v-for="(item, index) in numberOfBedrooms" :key="index" type="button" :class="[index == 0 ? 'rounded-l-md' : '', index == numberOfBedrooms.length - 1 ? 'rounded-r-md' : '','relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500']">
                                        {{ item }}
                                    </button>
                                </span>
                            </div>

                            <div class="mt-3">
                                <div class="block text-sm font-medium text-gray-700">
                                    Bathrooms
                                </div>
                                <span class="mt-1 relative z-0 inline-flex shadow-sm rounded-md">
                                    <button v-for="(item, index) in numberOfBathrooms" :key="index" type="button" :class="[index == 0 ? 'rounded-l-md' : '', index == numberOfBathrooms.length - 1 ? 'rounded-r-md' : '','relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500']">
                                        {{ item }}
                                    </button>
                                </span>
                            </div>
                        </div>
                        <div class="mt-5 sm:mt-6">
                            <button type="button" class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:text-sm" @click="open = false">
                                Go back to dashboard
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
    import { Dialog, DialogOverlay, DialogTitle, Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions, TransitionChild, TransitionRoot } from '@headlessui/vue';

    const numberOfBedrooms = [ 1, 2, 3, 4 ];
    const numberOfBathrooms = [ 1, 2, 3 ];

    export default {
        components: {
            Dialog,
            DialogOverlay,
            DialogTitle,
            Listbox,
            ListboxButton,
            ListboxLabel,
            ListboxOption,
            ListboxOptions,
            TransitionChild,
            TransitionRoot,
        },
        setup() {
            const open = ref(false);

            return {
                numberOfBathrooms,
                numberOfBedrooms,
                open,
            }
        },
    }
</script>