<template>
    <app-layout title="Verify your claim">
        <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 class="mt-6 text-center text-2xl font-extrabold text-gray-900">Verify your claim</h2>
            </div>

            <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form class="space-y-6" action="#" method="POST">
                        <div>
                            <label class="block text-sm font-medium text-gray-700"> Verification code </label>
                            <div class="mt-1">
                                <input type="text" v-model="form.verification_code" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
                                <jet-input-error :message="$page.props.errors?.updateClaim?.message" class="mt-1" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" @click.prevent="verify" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Verify</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </app-layout>
</template>

<script>
    import AppLayout from '@/Layouts/AppLayout.vue';
    import JetInputError from '@/Jetstream/InputError.vue';

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