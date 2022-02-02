<template>
    <Link :href="route('home')">
        <application-mark class="block h-16 w-auto" />
    </Link>
</template>

<script>
    import { Link } from '@inertiajs/inertia-vue3';
    import ApplicationMark from '@/Components/ApplicationMarkBlue.vue';

    export default {
        components: {
            ApplicationMark,
            Link,
        },
    }
</script>
