<template>
    <app-layout title="Manager Dashboard">
        <div class="py-8">
            <div class="max-w-8xl mx-auto px-8">
                <h2 class="text-xl font-semibold text-gray-900">Hello, {{ $page.props.user.name.split(' ')[0] }}!</h2>
                <div class="mt-8">
                    <div v-if="manages.length">
                        <h2>My properties</h2>
                        <div class="py-3 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <DashboardReviewable v-for="housing in manages" :key="housing.id" :image="housing.manageable.cover_image_url" :name="housing.manageable.name" :slug="housing.manageable.slug" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </app-layout>
</template>

<script>
    import { defineComponent } from 'vue';
    import AppLayout from '@/Layouts/AppLayout.vue';
    import DashboardReviewable from '@/Components/DashboardReviewable.vue';

    export default defineComponent({
        components: {
            AppLayout,
            DashboardReviewable,
        },
        props: {
            manages: Array,
        },
        setup() {
            
        },
    })
</script>
