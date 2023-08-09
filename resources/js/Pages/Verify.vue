<template>
    <app-layout title="Verify your claim">
        <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 class="mt-6 text-center text-2xl font-extrabold text-gray-900">Verify your claim</h2>
            </div>

            <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div class="bg-slate-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form class="space-y-6" action="#" method="POST">
                        <div>
                            <InputLabel for="verification_code" value="Verification code" />

                            <TextInput
                                id="verification_code"
                                type="text"
                                class="mt-1 block w-full"
                                v-model="form.verification_code"
                                required
                                autofocus
                            />

                            <InputError class="mt-2" :message="form.errors?.message" />
                        </div>

                        <div>
                            <PrimaryButton type="submit" @click.prevent="verify" class="w-full flex justify-center">Verify</PrimaryButton>
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
    import InputLabel from '@/Components/InputLabel.vue';
    import InputError from '@/Components/InputError.vue';
    import TextInput from '@/Components/TextInput.vue';
    import PrimaryButton from '@/Components/PrimaryButton.vue';

    export default {
        components: {
            AppLayout,
            JetInputError,
            InputLabel,
            InputError,
            TextInput,
            PrimaryButton,
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
