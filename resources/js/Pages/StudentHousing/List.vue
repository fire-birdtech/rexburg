<template>
    <app-layout :canLogin="canLogin" :canRegister="canRegister">
        <div class="xl:overflow-y-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <main class="grid gap-4 md:grid-cols-2 lg:gap-5 lg:grid-cols-4 py-8">
                <HousingCard v-for="(housing, index) in housings" :key="index" :housing="housing" />
            </main>
        </div>
    </app-layout>
</template>

<script>
    import AppLayout from '@/Layouts/AppLayout.vue';
    import { Link } from '@inertiajs/inertia-vue3';
    import { UserGroupIcon } from'@heroicons/vue/solid';
    import Stars from '@/Components/Stars';
    import HousingCard from '@/Components/HousingCard';
    
    export default {
        components: {
            AppLayout,
            HousingCard,
            Link,
            Stars,
            UserGroupIcon,
        },
        props: {
            housings: Array,
            canLogin: Boolean,
            canRegister: Boolean,
        },
    }
</script>