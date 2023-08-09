<template>
    <Link :href="route('housing.show', [slug])">
        <div class="relative shadow-xl rounded-xl overflow-hidden min-h-full group">
            <div class="absolute inset-0">
                <img :src="image" :alt="name" class="h-full w-full object-cover transform transition duration-200 ease-in-out group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-r from-sky-300 to-blue-300" :style="{ mixBlendMode: 'multiply' }"></div>
            </div>
            <div class="relative flex flex-col min-h-full px-4 pt-20 pb-4">
                <div class="flex-grow">
                    <p class="font-bold text-white text-lg truncate">{{ name }}</p>
                </div>
            </div>
        </div>
    </Link>
</template>

<script>
    import { Link } from '@inertiajs/vue3';

    export default {
        props: ['image', 'name', 'slug'],
        components: {
            Link,
        },
    }
</script>
