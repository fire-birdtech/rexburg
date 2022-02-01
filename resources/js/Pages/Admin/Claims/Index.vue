<template>
    <app-layout title="Admin Claims">
        <div class="py-12 px-4 md:px-0">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <h2>Claims</h2>
                <div class="py-4 flex flex-col">
                    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Claimable Name
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Claimed By
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Claimed By Email
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Verification Code
                                            </th>
                                            <!-- <th scope="col" class="relative px-6 py-3">
                                            <span class="sr-only">Edit</span>
                                            </th> -->
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(claim, claimIdx) in claims" :key="claim.id" :class="claimIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {{ claim.claimable.name }}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {{ claim.user.name }}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {{ claim.user.email }}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <template v-if="claim.status === 'pending'">
                                                    <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                                        Pending
                                                    </span>
                                                </template>
                                                <template v-if="claim.status === 'claimed'">
                                                    <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                        Claimed
                                                    </span>
                                                </template>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {{ claim.verification_code }}
                                            </td>
                                            <!-- <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                                            </td> -->
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </app-layout>
</template>

<script>
    import AppLayout from '@/Layouts/AppLayout';

    export default {
        components: {
            AppLayout,
        },
        props: {
            claims: Array,
        },
        mounted() {
            console.log(this.claims);
        },
    }
</script>