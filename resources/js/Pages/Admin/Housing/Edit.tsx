import { type ReactElement } from 'react'
import { Head, useForm } from '@inertiajs/react'
import { PrimaryButton } from '@/Components/Buttons'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import TextInputWithAddon from '@/Components/TextInputWithAddon'
import Admin from '@/Layouts/AdminLayout'
import { type Housing, type PageProps } from '@/types'

export default function HousingEdit ({ auth, housing }: PageProps<{ housing: Housing }>): ReactElement {
  const {
    data, setData, put, processing, errors
  } = useForm({
    ...housing
  })

  const submit = (): void => {
    put(route('admin.housing.update', [housing.id]))
  }

  return (
    <Admin
      user={auth.user}
    >
      <Head title={`Edit ${housing.name}`} />

      <div className="mx-auto max-w-5xl overflow-hidden rounded-lg bg-white shadow dark:bg-slate-800">
        <div className="border-b border-slate-300 px-4 py-5 dark:border-slate-700 sm:px-6">
          <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="ml-4 mt-2">
              <h3 className="text-2xl font-medium leading-6 text-slate-800 dark:text-slate-200">
                Edit {housing.name}
              </h3>
            </div>
            <div className="ml-4 mt-2 shrink-0 space-x-2">
              <PrimaryButton
                onClick={submit}
                disabled={processing}
              >
                Save changes
              </PrimaryButton>
            </div>
          </div>
        </div>

        <div className="px-4 py-5 sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-slate-800 dark:text-slate-200">
                  Housing Information
                </h3>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form>
                <div className="px-4 py-1 sm:px-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <InputLabel htmlFor="housing-name" value="Housing name"/>
                      <TextInput
                        name="housing-name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => { setData('name', e.target.value) }}
                      />
                      <InputError message={errors.name} className="mt-1"/>
                    </div>

                    <div className="col-span-6">
                      <InputLabel htmlFor="housing-website" value="Website"/>
                      <TextInputWithAddon
                        addonText="https://"
                        name="housing-website"
                        className="mt-1 block w-full"
                        value={data.website_url}
                        onChange={(e) => { setData('website_url', e.target.value) }}
                      />
                      <InputError message={errors.website_url} className="mt-1"/>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <InputLabel htmlFor="email-address" value="Email address"/>
                      <TextInput
                        name="email-address"
                        className="mt-1 block w-full"
                        value={data.email_address}
                        onChange={(e) => { setData('email_address', e.target.value) }}
                      />
                      <InputError message={errors.email_address} className="mt-1"/>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <InputLabel htmlFor="phone-number" value="Phone number"/>
                      <TextInput
                        name="phone-number"
                        className="mt-1 block w-full"
                        value={data.phone_number}
                        onChange={(e) => { setData('phone_number', e.target.value) }}
                      />
                      <InputError message={errors.phone_number} className="mt-1"/>
                    </div>

                    <div className="col-span-6">
                      <InputLabel htmlFor="street-address" value="Street address"/>
                      <TextInput
                        name="street-addres"
                        className="mt-1 block w-full"
                        value={data.street}
                        onChange={(e) => { setData('street', e.target.value) }}
                      />
                      <InputError message={errors.street} className="mt-1"/>
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                      <InputLabel htmlFor="city" value="City"/>
                      <TextInput
                        name="city"
                        className="mt-1 block w-full"
                        value={data.city}
                        onChange={(e) => { setData('city', e.target.value) }}
                      />
                      <InputError message={errors.city} className="mt-1"/>
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <InputLabel htmlFor="postal-code" value="ZIP / Postal"/>
                      <TextInput
                        name="postal-code"
                        className="mt-1 block w-full"
                        value={data.postal_code}
                        onChange={(e) => { setData('postal_code', e.target.value) }}
                      />
                      <InputError message={errors.postal_code} className="mt-1"/>
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <InputLabel htmlFor="rent" value="Rent range"/>
                      <TextInput
                        name="rent"
                        className="mt-1 block w-full"
                        value={data.rent_range}
                        onChange={(e) => { setData('rent_range', e.target.value) }}
                      />
                      <InputError message={errors.rent_range} className="mt-1"/>
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <InputLabel htmlFor="bedrooms" value="Bedroom range"/>
                      <TextInput
                        name="bedrooms"
                        className="mt-1 block w-full"
                        value={data.bedroom_range}
                        onChange={(e) => { setData('bedroom_range', e.target.value) }}
                      />
                      <InputError message={errors.bedroom_range} className="mt-1"/>
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <InputLabel htmlFor="bathrooms" value="Bathroom range"/>
                      <TextInput
                        name="bathrooms"
                        className="mt-1 block w-full"
                        value={data.bathroom_range}
                        onChange={(e) => { setData('bathroom_range', e.target.value) }}
                      />
                      <InputError message={errors.bathroom_range} className="mt-1"/>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Admin>
  )
}
