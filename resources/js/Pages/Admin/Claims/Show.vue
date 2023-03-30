<template>
    <admin-layout :title="claim.claimable.name">
        <div class="py-4">
            <div class="max-w-8xl mx-auto px-8">
                <div class="md:flex md:items-center md:justify-between">
                    <div class="flex-1 min-w-0">
                        <h2 class="text-xl font-medium leading-7 text-gray-900 sm:truncate">Claim for {{ claim.claimable.name }}</h2>
                        <p class="mt-1 max-w-2xl text-sm text-gray-500">Created {{ convertDate(claim.created_at) }}</p>
                    </div>
                    <div class="mt-4 flex md:mt-0 md:ml-4">
                        <template v-if="claim.status === 'pending'">
                            <button type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500" @click="rejectClaim">Reject</button>
                            <button type="button" class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500" @click="approveClaim">Approve</button>
                        </template>
                        <template v-if="claim.status === 'approved'">
                            <span class="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium border border-green-500 bg-green-100 text-green-800">
                                <CheckCircleIcon class="-ml-0.5 mr-1.5 h-6 w-6 text-green-500" />
                                Approved
                            </span>
                        </template>
                    </div>
                    
                </div>
                <div class="mt-6 grid grid-cols-3 gap-x-4">
                    <div class="bg-white shadow overflow-hidden col-span-2 sm:rounded-lg">
                        <div class="px-4 py-5 sm:px-6">
                            <h3 class="text-lg leading-6 font-medium text-gray-900">Claim Information</h3>
                        </div>
                        <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
                            <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">Name</dt>
                                    <dd class="mt-1 text-sm text-gray-900">{{ claim.claimable.name }}</dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">User Provided Address</dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        <div>{{ claim.street_address }}, {{ claim.city }}, Idaho {{ claim.postal_code }}</div>
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">Verification Code</dt>
                                    <dd class="mt-1 text-sm text-gray-900">{{ claim.verification_code }}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <div class="bg-white shadow overflow-hidden col-span-1 sm:rounded-lg">
                        <div class="px-4 py-5 sm:px-6">
                            <h3 class="text-lg leading-6 font-medium text-gray-900">User Information</h3>
                        </div>
                        <div class="border-t border-gray-200 space-y-8 px-4 py-5 sm:px-6">
                            <div>
                                <dt class="text-sm font-medium text-gray-500">Name</dt>
                                <dd class="mt-1 text-sm text-gray-900">{{ claim.user.name }}</dd>
                            </div>
                            <div>
                                <dt class="text-sm font-medium text-gray-500">Email</dt>
                                <dd class="mt-1 text-sm text-gray-900">{{ claim.user.email }}</dd>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </admin-layout>
</template>

<script>
    import { defineComponent } from "vue";
    import AdminLayout from '@/Layouts/AdminLayout.vue';
    import { convertDate } from '@/Utils/convertDate';
    import { CheckCircleIcon } from '@heroicons/vue/outline';

    export default defineComponent({
        props: {
            claim: Object
        },
        components: {
            AdminLayout,
            CheckCircleIcon,
        },
        methods: {
            convertDate,
            approveClaim() {
                this.$inertia.post(route('admin.claims.approve', [this.claim.id]));
            },
            rejectClaim() {
                this.$inertia.delete(route('admin.claims.reject', [this.claim.id]));
            },
        },
    })
</script>