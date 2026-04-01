<script setup lang="ts">
import JobStats from '@/components/dashboard/JobStats.vue';
</script>

<template>
    <div>
         <div class="row m-0 mb-3 p-0">
            <div class="col-12">
                <div class="alert my-2 alert-primary text-white p-4 rounded d-flex justify-content-between align-items-center shadow-sm"
                    style="background: linear-gradient(135deg, #4e73df, #1cc88a);">
                    <div class="d-flex align-items-center">
                        <div class="me-3">
                            <h3 class="mb-0">📆</h3>
                        </div>
                        <div>
                            <h5 class="mb-1">Your Job Search Dashboard </h5>
                            <p class="mb-0">Track applications, monitor progress, and stay consistent in your job
                                search.</p>
                        </div>
                    </div>
                    <router-link to="/jobs" class="btn btn-light">
                        + Add Job
                    </router-link>
                </div>
            </div>
        </div>

        <div class="row">
            <!-- LEFT: Form -->
            <div class="col-md-12">
                <div>
                    <job-stats />
                </div>
            </div>
        </div>
    </div>
</template>