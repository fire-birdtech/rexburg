<script setup>
import { Link } from "@inertiajs/vue3";

defineProps({
    type: {
        type: String,
        default: 'submit',
    },
    as: String,
    href: String,
});

const classes = 'rounded-md bg-[#B3D9E6] px-3.5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-[#DBEDF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:cursor-not-allowed disabled:bg-opacity-80 transition ease-in-out duration-150';
</script>

<template>
    <Link
        v-if="as === 'link'"
        :class="classes"
        :href="href"
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
