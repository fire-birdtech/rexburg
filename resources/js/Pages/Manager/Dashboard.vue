<template>
    <app-layout title="Manager Dashboard">
        <div class="py-8">
            <div class="max-w-8xl mx-auto px-8">
                <h2 class="text-xl font-semibold text-gray-900">Hello, {{ $page.props.user.name.split(' ')[0] }}!</h2>
            </div>
        </div>
    </app-layout>
</template>

<script>
    import { defineComponent } from 'vue';
    import AppLayout from '@/Layouts/AppLayout';

    export default defineComponent({
        components: {
            AppLayout,
        },
        setup() {
            
        },
    })
</script>
