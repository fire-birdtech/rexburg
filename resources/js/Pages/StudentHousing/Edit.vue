<template>
    <app-layout :title="`Edit ${housing.name}`" :canLogin="canLogin" :canRegister="canRegister">
        <div class="mx-auto max-w-7xl py-10 sm:px-6 lg:px-8">
            <div class="divide-y divide-slate-600 overflow-hidden rounded-lg bg-white shadow dark:bg-slate-800">
                <div class="px-4 py-5 sm:px-6">
                    <div class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                        <div class="ml-4 mt-2">
                            <h3 class="text-2xl font-medium leading-6 text-slate-200">Edit Housing</h3>
                        </div>
                        <div class="ml-4 mt-2 shrink-0 space-x-2">
                            <SecondaryButton :href="route('housing.show', [housing.slug])">
                                Back to profile
                            </SecondaryButton>
                            <PrimaryButton @click.prevent="updateHousingInformation">
                                Save changes
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
                <form>
                    <div class="divide-y divide-slate-600">
                        <div class="p-4 sm:p-6 lg:px-8">
                            <div class="md:grid md:grid-cols-3 md:gap-6">
                                <div class="md:col-span-1">
                                    <div class="px-4 sm:px-0">
                                        <h3 class="text-lg font-medium leading-6 text-slate-200">Profile</h3>
                                        <p class="mt-1 text-sm text-slate-400">
                                            This information will be displayed publicly so be careful what you share.
                                        </p>
                                    </div>
                                </div>
                                <div class="mt-5 md:col-span-2 md:mt-0">
                                    <div>
                                        <div class="space-y-6 px-4 py-1 sm:px-6">
                                            <div>
                                                <label for="about" class="block text-sm font-medium text-slate-300">
                                                    About
                                                </label>
                                                <div class="mt-1 rounded-md">
                                                    <text-editor
                                                        :value="currentHousing.about"
                                                        @input="updateAbout($event)"
                                                        :warning="tooManyCharacters"
                                                    />
                                                </div>
                                                <div class="mt-2 flex items-center justify-between text-sm text-slate-400">
                                                    <p>
                                                        Brief description for your property.
                                                    </p>
                                                    <div>
                                                        <p :class="[tooManyCharacters && 'font-medium text-red-600']">
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

                                                <label class="block text-sm font-medium text-slate-300">
                                                    Profile image
                                                </label>

                                                <!-- Current Profile Image -->
                                                <div class="mt-2" v-show="! profilePreview">
                                                    <img :src="housing.profile_image_url" :alt="housing.name" class="h-28 w-28 rounded-full object-cover">
                                                </div>

                                                <!-- New Profile Image Preview -->
                                                <div class="mt-2" v-show="profilePreview">
                                                    <span class="block h-28 w-28 rounded-full object-cover"
                                                        :style="'background-size: cover; background-repeat: no-repeat; background-position: center center; background-image: url(\'' + profilePreview + '\');'">
                                                    </span>
                                                </div>

                                                <div class="space-x-2">
                                                    <PrimaryButton class="mt-4" @click.prevent="selectNewProfileImage">
                                                        Select A New Profile Image
                                                    </PrimaryButton>

                                                    <DangerButton @click.prevent="deleteProfileImage" v-if="housing.profile_image_path">
                                                        Remove Profile Image
                                                    </DangerButton>
                                                </div>

                                                <jet-input-error :message="currentHousing.errors.profile" class="mt-2" />
                                            </div>

                                            <div>
                                                <!-- Cover Image File Input -->
                                                <input type="file" class="hidden"
                                                            ref="cover"
                                                            @change="updateImagePreview('cover')">

                                                <label class="block text-sm font-medium text-slate-300">
                                                    Cover image
                                                </label>

                                                <!-- Current Cover Image -->
                                                <div v-show="! coverPreview" class="relative mt-2 block h-56 w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                                                    <img :src="housing.cover_image_url" :alt="`${housing.name} cover image`" class="pointer-events-none object-cover group-hover:opacity-75" />
                                                </div>

                                                <!-- New Cover Image Preview -->
                                                <div v-show="coverPreview" class="relative mt-2 overflow-hidden">
                                                    <span class="block h-56 w-full rounded-lg" :style="'background-size: cover; background-repeat: no-repeat; background-position: center center; background-image: url(\'' + coverPreview + '\');'" />
                                                </div>

                                                <div class="space-x-2">
                                                    <PrimaryButton class="mt-4" @click.prevent="selectNewCoverImage">
                                                        Select A New Cover Image
                                                    </PrimaryButton>

                                                    <DangerButton @click.prevent="deleteCoverImage" v-if="housing.cover_image_path">
                                                        Remove Cover Image
                                                    </DangerButton>
                                                </div>

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
                                        <h3 class="text-lg font-medium leading-6 text-slate-200">Housing Information</h3>
                                        <p class="mt-1 text-sm text-slate-400">
                                            Use a permanent address where you can receive mail.
                                        </p>
                                    </div>
                                </div>
                                <div class="mt-5 md:col-span-2 md:mt-0">
                                    <div>
                                        <div class="px-4 py-1 sm:px-6">
                                            <div class="grid grid-cols-6 gap-6">
                                                <div class="col-span-6 sm:col-span-4">
                                                    <label for="housing-name" class="block text-sm font-medium text-slate-300">Housing name</label>
                                                    <input type="text" v-model="currentHousing.name" name="housing-name" id="housing-name" class="mt-1 block w-full rounded-md border-slate-700 bg-slate-900 text-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm" />
                                                </div>

                                                <div class="col-span-6 sm:col-span-4">
                                                    <label for="housing-website" class="block text-sm font-medium text-slate-300">
                                                        Website
                                                    </label>
                                                    <div class="mt-1 flex rounded-md shadow-sm">
                                                        <span class="inline-flex items-center rounded-l-md border border-r-0 border-slate-700 bg-slate-900 px-3 text-sm text-slate-300">
                                                            https://
                                                        </span>
                                                        <input type="text" name="housing-website" id="housing-website" class="block w-full flex-1 rounded-none rounded-r-md border-slate-700 bg-slate-900 text-slate-300 focus:border-slate-500 focus:ring-slate-500 sm:text-sm" placeholder="www.example.com" v-model="currentHousing.website_url" />
                                                    </div>
                                                </div>

                                                <div class="col-span-6 sm:col-span-3">
                                                    <label for="email-address" class="block text-sm font-medium text-slate-300">Email address</label>
                                                    <input type="text" v-model="currentHousing.email_address" name="email-address" id="email-address" autocomplete="email" class="mt-1 block w-full rounded-md border-slate-700 bg-slate-900 text-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm" />
                                                    <jet-input-error :message="currentHousing.errors.email_address" class="mt-1" />
                                                </div>

                                                <div class="col-span-6 sm:col-span-3">
                                                    <label for="phone-number" class="block text-sm font-medium text-slate-300">Phone number</label>
                                                    <input type="text" v-model="currentHousing.phone_number" name="phone-number" id="phone-number" placeholder="(555) 555-5555" class="mt-1 block w-full rounded-md border-slate-700 bg-slate-900 text-slate-300 shadow-sm placeholder:text-slate-500 focus:border-slate-500 focus:ring-slate-500 sm:text-sm" />
                                                    <jet-input-error :message="currentHousing.errors.phone_number" class="mt-1" />
                                                </div>

                                                <div class="col-span-6 sm:col-span-4">
                                                    <label for="street-address" class="block text-sm font-medium text-slate-300">Street address</label>
                                                    <input type="text" v-model="currentHousing.street" name="street-address" id="street-address" class="mt-1 block w-full rounded-md border-slate-700 bg-slate-900 text-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm" />
                                                </div>

                                                <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                                                    <label for="city" class="block text-sm font-medium text-slate-300">City</label>
                                                    <input type="text" v-model="currentHousing.city" name="city" id="city" class="mt-1 block w-full rounded-md border-slate-700 bg-slate-900 text-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm" />
                                                </div>

                                                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                                    <label for="postal-code" class="block text-sm font-medium text-slate-300">ZIP / Postal</label>
                                                    <input type="text" v-model="currentHousing.postal_code" name="postal-code" id="postal-code" class="mt-1 block w-full rounded-md border-slate-700 bg-slate-900 text-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm" />
                                                </div>

                                                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                                    <label for="rent" class="block text-sm font-medium text-slate-300">Rent range</label>
                                                    <input type="text" v-model="currentHousing.rent_range" name="rent" id="rent" class="mt-1 block w-full rounded-md border-slate-700 bg-slate-900 text-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm" />
                                                </div>

                                                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                                    <label for="bedrooms" class="block text-sm font-medium text-slate-300">Bedroom range</label>
                                                    <input type="text" v-model="currentHousing.bedroom_range" name="bedrooms" id="bedrooms" class="mt-1 block w-full rounded-md border-slate-700 bg-slate-900 text-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm" />
                                                </div>

                                                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                                    <label for="bathrooms" class="block text-sm font-medium text-slate-300">Bathroom range</label>
                                                    <input type="text" v-model="currentHousing.bathroom_range" name="bathrooms" id="bathrooms" class="mt-1 block w-full rounded-md border-slate-700 bg-slate-900 text-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm" />
                                                </div>

                                                <div class="col-span-6 sm:col-span-3">
                                                    <Listbox as="div" v-model="selected">
                                                        <ListboxLabel class="block text-sm font-medium text-slate-300">
                                                            Housing type
                                                        </ListboxLabel>
                                                        <div class="relative mt-1">
                                                            <ListboxButton class="relative w-full cursor-default rounded-md border border-slate-700 bg-slate-900 py-2 pl-3 pr-10 text-left text-slate-300 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 sm:text-sm">
                                                                <span class="block truncate">{{ selected.name }}</span>
                                                                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                </span>
                                                            </ListboxButton>

                                                            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                                                                <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                    <ListboxOption as="template" v-for="(type, typeIdx) in housingTypes" :key="typeIdx" :value="type" v-slot="{ active, selected }">
                                                                        <li @click="updateHousingType(type.value)" :class="[active ? 'bg-sky-600 text-white' : 'text-slate-200', 'relative cursor-default select-none py-2 pl-3 pr-9']">
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
                                                        <div class="flex h-5 items-center">
                                                            <input id="byui-approved" v-model="currentHousing.byui_approved" name="byui-approved" type="checkbox" class="h-4 w-4 rounded border-slate-700 text-slate-600 focus:ring-sky-500" />
                                                        </div>
                                                        <div class="ml-3 text-sm">
                                                            <label for="byui-approved" class="font-medium text-slate-300">BYU-Idaho Approved</label>
                                                            <p class="text-slate-400">By checking this box, you certify that this property is BYU-Idaho approved single student housing.</p>
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
                                        <h3 class="text-lg font-medium leading-6 text-slate-200">Amenities</h3>
                                        <p class="mt-1 text-sm text-slate-400">
                                            Select the amenities available at this property.
                                        </p>
                                    </div>
                                </div>
                                <div class="mt-5 md:col-span-2 md:mt-0">
                                    <div>
                                        <div class="px-4 py-1 sm:px-6">
                                            <div class="grid grid-cols-6 gap-6">
                                                <template v-for="amenity in amenities" :key="amenity.id">
                                                    <div class="col-span-6 sm:col-span-2">
                                                        <label class="flex items-start" @change="updateAmenities(amenity)">
                                                            <div class="flex h-5 items-center">
                                                                <input type="checkbox" :checked="findAmenity(amenity.name)" class="h-4 w-4 rounded border-slate-700 text-slate-500 focus:ring-slate-500" />
                                                            </div>
                                                            <div class="ml-3 text-sm">
                                                                <span class="font-medium text-slate-300">{{ amenity.name }}</span>
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
                        <div class="p-4 sm:px-6">
                            <div class="flex justify-end">
                                <PrimaryButton @click.prevent="updateHousingInformation">
                                    Save changes
                                </PrimaryButton>
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
import {
  Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions,
} from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/24/solid';
import AppLayout from '@/Layouts/AppLayout.vue';
import JetInputError from '@/Jetstream/InputError.vue';
import TextEditor from '@/Components/TextEditor.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import DangerButton from '@/Components/DangerButton.vue';

