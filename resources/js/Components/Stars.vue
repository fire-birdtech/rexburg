<template>
    <template v-for="n in 5" :key="n">
        <StarIcon :class="[size, n <= score ? 'text-sky-500' : 'text-gray-300', 'fill-current']" />
    </template>
</template>

<script>
    import { StarIcon } from '@heroicons/vue/24/solid';
    
    export default {
        props: ['size', 'score'],
        components: {
            StarIcon,
        }
    }
</script>