<script setup>
import { Link } from '@inertiajs/vue3';

defineProps({
    type: {
        type: String,
        default: 'button',
    },
    href: String,
});

// const classes = 'inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150';
const classes = 'px-4 py-2 text-sm font-semibold leading-6 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition ease-in-out duration-150';
</script>

<template>
    <Link
        v-if="href !== undefined"
        :href="href"
        :class="classes"
    >
        <slot />
    </Link>
    <button
        v-else
        :type="type"
        :class="classes"
    >
        <slot />
    </button>
</template>
