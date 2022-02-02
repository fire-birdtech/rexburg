<template>
    <app-layout title="Verify your claim">
        <div class="max-w-7xl mx-auto py-12 flex flex-col items-center">
            <h2 class="text-lg font-medium leading-7">Verify your claim</h2>
            <form class="mt-8 flex flex-col items-center">
                <input type="text" v-model="form.verification_code" class="max-w-lg block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:max-w-sm border-gray-300 rounded-md" placeholder="Enter your verification code" />
                <jet-input-error :message="$page.props.errors?.updateClaim?.message" class="mt-1" />
                <button type="submit" @click.prevent="verify" class="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                    Verify
                </button>
            </form>
        </div>
    </app-layout>
</template>

<script>
    import AppLayout from '@/Layouts/AppLayout';
    import JetInputError from '@/Jetstream/InputError';

    export default {
        components: {
            AppLayout,
            JetInputError,
        },
        data() {
            return {
                form: this.$inertia.form({
                    _method: 'patch',
                    verification_code: '',
                }),
            }
        },
        methods: {
            verify() {
                this.form.post(route('claims.verify.update'), {
                    errorBag: 'updateClaim'
                });
            },
        },
    }
</script>