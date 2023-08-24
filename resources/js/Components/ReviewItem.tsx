import { StarIcon } from '@heroicons/react/24/solid';
import { convertDateWithDay } from '@/Utils/convertDate';
import { Review } from '@/types';

export default function ReviewItem({ review }: { review: Review }) {
  return (
    <blockquote className="flex flex-col">
      <div className="flex">
        <div className="inline-flex shrink-0 rounded-full border-2 border-sky-600">
          <img src={review.user.profile_photo_url} alt={review.user.name}
               className="h-12 w-12 rounded-full object-cover"/>
        </div>
        <div className="ml-4">
          <div className="flex items-center text-base font-medium leading-6 text-slate-200">
            {review.user.name}
            <div
              className="ml-3 inline-flex items-center rounded-full bg-sky-400/10 px-2.5 py-0.5 text-xs font-medium leading-4 text-sky-400 ring-1 ring-inset ring-sky-400/20">
              {review.rating}
              <StarIcon className="-mr-0.5 ml-1 h-3 w-3 text-sky-400"/>
            </div>
          </div>
          <div className="text-sm font-medium leading-6 text-slate-400">
            {convertDateWithDay(review.created_at)}
          </div>
        </div>
      </div>
      <div className="relative mt-5 text-base leading-5 text-gray-900 md:grow">
        <svg className="absolute left-0 top-0 h-8 w-8 -translate-x-3 -translate-y-2 text-sky-400 opacity-20" fill="currentColor" viewBox="0 0 32 32">
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
        <p className="relative text-slate-200">
          {review.body}
        </p>
      </div>
    </blockquote>
  );
}
