<template>
    <Link :href="href" :class="classes">
        <slot />
    </Link>
</template>

<script>
    import { Link } from '@inertiajs/vue3';

    export default {
        components: {
            Link,
        },
        props: ['href', 'active'],

        computed: {
            classes() {
                return this.active
                    ? 'text-base font-medium bg-sky-600 text-white hover:text-sky-50 px-4 py-2 rounded-md'
                    : 'text-base font-medium text-white hover:text-sky-50 px-4 py-2 rounded-md hover:bg-sky-600 hover:bg-opacity-75'
            }
        }
    }
</script>
