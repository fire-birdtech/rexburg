<template>
    <blockquote class="flex flex-col">
        <div class="flex">
            <div class="flex-shrink-0 inline-flex rounded-full border-2 border-sky-600">
                <img :src="review.user.profile_photo_url" alt="" class="h-12 w-12 rounded-full object-cover">
            </div>
            <div class="ml-4">
                <div class="flex items-center text-base leading-6 font-medium text-gray-900">
                    {{ review.user.name }}
                    <div class="inline-flex items-center px-2.5 py-0.5 ml-3 rounded-full text-xs font-medium leading-4 bg-sky-200 text-sky-800">
                        {{ review.rating }}
                        <StarIcon class="ml-1 -mr-0.5 h-3 w-3 text-sky-400" />
                    </div>
                </div>
                <div class="text-sm leading-6 font-medium text-sky-600">{{ convertDateWithDay(review.created_at) }}</div>
            </div>
        </div>
        <div class="relative text-base leading-5 text-gray-900 md:flex-grow mt-4">
            <svg class="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-sky-400 opacity-25" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            <p class="relative">{{ review.body }}</p>
        </div>
    </blockquote>
</template>

<script>
    import { convertDateWithDay } from '@/Utils/convertDate';
    import { StarIcon } from '@heroicons/vue/24/solid';

    export default {
        props: ["review"],
        components: {
            StarIcon,
        },
        methods: {
            convertDateWithDay,
        },
    }
</script>