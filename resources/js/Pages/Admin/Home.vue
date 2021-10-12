<template>
    <app-layout>
        <div class="py-16">Hello, {{$page.props.user.name}}</div>
    </app-layout>
</template>

<script>
    import AppLayout from '@/Layouts/AppLayout';

    export default {
        components: {
            AppLayout,
        },
    }
</script>