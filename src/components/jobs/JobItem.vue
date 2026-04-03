<template>
    <div v-if="isMobile" class="flex-fill">
        <div class="job-card card p-3 shadow-sm m-2" :data-job-id="job?.id" :class="{ 'focus': job?.id === jobStore.editJobItem?.id }">
            <h5>{{ job.company }}</h5>
            <p>{{ job.role }}</p>

            <div class="job-meta">
                <p>📅{{ getDate(job?.id) }}</p>
                <span class="badge" :class="{
                'bg-secondary': job?.status === 'applied',
                'bg-primary': job?.status === 'interview',
                'bg-danger': job?.status === 'rejected',
                'bg-success': job?.status === 'selected'
            }">
                <span class="text-capitalize fw-normal"><i class="bi" :class="{
                    'bi-send': job?.status === 'applied',
                    'bi-hourglass': job?.status === 'interview',
                    'bi-emoji-frown': job?.status === 'rejected',
                    'bi-check2-circle': job?.status === 'selected'
                }"></i> {{ job?.status }}</span>
            </span>
            </div>

            <div class="actions my-4">
               <div class="d-flex">
                <select v-model="job.status" class="form-select form-select-sm w-auto me-3 text-capitalize">
                    <option v-for="status of statusOptions" :value="status" :key="status" class="text-capitalize">
                        {{ status }}</option>
                </select>
                <button class="btn btn-primary btn-sm btn-circle  me-3" @click="jobStore.editJob(job)"
                    title="Edit Job"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-danger btn-sm btn-circle" title="Delete Job" data-bs-toggle="modal"
                    data-bs-target="#deleteModal"><i class="bi bi-x-lg"></i></button>

                <!-- Modal -->
                <div class="modal fade" id="deleteModal" tabindex="-1">
                    <div class="modal-dialog  modal-dialog-centered">
                        <div class="modal-content">

                            <div class="modal-header">
                                <h5 class="modal-title">Confirm Delete</h5>
                            </div>

                            <div class="modal-body">
                                Are you sure you want to delete this job?
                            </div>

                            <div class="modal-footer">
                                <button class="btn btn-secondary" data-bs-dismiss="modal">
                                    Cancel
                                </button>
                                <button class="btn btn-danger" data-bs-dismiss="modal"
                                    @click="jobStore.removeJob(job?.id)">
                                    Delete
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            </div>
        </div>
    </div>
    <tr v-else :data-job-id="job?.id" :class="{ 'focus': job?.id === jobStore.editJobItem?.id }">
        <td>{{ getDate(job?.id) }}</td>
        <td>
            <span class="text-capitalize">{{ job?.company }}</span>
        </td>
        <td>
            {{ job?.role }}
        </td>
        <td>
            <span class="badge" :class="{
                'bg-secondary': job?.status === 'applied',
                'bg-primary': job?.status === 'interview',
                'bg-danger': job?.status === 'rejected',
                'bg-success': job?.status === 'selected'
            }">
                <span class="text-capitalize fw-normal"><i class="bi" :class="{
                    'bi-send': job?.status === 'applied',
                    'bi-hourglass': job?.status === 'interview',
                    'bi-emoji-frown': job?.status === 'rejected',
                    'bi-check2-circle': job?.status === 'selected'
                }"></i> {{ job?.status }}</span>
            </span>
        </td>
        <td class="text-muted small">
            {{ job?.notes }}
        </td>
        <td>
            <div class="d-flex">
                <select v-model="job.status" class="form-select form-select-sm w-auto me-3 text-capitalize">
                    <option v-for="status of statusOptions" :value="status" :key="status" class="text-capitalize">
                        {{ status }}</option>
                </select>
                <button class="btn btn-primary btn-sm btn-circle  me-3" @click="jobStore.editJob(job)"
                    title="Edit Job"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-danger btn-sm btn-circle" title="Delete Job" data-bs-toggle="modal"
                    data-bs-target="#deleteModal"><i class="bi bi-x-lg"></i></button>

                <!-- Modal -->
                <div class="modal fade" id="deleteModal" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">

                            <div class="modal-header">
                                <h5 class="modal-title">Confirm Delete</h5>
                            </div>

                            <div class="modal-body">
                                Are you sure you want to delete this job?
                            </div>

                            <div class="modal-footer">
                                <button class="btn btn-secondary" data-bs-dismiss="modal">
                                    Cancel
                                </button>
                                <button class="btn btn-danger" data-bs-dismiss="modal"
                                    @click="jobStore.removeJob(job?.id)">
                                    Delete
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </td>
    </tr>


</template>

<script setup lang="ts">
import type { Job } from "@/types/jobs";
import { useJobStore } from '@/stores/useJobStore';
import { getDate } from '@/utils/formatDate'

const jobStore = useJobStore()
const props = defineProps<{
    job: Job,
    statusOptions: readonly string[],
    isMobile: Boolean
}>();
</script>

<style scoped>
.badge {
    font-size: 15px;
}

tr.focus td {
    background-color: lightblue;
}
</style>