<script setup>
import { ref } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { Link } from '@inertiajs/vue3';
import { UserGroupIcon } from'@heroicons/vue/24/solid';
import Stars from '@/Components/Stars.vue';
import HousingCard from '@/Components/HousingCard.vue';

const props = defineProps({
    housings: Array,
    canLogin: Boolean,
    canRegister: Boolean,
    type: String,
});

const description = ref(`Find the perfect ${props.type} student housing for you.`);

if (props.type === 'single') {
    description.value += " Each housing has great features and amenities."
} else if (props.type === 'married') {
    description.value += " Starting your life together made easier.";
}
</script>

<template>
    <app-layout title="Student Housing" :description="description" :canLogin="canLogin" :canRegister="canRegister">
        <div class="xl:overflow-y-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <main class="grid gap-4 md:grid-cols-2 lg:gap-5 lg:grid-cols-4 py-8">
                <HousingCard v-for="(housing, index) in housings" :key="index" :housing="housing" />
            </main>
        </div>
    </app-layout>
</template>