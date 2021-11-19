<template>
    <div>
        <button :class="classes" class="w-full text-left" v-if="as == 'button'">
            <slot></slot>
        </button>

        <Link :href="href" :class="classes" v-else>
            <slot />
        </Link>
    </div>
</template>

<script>
    import { Link } from '@inertiajs/inertia-vue3';

    export default {
        components: {
            Link,
        },
        props: ['active', 'href', 'as'],

        computed: {
            classes() {
                return this.active
                    ? 'block pl-3 pr-4 py-2 border-l-4 border-sky-400 text-base font-medium text-sky-700 bg-sky-50 focus:outline-none focus:text-sky-800 focus:bg-sky-100 focus:border-sky-700 transition'
                    : 'block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-50 hover:text-gray-300 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition'
            }
        }
    }
</script>
