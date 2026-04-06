<template>
    <div v-if="isMobile" class="flex-fill">
        <div class="job-card card p-3 shadow-sm " :data-job-id="job?.id"
            :class="{ 'focus': job?.id === jobStore.editJobItem?.id }">
            <h5 class="text-capitalize">{{ job.company }}</h5>
            <p class="text-capitalize">{{ job.role }}</p>

            <!-- Notes (toggle) -->
            <div class="notes mb-3">
                <div>
                    <!-- Notes toggle button -->
                    <button @click="toggleNotes(job.id)" class="icon-btn btn btn-link btn-sm">
                        <span v-if="openNotes !== job.id"> <i class="bi bi-plus"></i> View Notes</span>
                        <span v-else> <i class="bi bi-dash"></i> Hide Notes</span>
                    </button>
                </div>
                <div v-if="openNotes === job.id" class="notes">
                    {{ job.notes || 'No notes added' }}
                </div>
            </div>

            <div class="job-meta d-flex justify-content-between">
                <span>📅 {{ getDate(job?.id) }}</span>
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

            <div class="actions">
                <hr>
                <div class="d-flex justify-content-between">
                    <select v-model="job.status" class="form-select form-select-sm w-auto me-3 text-capitalize">
                        <option v-for="status of statusOptions" :value="status" :key="status" class="text-capitalize">
                            {{ status }}</option>
                    </select>
                    <div class="btn-group">
                        <button class="btn btn-primary btn-sm btn-circle  me-2" @click="jobStore.editJob(job)"
                            title="Edit Job"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-danger btn-sm btn-circle" title="Delete Job" data-bs-toggle="modal"
                            data-bs-target="#deleteModal"><i class="bi bi-x-lg"></i></button>

                    </div>

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
import { ref } from 'vue'
const jobStore = useJobStore()
const props = defineProps<{
    job: Job,
    statusOptions: readonly string[],
    isMobile: Boolean
}>();
let openNotes = ref<Number | null>(null)

function toggleNotes(id: number) {
    console.log(id)
    openNotes.value = openNotes.value === id ? null : id
}
</script>

<style scoped>
.badge {
    font-size: 15px;
}

tr.focus td {
    background-color: lightblue;
}

.notes {
    font-size: 1rem;
    color: #555;
    background: #f9f9f9;
    padding: 10px;
    border-radius: 8px;
}
</style>