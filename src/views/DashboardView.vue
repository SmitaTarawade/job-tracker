<script setup lang="ts">
import JobStats from '@/components/dashboard/JobStats.vue';
import { useJobStore } from '@/stores/useJobStore';
import FooterSection from '@/components/shared/Footer.vue';
import { onMounted } from 'vue'
import Navigation from '@/components/shared/Navigation.vue';
import { useHead } from '@vueuse/head'

useHead({
    title: 'Dashboard | Job Tracker',
    meta: [
        {
            name: 'description',
            content: 'Track your job applications'
        }
    ]
})
const jobStore = useJobStore()
onMounted(() => {
    jobStore.loadJobs()
})
</script>

<template>
    <div>
        <navigation />
        <div class="my-5 px-5 main-wrapper">
            <div class="row m-0 p-0 ">
                <div class="col-12 p-0">
                    <div v-if="jobStore.isLoading" class="d-flex justify-content-center align-items-center"
                        style="height: 50vh;">
                        <div class="spinner-border text-primary"></div>
                    </div>
                    <div v-else-if="!jobStore.isLoading && !jobStore.jobs.length"
                        class="h-100 m-0 p-2 rounded d-flex justify-content-center align-items-center main-wrapper">
                        <div class="w-100">
                            <div>
                                <div class="text-center">
                                    <h1>📆</h1>
                                    <h5 class="my-2">We don’t have enough data yet.</h5>
                                    <p class="mb-3">Start by adding your first job application.</p>
                                </div>
                            </div>
                            <div class="text-center my-4">
                                <router-link :to="{ path: '/jobs', query: { showForm: 'true' } }"
                                    class="btn btn-md btn-primary">
                                    + Add Job
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div v-else="!jobStore.isLoading && jobStore.jobs.length"
                        class="alert mb-4 alert-primary text-white p-4 rounded d-flex justify-content-between align-items-center shadow-sm"
                        style="background: linear-gradient(135deg, #4e73df, #1cc88a);">
                        <div class="d-flex align-items-center icon-card">
                            <div class="me-md-3 mb-md-0 mb-3">
                                <h3 class="mb-0">📆</h3>
                            </div>
                            <div>
                                <h5 class="mb-1">Your Job Search Dashboard </h5>
                                <p class="mb-0">Track applications, monitor progress, and stay consistent in your job
                                    search.</p>
                            </div>
                        </div>
                        <router-link  :to="{ path: '/jobs', query: { showForm: 'true' } }" class="btn btn-light">
                            + Add Job
                        </router-link>
                    </div>
                </div>
            </div>
            <div v-if="!jobStore.isLoading && jobStore.jobs.length" class="row">
                <!-- LEFT: Form -->
                <div class="col-12 p-0">
                    <div>
                        <job-stats />
                    </div>
                </div>
            </div>
        </div>
        <footer-section />
    </div>
</template>

<style>
@media (max-width: 768px) {
    .alert-primary {
        flex-direction: column;

        .btn {
            margin: 24px 0 0;
            width: 100%
        }
    }

    .icon-card {
        flex-direction: column;
    }
}
</style>