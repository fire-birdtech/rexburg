<script setup>
defineProps({
    type: {
        type: String,
        default: 'submit',
    },
});
</script>

<template>
    <button
        :type="type"
        class="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-red-50 shadow-md hover:bg-opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 transition ease-in-out duration-150"
    >
        <slot />
    </button>
</template>
