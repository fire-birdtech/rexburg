<template>
    <div
        @input="onInput"
        v-html="innerValue"
        contenteditable="true"
        class="prose-lg text-base h-52 w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-2 focus:border-sky-500 overflow-y-auto"
    ></div>
</template>

<script>
    export default {
        props: ["value"],
        data() {
            return {
                innerValue: this.value,
            };
        },
        methods: {
            onInput(event) {
                this.$emit("input", event);
            },
        },
        mounted() {
            document.execCommand("defaultParagraphSeparator", false, "p");
        },
    }
</script>