const housingTypes = [
  { name: 'Single', value: 'single' },
  { name: 'Married', value: 'married' },
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
    ChevronUpDownIcon,
    TextEditor,
    PrimaryButton,
    SecondaryButton,
    DangerButton,
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
    };
  },
  setup() {
    return {
      housingTypes,
    };
  },
  created() {
    this.selected = housingTypes[
      housingTypes.findIndex((type) => type.value === this.currentHousing.housing_type)
    ];
  },
  computed: {
    tooManyCharacters() {
      return this.currentHousing?.about?.length > 1000;
    },
  },
  methods: {
    findAmenity(amenityToFind) {
      return this.housing.amenities.find((amenity) => amenity.name === amenityToFind);
    },
    updateHousingInformation() {
      if (this.$refs.profile) {
        this.currentHousing.profile = this.$refs.profile.files[0];
      }
      if (this.$refs.cover) {
        this.currentHousing.cover = this.$refs.cover.files[0];
      }

      this.currentHousing.amenities.forEach((amenity) => {
        this.currentHousing.updatedAmenities.push(amenity.id);
      });

      this.currentHousing.post(route('housing.update'), {
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
      const index = this.currentHousing.amenities.findIndex((amenity) => amenity.name === currentAmenity.name);
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

      if (!image) return;

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
        id: this.housing.id,
      }), {
        preserveScroll: true,
        onSuccess: () => {
          this.profilePreview = null;
          this.clearProfileImageInput();
        },
      });
    },
  },
};
</script>
