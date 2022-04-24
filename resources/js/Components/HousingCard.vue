<template>
    <Link :href="route('housing.profile', [housing.slug])">
        <div class="bg-white overflow-hidden shadow hover:shadow-lg rounded-lg transform duration-200 hover:-translate-y-1">
            <img :src="housing.cover_image_url" alt="" class="rounded-t-lg h-56">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="leading-6 font-semibold text-gray-900">{{ housing.name }}</h3>
                <div class="mt-1">
                    <span class="text-gray-900">{{ housing.rent_range }}</span>
                    <span v-if="housing.housing_type === 'single'" class="ml-1 text-sm text-gray-600">/semester</span>
                    <span v-if="housing.housing_type === 'married'" class="ml-1 text-sm text-gray-600">/month</span>
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-600">
                    <Stars size="h-4 w-4" :score="housing.score" />
                    <span class="ml-2 font-semibold">{{ housing.score }}</span>
                    <span class="ml-4">{{ housing.reviews_count }} {{ housing.reviews_count === 1 ? 'review' : 'reviews' }}</span>
                </div>
            </div>
        </div>
    </Link>
</template>

<script>
    import { defineComponent } from 'vue';
    import { Link } from '@inertiajs/inertia-vue3';
    import Stars from '@/Components/Stars';

    export default defineComponent({
        props: {
            housing: Object,
        },
        components: {
            Link,
            Stars,
        },
        setup() {
            
        },
    })
</script>