import { Fragment } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PrimaryButton, SecondaryButton } from '@/Components/Buttons';
import InputLabel from '@/Components/InputLabel';
import TextArea from '@/Components/TextArea';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import TextInputWithAddon from '@/Components/TextInputWithAddon';
import classNames from '@/Utils/classNames';
import Checkbox from '@/Components/Checkbox';
import capitalize from '@/Utils/strings';
import UpdateProfileImage from '@/Components/UpdateProfileImage';
import UpdateCoverImage from '@/Components/UpdateCoverImage';
import { Amenity, Housing, PageProps } from '@/types';

const housingTypes = [
  { name: 'Single', value: 'single' },
  { name: 'Married', value: 'married' },
];

export default function StudentHousingEdit({ availableAmenities, auth, housing }: PageProps & { availableAmenities: Amenity[], housing: Housing }) {
  const {
    data, setData, errors, put, reset, processing,
  } = useForm({
    ...housing,
    cover: {},
    profile: {},
  });

  const updateProfile = (value: File) => {
    let { profile } = data;
    profile = value;
    setData('profile', profile);
  };

  const updateCover = (value: File) => {
    let { cover } = data;
    cover = value;
    setData('cover', cover);
  };

  const findAmenity = (selectedAmenity: Amenity) => (data.amenities.indexOf(selectedAmenity) !== -1);

  const updateAmenities = (selectedAmenity: Amenity) => {
    const index = data.amenities.indexOf(selectedAmenity);
    const { amenities } = data;

    if (index < 0) {
      amenities.push(selectedAmenity);
      setData({ ...data, amenities });
    } else {
      amenities.splice(index, 1);
      setData({ ...data, amenities });
    }
  };

  const submit = () => {
    put(route('housing.update'), {
      preserveScroll: true,
      onSuccess: () => reset(),
    });
  };

  return (
    <Authenticated
      user={auth.user}
    >
      <Head title={`Edit ${housing.name}`} />

      <div className="mx-auto max-w-7xl py-10 sm:px-6 lg:px-8">
        <div className="divide-y divide-slate-600 overflow-hidden rounded-lg bg-slate-800 shadow-lg">
          <div className="px-4 py-5 sm:px-6">
            <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-2">
                <h2 className="text-2xl font-medium leading-6 text-slate-200">
                  Edit {housing.name}
                </h2>
              </div>
              <div className="ml-4 mt-2 shrink-0 space-x-2">
                <SecondaryButton href={route('housing.show', [housing.slug])}>
                  Back to profile
                </SecondaryButton>
                <PrimaryButton type="button" onClick={submit} disabled={processing}>
                  Save changes
                </PrimaryButton>
              </div>
            </div>
          </div>
          <form encType="multipart/form-data">
            <div className="divide-y divide-slate-600">
              <div className="p-4 sm:p-6 lg:px-8">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                  <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                      <h3 className="text-lg font-medium leading-6 text-slate-200">
                        Profile
                      </h3>
                      <p className="mt-1 text-sm text-slate-400">
                        This information will be displayed publicly so be careful what you share.
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 md:col-span-2 md:mt-0">
                    <div>
                      <div className="space-y-6 px-4 py-1 sm:px-6">
                        <div>
                          <InputLabel htmlFor="about" value="About" />

                          <TextArea
                            value={data.about || ''}
                            onChange={(e) => setData('about', e.target.value)}
                            className="mt-1 block w-full"
                          />

                          <div className="mt-2 flex items-center justify-between text-sm text-slate-400">
                            <p>
                              Bried description of your property.
                            </p>
                            <p>
                              1,000 character limit
                            </p>
                          </div>

                          <InputError message={errors.about} className="mt-1" />
                        </div>

                        <UpdateProfileImage
                          name={housing.name}
                          imageUrl={housing.profile_image_url}
                          imagePath={housing.profile_image_path}
                          onChange={(value) => updateProfile(value)}
                          error={errors.profile}
                        />

                        <UpdateCoverImage
                          name={housing.name}
                          imageUrl={housing.cover_image_url}
                          imagePath={housing.cover_image_path}
                          onChange={(value) => updateCover(value)}
                          error={errors.cover}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 lg:px-8">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                  <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                      <h3 className="text-lg font-medium leading-6 text-slate-200">
                        Housing Information
                      </h3>
                      <p className="mt-1 text-sm text-slate-400">
                        Use a permanent address where you can receive mail.
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 md:col-span-2 md:mt-0">
                    <div>
                      <div className="px-4 py-1 sm:px-6">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-4">
                            <InputLabel htmlFor="name" value="Housing name" />

                            <TextInput
                              id="name"
                              name="name"
                              className="mt-1 block w-full"
                              value={data.name || ''}
                              onChange={(e) => setData('name', e.target.value)}
                            />

                            <InputError message={errors.name} className="mt-1" />
                          </div>

                          <div className="col-span-6 sm:col-span-4">
                            <InputLabel htmlFor="website" value="Website" />

                            <TextInputWithAddon
                              id="website"
                              name="website"
                              value={data.website_url || ''}
                              onChange={(e) => setData('website_url', e.target.value)}
                              placeholder="www.example.com"
                              addonText="https://"
                            />

                            <InputError message={errors.website_url} className="mt-1" />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <InputLabel htmlFor="email" value="Email address" />

                            <TextInput
                              id="email"
                              type="email"
                              name="email"
                              className="mt-1 block w-full"
                              value={data.email_address || ''}
                              onChange={(e) => setData('email_address', e.target.value)}
                            />

                            <InputError message={errors.email_address} className="mt-1" />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <InputLabel htmlFor="phone" value="Phone number" />

                            <TextInput
                              id="phone"
                              name="phone"
                              className="mt-1 block w-full"
                              value={data.phone_number || ''}
                              onChange={(e) => setData('phone_number', e.target.value)}
                            />

                            <InputError message={errors.phone_number} className="mt-1" />
                          </div>

                          <div className="col-span-6 sm:col-span-4">
                            <InputLabel htmlFor="street" value="Street address" />

                            <TextInput
                              id="street"
                              name="street"
                              className="mt-1 block w-full"
                              value={data.street || ''}
                              onChange={(e) => setData('street', e.target.value)}
                            />

                            <InputError message={errors.street} className="mt-1" />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <InputLabel htmlFor="city" value="City" />

                            <TextInput
                              id="city"
                              name="city"
                              className="mt-1 block w-full"
                              value={data.city || ''}
                              onChange={(e) => setData('city', e.target.value)}
                            />

                            <InputError message={errors.city} className="mt-1" />
                          </div>

                          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <InputLabel htmlFor="postal_code" value="ZIP / Postal code" />

                            <TextInput
                              id="postal_code"
                              name="postal_code"
                              className="mt-1 block w-full"
                              value={data.postal_code || ''}
                              onChange={(e) => setData('postal_code', e.target.value)}
                            />

                            <InputError message={errors.postal_code} className="mt-1" />
                          </div>

                          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <InputLabel htmlFor="rent" value="Rent range" />

                            <TextInput
                              id="rent"
                              name="rent"
                              className="mt-1 block w-full"
                              value={data.rent_range || ''}
                              onChange={(e) => setData('rent_range', e.target.value)}
                            />

                            <InputError message={errors.rent_range} className="mt-1" />
                          </div>

                          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <InputLabel htmlFor="bedroom" value="Bedroom range" />

                            <TextInput
                              id="bedroom"
                              name="bedroom"
                              className="mt-1 block w-full"
                              value={data.bedroom_range || ''}
                              onChange={(e) => setData('bedroom_range', e.target.value)}
                            />

                            <InputError message={errors.bedroom_range} className="mt-1" />
                          </div>

                          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <InputLabel htmlFor="bathroom" value="Bathroom range" />

                            <TextInput
                              id="bathroom"
                              name="bathroom"
                              className="mt-1 block w-full"
                              value={data.bathroom_range || ''}
                              onChange={(e) => setData('bathroom_range', e.target.value)}
                            />

                            <InputError message={errors.bathroom_range} className="mt-1" />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <Listbox value={data.housing_type} onChange={(value) => setData('housing_type', value)}>
                              {({ open }) => (
                                <>
                                  <Listbox.Label className="block text-sm font-medium text-slate-300">
                                    Housing type
                                  </Listbox.Label>
                                  <div className="relative mt-1">
                                    <Listbox.Button className="relative w-full cursor-default rounded-md border border-slate-700 bg-slate-900 py-2 pl-3 pr-10 text-left text-slate-300 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500">
                                      <span className="block truncate">
                                        {capitalize(data.housing_type)}
                                      </span>
                                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronDownIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
                                      </span>
                                    </Listbox.Button>

                                    <Transition
                                      show={open}
                                      as={Fragment}
                                      leave="transition ease-in duration-100"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0"
                                    >
                                      <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-900 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                                        {housingTypes.map((type, index) => (
                                          <Listbox.Option
                                            key={index}
                                            value={type.value}
                                            className={({ active }) => classNames(active ? 'bg-sky-600 text-white' : 'text-slate-200', 'relative cursor-default select-none py-2 pl-3 pr-9')}
                                          >
                                            {({ selected, active }) => (
                                              <>
                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                  {type.name}
                                                </span>

                                                {selected ? (
                                                  <span
                                                    className={classNames(
                                                      active ? 'text-white' : 'text-sky-600',
                                                      'absolute inset-y-0 right-0 flex items-center pr-4',
                                                    )}
                                                  >
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                  </span>
                                                ) : null}
                                              </>
                                            )}
                                          </Listbox.Option>
                                        ))}
                                      </Listbox.Options>
                                    </Transition>
                                  </div>
                                </>
                              )}
                            </Listbox>
                          </div>

                          {data.housing_type === 'single' ? (
                            <div className="col-span-6 sm:col-span-4">
                              <label className="flex items-center">
                                <Checkbox
                                  id="byui_approved"
                                  name="byui_approved"
                                  checked={data.byui_approved || false}
                                  onChange={(e) => setData('byui_approved', e.target.checked)}
                                />
                                <span className="ml-2 text-slate-400">
                                  BYU-Idaho Approved
                                </span>
                              </label>
                              <p className="mt-2 text-sm text-slate-400">
                                By checking this box, you certify that this property is BYU-Idaho approved single student housing.
                              </p>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 lg:px-8">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                  <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                      <h3 className="text-lg font-medium leading-6 text-slate-200">
                        Amenities
                      </h3>
                      <p className="mt-1 text-sm text-slate-400">
                        Select the amenities available at this property.
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 md:col-span-2 md:mt-0">
                    <div>
                      <div className="px-4 py-1 sm:px-6">
                        <div className="grid grid-cols-6 gap-6">
                          {availableAmenities.map((amenity) => (
                            <div key={amenity.id} className="col-span-6 sm:col-span-2">
                              <label className="flex items-center">
                                <Checkbox
                                  checked={findAmenity(amenity)}
                                  onChange={() => updateAmenities(amenity)}
                                />
                                <span className="ml-3 text-slate-400">
                                  {amenity.name}
                                </span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex justify-end">
                  <PrimaryButton type="button" onClick={submit} disabled={processing}>
                    Save changes
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Authenticated>
  );
}
