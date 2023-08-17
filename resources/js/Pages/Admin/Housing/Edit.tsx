import { Head, useForm } from '@inertiajs/react';
import Admin from '@/Layouts/AdminLayout';
import { Housing, PageProps } from '@/types';

export default function HousingEdit({ auth, housing }: PageProps & { housing: Housing }) {
  const {
    data, setData, put, processing, errors,
  } = useForm({
    ...housing,
  });

  const submit = () => {
    put(route('admin.housing.update', [housing.id]));
  };

  return (
    <Admin
      user={auth.user}
    >
      <Head title={`Edit ${housing.name}`} />

      <div className="mx-auto max-w-5xl overflow-hidden rounded-lg bg-white shadow">
        <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
          <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="ml-4 mt-2">
              <h3 className="text-2xl font-medium leading-6 text-gray-900">
                Edit {housing.name}
              </h3>
            </div>
            <div className="ml-4 mt-2 shrink-0 space-x-2">
              <button onClick={submit} disabled={processing} className="relative inline-flex items-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                Save changes
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 py-5 sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Housing Information
                </h3>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form>
                <div className="px-4 py-1 sm:px-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <label htmlFor="housing-name" className="block text-sm font-medium text-gray-700">Housing name</label>
                      <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} name="housing-name" id="housing-name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
                      {errors.name !== null ? (
                        <label className="mt-2">
                          {errors.name}
                        </label>
                      ) : null}
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="housing-website" className="block text-sm font-medium text-gray-700">
                        Website
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                          https://
                        </span>
                        <input type="text" value={data.website_url} onChange={(e) => setData('website_url', e.target.value)} name="housing-website" id="housing-website" className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm" placeholder="www.example.com" />
                        {errors.website_url !== null ? (
                          <label className="mt-2">
                            {errors.website_url}
                          </label>
                        ) : null}
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Email address</label>
                      <input type="text" value={data.email_address} onChange={(e) => setData('email_address', e.target.value)} name="email-address" id="email-address" autoComplete="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
                      {errors.email_address !== null ? (
                        <label className="mt-2">
                          {errors.email_address}
                        </label>
                      ) : null}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">Phone number</label>
                      <input type="text" value={data.phone_number} onChange={(e) => setData('phone_number', e.target.value)} name="phone-number" id="phone-number" placeholder="(555) 555-5555" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
                      {errors.phone_number !== null ? (
                        <label className="mt-2">
                          {errors.phone_number}
                        </label>
                      ) : null}
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">Street address</label>
                      <input type="text" value={data.street} onChange={(e) => setData('street', e.target.value)} name="street-address" id="street-address" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
                      {errors.street !== null ? (
                        <label className="mt-2">
                          {errors.street}
                        </label>
                      ) : null}
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                      <input type="text" value={data.city} onChange={(e) => setData('city', e.target.value)} name="city" id="city" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
                      {errors.city !== null ? (
                        <label className="mt-2">
                          {errors.city}
                        </label>
                      ) : null}
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">ZIP / Postal</label>
                      <input type="text" value={data.postal_code} onChange={(e) => setData('postal_code', e.target.value)} name="postal-code" id="postal-code" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
                      {errors.postal_code !== null ? (
                        <label className="mt-2">
                          {errors.postal_code}
                        </label>
                      ) : null}
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="rent" className="block text-sm font-medium text-gray-700">Rent range</label>
                      <input type="text" value={data.rent_range} onChange={(e) => setData('rent_range', e.target.value)} name="rent" id="rent" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
                      {errors.rent_range !== null ? (
                        <label className="mt-2">
                          {errors.rent_range}
                        </label>
                      ) : null}
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">Bedroom range</label>
                      <input type="text" value={data.bedroom_range} onChange={(e) => setData('bedroom_range', e.target.value)} name="bedrooms" id="bedrooms" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
                      {errors.bedroom_range !== null ? (
                        <label className="mt-2">
                          {errors.bedroom_range}
                        </label>
                      ) : null}
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">Bathroom range</label>
                      <input type="text" value={data.bathroom_range} onChange={(e) => setData('bathroom_range', e.target.value)} name="bathrooms" id="bathrooms" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
                      {errors.bathroom_range !== null ? (
                        <label className="mt-2">
                          {errors.bathroom_range}
                        </label>
                      ) : null}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Admin>
  );
}
