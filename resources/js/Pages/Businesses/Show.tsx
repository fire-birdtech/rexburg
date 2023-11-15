import Address from '@/Components/Address'
import MetaDataItem from '@/Components/MetaDataItem'
import MetadataWrapper from '@/Components/MetadataWrapper'
import { Header2 } from '@/Components/Typography/Headers'
import { capitalizeWords } from '@/Utils/strings'
import { type ReactElement } from 'react'
import { Head } from '@inertiajs/react'
import Container from '@/Components/Container'
import CoverImage from '@/Components/CoverImage'
import ProfileImage from '@/Components/ProfileImage'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { type Business, type PageProps } from '@/types'

export default function BusinessesShow ({ auth, business }: PageProps<{ business: Business }>): ReactElement {
  return (
    <>
      <Head title={business.name}/>

      <Authenticated user={auth.user}>
        <Container>
          <div>
            <CoverImage name={business.name} src={business.cover_image_url}/>
          </div>
          <div className="max-w-8xl mx-auto px-4 pb-20 sm:px-6 lg:px-8">
            <div className="-mt-12 sm:-mt-16 sm:flex sm:items-start">
              <div className="sm:flex sm:items-end sm:space-x-5">
                <div className="flex">
                  <ProfileImage name={business.name} src={business.profile_image_url}/>
                </div>
                <div className="mt-4 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                  <div className="mt-4 flex min-w-0 flex-1 items-center sm:hidden md:flex">
                    <h1 className="truncate text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-4xl md:leading-12">
                      {business.name}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
              <h1 className="truncate text-3xl font-bold text-slate-100">
                {business.name}
              </h1>
            </div>
            <Address
              street={business.street}
              city={business.city}
              postalCode={business.postal_code}
            />
            <MetadataWrapper>
              <MetaDataItem icon="business" value={capitalizeWords(business.type)}/>
            </MetadataWrapper>
            <div className="lg:flex">
              <aside className="mt-8 md:order-2 md:ml-5 md:w-1/3"/>
              <div className="mt-8 md:order-1 md:w-2/3">
                {business.about !== undefined && (
                  <>
                    <Header2>
                      About {business.name}
                    </Header2>
                    <div
                      className="prose mt-4 max-w-none dark:prose-invert"
                      dangerouslySetInnerHTML={{ __html: business.about }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Authenticated>
    </>
  )
}
