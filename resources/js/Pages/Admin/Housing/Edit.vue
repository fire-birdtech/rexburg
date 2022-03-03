<template>
    <admin-layout>
        <div class="max-w-5xl mx-auto bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6"></div>
        </div>
    </admin-layout>
</template>

<script>
    import AdminLayout from '@/Layouts/AdminLayout';

    export default {
        components: {
            AdminLayout,
        },
        props: {
            housing: Object,
        },
        mounted() {
            console.log(this.housing);
        }
    }
</script>