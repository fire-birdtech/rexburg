<script setup>
import { defineComponent, h, ref } from 'vue';
import { Head, Link } from '@inertiajs/vue3';
import { Dialog, DialogPanel } from '@headlessui/vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';

import singleHousing from '../../images/single-housing.jpg';
import marriedHousing from '../../images/married-housing.jpg';

const mobileMenuOpen = ref(false);

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Resources', href: '#' },
  { name: 'Company', href: '#' },
];

defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String,
});
</script>

<template>
    <Head title="Welcome" />

    <div class="bg-slate-100 dark:bg-dots-lighter dark:bg-slate-900 selection:bg-sky-500 selection:text-white">
        <header class="absolute inset-x-0 top-0 z-50">
            <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 lg:py-10" aria-label="Global">
                <div class="flex lg:flex-1">
                    <a href="#" class="-m-1.5 p-1.5">
                        <span class="sr-only">RexburgGuru</span>
                        <svg viewBox="0 0 971 132" xmlns="http://www.w3.org/2000/svg" class="h-6 w-auto">
                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g transform="translate(-8.000000, -6.000000)" fill="#DBEDF3" fill-rule="nonzero">
                                    <path d="M32.9159003,108.091503 L32.9159003,79.0457516 C32.9159003,65.5294118 40.9811629,55.751634 55.9595076,55.751634 C57.9758232,55.751634 59.5600712,55.8954248 61.4323643,56.3267974 L61.4323643,32.6013072 C59.4160487,32.0261438 57.5437556,31.8823529 55.815485,31.8823529 C42.5654109,31.8823529 35.3642836,41.372549 32.9159003,53.7385621 L32.9159003,33.3202614 L8,33.3202614 L8,108.091503 L32.9159003,108.091503 Z M115.296796,109.529412 C129.411006,109.529412 139.924651,103.777778 145.973598,96.1568627 L135.027885,84.5098039 C129.555028,88.248366 124.082171,89.3986928 118.033225,89.3986928 C109.391872,89.3986928 102.910857,86.379085 99.8863839,80.3398693 L150.726342,80.3398693 C155.911154,44.9673203 133.011569,31.8823529 114.000593,31.8823529 C94.5575497,31.8823529 75.5465737,45.5424837 75.5465737,70.8496732 C75.5465737,95.4379085 94.2695046,109.529412 115.296796,109.529412 Z M128.834915,62.7973856 L99.0222486,62.7973856 C101.614654,55.751634 107.951646,52.5882353 114.288638,52.5882353 C120.62563,52.5882353 127.106645,55.751634 128.834915,62.7973856 Z M186.731979,108.091503 L200.990211,87.6732026 L215.392465,108.091503 L243.620884,108.091503 L215.248443,69.6993464 L240.596411,33.3202614 L212.512014,33.3202614 L200.990211,51.869281 L189.468407,33.3202614 L161.528033,33.3202614 L186.731979,69.6993464 L158.359537,108.091503 L186.731979,108.091503 Z M307.422872,109.529412 C324.129487,109.529412 342.852418,96.875817 342.852418,70.7058824 C342.852418,44.5359477 324.129487,31.8823529 307.422872,31.8823529 C294.31682,31.8823529 287.259715,39.0718954 286.683625,40.3660131 L286.251557,40.3660131 L286.251557,6 L261.335657,6 L261.335657,108.091503 L286.251557,108.091503 L286.251557,101.045752 L286.683625,101.045752 C287.259715,102.339869 294.31682,109.529412 307.422872,109.529412 Z M302.094037,87.5294118 C293.16464,87.5294118 285.675467,81.3464052 285.675467,70.7058824 C285.675467,60.0653595 293.16464,53.8823529 302.094037,53.8823529 C310.73539,53.8823529 318.368585,60.2091503 318.368585,70.7058824 C318.368585,81.2026144 310.73539,87.5294118 302.094037,87.5294118 Z M390.379858,109.529412 C400.317413,109.529412 407.374518,105.359477 411.695194,99.3202614 L411.695194,108.091503 L436.611095,108.091503 L436.755117,33.3202614 L411.839217,33.3202614 L411.695194,73.0065359 C411.695194,80.7712418 408.094631,87.5294118 399.741323,87.5294118 C391.243993,87.5294118 387.499407,80.7712418 387.499407,73.0065359 L387.643429,33.3202614 L362.727529,33.3202614 L362.583506,77.3202614 C362.583506,100.183007 375.25749,109.529412 390.379858,109.529412 Z M485.146692,108.091503 L485.146692,79.0457516 C485.146692,65.5294118 493.211955,55.751634 508.1903,55.751634 C510.206615,55.751634 511.790863,55.8954248 513.663156,56.3267974 L513.663156,32.6013072 C511.646841,32.0261438 509.774548,31.8823529 508.046277,31.8823529 C494.796203,31.8823529 487.595076,41.372549 485.146692,53.7385621 L485.146692,33.3202614 L460.230792,33.3202614 L460.230792,108.091503 L485.146692,108.091503 Z M568.679769,138 C585.242361,138 609.294126,131.673203 609.294126,101.333333 L609.294126,33.3202614 L584.378226,33.3202614 L584.378226,40.3660131 L583.514091,40.3660131 C582.938001,39.0718954 576.168941,31.8823529 563.494957,31.8823529 C546.644319,31.8823529 527.777366,44.6797386 527.777366,70.7058824 C527.777366,96.7320261 546.644319,109.529412 563.494957,109.529412 C576.168941,109.529412 582.938001,102.339869 583.514091,101.045752 L584.378226,101.045752 L584.378226,103.490196 C584.378226,110.679739 577.897212,117.437908 563.927025,117.437908 C558.0221,117.437908 550.532928,116.287582 546.932364,113.986928 L546.932364,133.686275 C551.973153,136.993464 561.046574,138 568.679769,138 Z M568.679769,87.5294118 C559.894393,87.5294118 552.261198,81.2026144 552.261198,70.7058824 C552.261198,60.2091503 559.894393,53.8823529 568.679769,53.8823529 C577.609166,53.8823529 584.954316,60.0653595 584.954316,70.7058824 C584.954316,81.3464052 577.609166,87.5294118 568.679769,87.5294118 Z M670.07164,138 C686.634233,138 710.685998,131.673203 710.685998,101.333333 L710.685998,33.3202614 L685.770098,33.3202614 L685.770098,40.3660131 L684.905963,40.3660131 C684.329872,39.0718954 677.560813,31.8823529 664.886829,31.8823529 C648.036191,31.8823529 629.169238,44.6797386 629.169238,70.7058824 C629.169238,96.7320261 648.036191,109.529412 664.886829,109.529412 C677.560813,109.529412 684.329872,102.339869 684.905963,101.045752 L685.770098,101.045752 L685.770098,103.490196 C685.770098,110.679739 679.289083,117.437908 665.318896,117.437908 C659.413972,117.437908 651.9248,116.287582 648.324236,113.986928 L648.324236,133.686275 C653.365025,136.993464 662.438446,138 670.07164,138 Z M670.07164,87.5294118 C661.286265,87.5294118 653.65307,81.2026144 653.65307,70.7058824 C653.65307,60.2091503 661.286265,53.8823529 670.07164,53.8823529 C679.001038,53.8823529 686.346188,60.0653595 686.346188,70.7058824 C686.346188,81.3464052 679.001038,87.5294118 670.07164,87.5294118 Z M761.814002,109.529412 C771.751557,109.529412 778.808662,105.359477 783.129338,99.3202614 L783.129338,108.091503 L808.045239,108.091503 L808.189261,33.3202614 L783.273361,33.3202614 L783.129338,73.0065359 C783.129338,80.7712418 779.528775,87.5294118 771.175467,87.5294118 C762.678137,87.5294118 758.933551,80.7712418 758.933551,73.0065359 L759.077573,33.3202614 L734.161673,33.3202614 L734.017651,77.3202614 C734.017651,100.183007 746.691635,109.529412 761.814002,109.529412 Z M856.580837,108.091503 L856.580837,79.0457516 C856.580837,65.5294118 864.646099,55.751634 879.624444,55.751634 C881.640759,55.751634 883.225007,55.8954248 885.097301,56.3267974 L885.097301,32.6013072 C883.080985,32.0261438 881.208692,31.8823529 879.480421,31.8823529 C866.230347,31.8823529 859.02922,41.372549 856.580837,53.7385621 L856.580837,33.3202614 L831.664936,33.3202614 L831.664936,108.091503 L856.580837,108.091503 Z M932.62474,109.529412 C942.562296,109.529412 949.619401,105.359477 953.940077,99.3202614 L953.940077,108.091503 L978.855977,108.091503 L979,33.3202614 L954.0841,33.3202614 L953.940077,73.0065359 C953.940077,80.7712418 950.339513,87.5294118 941.986206,87.5294118 C933.488876,87.5294118 929.74429,80.7712418 929.74429,73.0065359 L929.888312,33.3202614 L904.972412,33.3202614 L904.828389,77.3202614 C904.828389,100.183007 917.502373,109.529412 932.62474,109.529412 Z" id="rexburgguru"></path>
                                </g>
                            </g>
                        </svg>
                    </a>
                </div>
                <div class="flex lg:hidden">
                    <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
                        <span class="sr-only">Open main menu</span>
                        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div class="hidden lg:flex lg:gap-x-12">
                    <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-sm font-semibold leading-6 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">{{ item.name }}</a>
                </div>
                <div class="hidden lg:flex lg:items-center lg:flex-1 lg:justify-end lg:space-x-6">
                    <Link v-if="$page.props.auth.user" :href="route('login')" class="text-sm font-semibold leading-6 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">Dashboard <span aria-hidden="true">&rarr;</span></Link>
                    <template v-else>
                        <Link :href="route('register')" class="rounded-md bg-[#B3D9E6] px-3.5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-[#DBEDF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">Register</Link>
                        <Link :href="route('login')" class="text-sm font-semibold leading-6 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">Log in <span aria-hidden="true">&rarr;</span></Link>
                    </template>
                </div>
            </nav>
        </header>

        <main class="isolate">
            <div class="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-slate-400/20 pt-14">
                <div class="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
                    <div class="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
                        <h1 class="max-w-2xl text-4xl font-bold tracking-tight text-zinc-100 sm:text-6xl lg:col-span-2 xl:col-auto">
                            We're changing the way students enjoy Rexburg.
                        </h1>
                        <div class="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                            <p class="text-lg leading-8 text-slate-300">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua. Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.</p>
                        </div>
                        <div class="mt-10 aspect-[6/5] max-w-lg space-y-6 sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2">
                            <a
                                href="#"
                                class="scale-100 p-6 bg-white dark:bg-slate-800/50 dark:bg-gradient-to-bl from-slate-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-slate-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-sky-500"
                            >
                                <img class="absolute inset-0 h-full w-full rounded-lg object-cover brightness-50 saturate-40" :src="singleHousing" alt="" />
                                <div class="hidden md:absolute md:bottom-16 md:left-[50rem] md:block md:transform-gpu md:blur-3xl" aria-hidden="true">
                                    <div class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-25" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
                                </div>
                                <div class="relative flex">
                                    <div class="pt-16">
                                        <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Single Housing</h2>

                                        <p class="mt-4 font-medium text-slate-300 dark:text-slate-300 text-sm leading-relaxed">
                                            Find BYU-I approved housing for single students. You can get private 
                                            rooms or apartments ranging from 4-8 people.
                                        </p>
                                    </div>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        class="self-center shrink-0 stroke-sky-200 w-6 h-6 mx-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                        />
                                    </svg>
                                </div>
                            </a>
                            <a
                                href="#"
                                class="scale-100 p-6 bg-white dark:bg-slate-800/50 dark:bg-gradient-to-bl from-slate-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-slate-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-sky-500"
                            >
                                <img class="absolute inset-0 h-full w-full rounded-lg object-cover brightness-50 saturate-40" :src="marriedHousing" alt="" />
                                <div class="hidden md:absolute md:bottom-16 md:left-[50rem] md:block md:transform-gpu md:blur-3xl" aria-hidden="true">
                                    <div class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-25" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
                                </div>
                                <div class="relative flex">
                                    <div class="pt-16">
                                        <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Married Housing</h2>

                                        <p class="mt-4 font-medium text-slate-300 dark:text-slate-300 text-sm leading-relaxed">
                                            Married housing is crucial, but difficult to find. We're making it easier. 
                                            You can find different sizes and amenities.
                                        </p>
                                    </div>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        class="self-center shrink-0 stroke-sky-200 w-6 h-6 mx-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                        />
                                    </svg>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<style>
.bg-dots-darker {
    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
}
@media (prefers-color-scheme: dark) {
    .dark\:bg-dots-lighter {
        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
    }
}
</style>
