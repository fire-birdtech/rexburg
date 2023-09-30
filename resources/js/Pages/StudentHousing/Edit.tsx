import { type ReactElement } from 'react'
import { Head, useForm } from '@inertiajs/react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { PrimaryButton, SecondaryButton } from '@/Components/Buttons'
import { Header2, Header3 } from '@/Components/Typography/Headers'
import Checkbox from '@/Components/Checkbox'
import InputLabel from '@/Components/InputLabel'
import Select from '@/Components/Select'
import TextArea from '@/Components/TextArea'
import InputError from '@/Components/InputError'
import { TextInput, TextInputWithAddon } from '@/Components/TextInput'
import UpdateProfileImage from '@/Components/UpdateProfileImage'
import UpdateCoverImage from '@/Components/UpdateCoverImage'
import { type Amenity, type Housing, type PageProps } from '@/types'

const housingTypes = [
  { name: 'Single', value: 'single' },
  { name: 'Married', value: 'married' }
]

export default function StudentHousingEdit ({ availableAmenities, auth, housing }: PageProps<{ availableAmenities: Amenity[], housing: Housing }>): ReactElement {
  const {
    data, setData, errors, put, reset, processing
  } = useForm({
    ...housing,
    cover: {},
    profile: {}
  })

  const updateProfile = (value: File): void => {
    let { profile } = data
    profile = value
    setData('profile', profile)
  }

  const updateCover = (value: File): void => {
    let { cover } = data
    cover = value
    setData('cover', cover)
  }

  const findAmenity = (selectedAmenity: Amenity): boolean => data.amenities.includes(selectedAmenity)

  const updateAmenities = (selectedAmenity: Amenity): void => {
    const index = data.amenities.indexOf(selectedAmenity)
    const { amenities } = data

    if (index < 0) {
      amenities.push(selectedAmenity)
      setData({ ...data, amenities })
    } else {
      amenities.splice(index, 1)
      setData({ ...data, amenities })
    }
  }

  const submit = (): void => {
    put(route('housing.update'), {
      preserveScroll: true,
      onSuccess: () => { reset() }
    })
  }

  return (
    <Authenticated
      user={auth.user}
    >
      <Head title={`Edit ${housing.name}`} />

      <div className="mx-auto max-w-7xl py-10 sm:px-6 lg:px-8">
        <div className="divide-y divide-slate-300 overflow-hidden rounded-lg bg-white shadow-lg dark:divide-slate-600 dark:bg-slate-800">
          <div className="px-4 py-5 sm:px-6">
            <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-2">
                <Header2>
                  Edit {housing.name}
                </Header2>
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
                      <Header3>
                        Profile
                      </Header3>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
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
                            value={data.about ?? ''}
                            onChange={(e) => { setData('about', e.target.value) }}
                            className="mt-1 block w-full"
                          />

                          <div className="mt-2 flex items-center justify-between text-sm text-slate-400">
                            <p>
                              Brief description of your property.
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
                          onChange={(value) => { updateProfile(value) }}
                          error={errors.profile}
                        />

                        <UpdateCoverImage
                          name={housing.name}
                          imageUrl={housing.cover_image_url}
                          imagePath={housing.cover_image_path}
                          onChange={(value) => { updateCover(value) }}
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
                      <Header3>
                        Housing Information
                      </Header3>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
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
                              value={data.name}
                              onChange={(e) => { setData('name', e.target.value) }}
                            />

                            <InputError message={errors.name} className="mt-1" />
                          </div>

                          <div className="col-span-6 sm:col-span-4">
                            <InputLabel htmlFor="website" value="Website" />

                            <TextInputWithAddon
                              id="website"
                              name="website"
                              value={data.website_url}
                              onChange={(e) => { setData('website_url', e.target.value) }}
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
                              value={data.email_address}
                              onChange={(e) => { setData('email_address', e.target.value) }}
                            />

                            <InputError message={errors.email_address} className="mt-1" />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <InputLabel htmlFor="phone" value="Phone number" />

                            <TextInput
                              id="phone"
                              name="phone"
                              className="mt-1 block w-full"
                              value={data.phone_number}
                              onChange={(e) => { setData('phone_number', e.target.value) }}
                            />

                            <InputError message={errors.phone_number} className="mt-1" />
                          </div>

                          <div className="col-span-6 sm:col-span-4">
                            <InputLabel htmlFor="street" value="Street address" />

                            <TextInput
                              id="street"
                              name="street"
                              className="mt-1 block w-full"
                              value={data.street}
                              onChange={(e) => { setData('street', e.target.value) }}
                            />

                            <InputError message={errors.street} className="mt-1" />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <InputLabel htmlFor="city" value="City" />

                            <TextInput
                              id="city"
                              name="city"
                              className="mt-1 block w-full"
                              value={data.city}
                              onChange={(e) => { setData('city', e.target.value) }}
                            />

                            <InputError message={errors.city} className="mt-1" />
                          </div>

                          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <InputLabel htmlFor="postal_code" value="ZIP / Postal code" />

                            <TextInput
                              id="postal_code"
                              name="postal_code"
                              className="mt-1 block w-full"
                              value={data.postal_code}
                              onChange={(e) => { setData('postal_code', e.target.value) }}
                            />

                            <InputError message={errors.postal_code} className="mt-1" />
                          </div>

                          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <InputLabel htmlFor="rent" value="Rent range" />

                            <TextInput
                              id="rent"
                              name="rent"
                              className="mt-1 block w-full"
                              value={data.rent_range}
                              onChange={(e) => { setData('rent_range', e.target.value) }}
                            />

                            <InputError message={errors.rent_range} className="mt-1" />
                          </div>

                          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <InputLabel htmlFor="bedroom" value="Bedroom range" />

                            <TextInput
                              id="bedroom"
                              name="bedroom"
                              className="mt-1 block w-full"
                              value={data.bedroom_range}
                              onChange={(e) => { setData('bedroom_range', e.target.value) }}
                            />

                            <InputError message={errors.bedroom_range} className="mt-1" />
                          </div>

                          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <InputLabel htmlFor="bathroom" value="Bathroom range" />

                            <TextInput
                              id="bathroom"
                              name="bathroom"
                              className="mt-1 block w-full"
                              value={data.bathroom_range}
                              onChange={(e) => { setData('bathroom_range', e.target.value) }}
                            />

                            <InputError message={errors.bathroom_range} className="mt-1" />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <Select
                              data={data.housing_type}
                              options={housingTypes}
                              setData={(value) => {
                                setData('housing_type', value)
                              }}/>
                          </div>

                          {data.housing_type === 'single' ? (
                            <div className="col-span-6 sm:col-span-4">
                              <label className="flex items-center">
                                <Checkbox
                                  id="byui_approved"
                                  name="byui_approved"
                                  checked={data.byui_approved}
                                  onChange={(e) => { setData('byui_approved', e.target.checked) }}
                                />
                                <InputLabel value="BYU-Idaho Approved" className="ml-2"/>
                              </label>
                              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
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
                      <Header3>
                        Amenities
                      </Header3>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
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
                                  onChange={() => { updateAmenities(amenity) }}
                                />
                                <InputLabel value={amenity.name} className="ml-2"/>
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
  )
}
