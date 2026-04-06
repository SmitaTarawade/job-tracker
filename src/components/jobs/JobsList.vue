<template>
    <div class="m-0">
        <div>
            <div v-if="jobStore.isLoading" class="table-skeleton">
                <div v-for="i in 3" :key="i" class="skeleton-loader mb-2"></div>
            </div>
            <div v-else-if="!jobStore.isLoading && jobStore.jobs.length === 0"
                class="h-100 m-0 p-2 rounded d-flex justify-content-center align-items-center main-wrapper">
                <div class="w-100">
                    <div>
                        <div class="text-center">
                            <h1>💼</h1>
                            <h5 class="my-2">Start Your Job Journey</h5>
                            <p class="mb-3">Start by adding your first job application.</p>
                        </div>

                        <div class="text-center my-4">
                            <button type="button" title="Add Job" class="btn btn-primary ms-3"
                                @click="showForm = true"><i class="bi bi-plus"></i><span>
                                    Add Job </span></button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else-if="!jobStore.isLoading && jobStore.jobs.length" class="table-view">
                <h5 class="d-flex align-items-center mb-3">Your Applications:</h5>
                <div class="d-flex gap-3 mb-1 table-header ">

                    <div class="ms-auto h-100 search-input">
                        <div class="position-relative">
                            <i class="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3"></i>
                            <input v-model="searchInput" type="text" class="form-control search-input ps-5"
                                placeholder="Search jobs..." />
                            <button v-if="searchInput" @click="searchInput = ''"
                                class="btn btn-sm position-absolute end-0 top-50 translate-middle-y">
                                <i class="bi bi-x position-absolute top-50 end-50 translate-middle-y me-3"></i>
                            </button>
                        </div>
                    </div>

                    <div class="d-flex align-items-center gap-3 filter-group">
                        <div class="filter-input d-flex h-100">
                            <span class="d-sm-flex align-items-center d-none"> <i class="bi bi-funnel"></i>
                                Filter:</span>
                            <select v-model="jobStore.selectedStatus"
                                class="form-select h-100 form-select-sm w-auto mx-3 text-capitalize">
                                <option value="">All</option>
                                <option v-for="status of statusOptions" :value="status" :key="status"
                                    class="text-capitalize">
                                    {{ status }}</option>
                            </select>
                        </div>
                        <div class="btns w-100">
                            <button class="btn btn-success ms-auto export-btn" title="Export to Excel"
                                @click="useExportExcel()">
                                <i class="bi bi-file-earmark-arrow-down"></i> Export to Excel
                            </button>
                            <button type="button" title="Add Job" class="btn btn-primary ms-3 add-btn"
                                @click="showForm = true"><i class="bi bi-plus"></i><span>
                                    Add Job </span></button>
                        </div>

                    </div>
                </div>

                <div class="job-list-wrapper">
                    <div v-if="isMobile" class="d-flex my-4 flex-wrap gap-3">
                        <job-item v-for="job in jobStore.finalJobs" :key="job.id" :job="job" :is-mobile="isMobile"
                            :statusOptions="statusOptions"></job-item>
                    </div>
                    <table v-else class="table table-responsive align-middle my-4">
                        <thead class="table-light">
                            <tr>
                                <th @click="sortColumn('id')">Date {{ getSortIcon('date') }}</th>
                                <th @click="sortColumn('company')">Company {{ getSortIcon('company') }}</th>
                                <th @click="sortColumn('role')">Role {{ getSortIcon('role') }}</th>
                                <th @click="sortColumn('status')">Status {{ getSortIcon('status') }}</th>
                                <th>Notes</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="!jobStore.finalJobs">
                                <td colspan="6">
                                    <p class="text-center text-muted mt-4"> No jobs found in this category.</p>
                                </td>
                            </tr>
                            <job-item v-else v-for="job in jobStore.finalJobs" :key="job.id" :job="job"
                                :is-mobile="isMobile" :statusOptions="statusOptions"></job-item>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div v-if="showForm" class="modal-overlay" @close="showForm = !showForm">
            <div class="modal-box w-100">
                <job-form v-if="showForm || jobStore.editJobItem" :editJobData="editJobData"
                    @close="showForm = !showForm" />
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import JobItem from '@/components/jobs/JobItem.vue';
import JobForm from '@/components/jobs/JobForm.vue';
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useJobStore } from '@/stores/useJobStore';
import { useExportExcel } from '@/composables/useExportExcel';
import { useRoute } from 'vue-router'
const searchInput = ref('')
const showForm = ref(false)
const editJobData = ref()
const jobStore = useJobStore()
let isMobile = ref<Boolean>(false)
const route = useRoute()

const statusOptions = ["applied", "interview", "rejected", "selected"] as const;

function sortColumn(field: 'id' | 'company' | 'role' | 'status') {
    if (jobStore.sortBy === field) {
        jobStore.sortOrder = (jobStore.sortOrder === 'asc') ? 'des' : 'asc';
    } else {
        jobStore.sortBy = field
        jobStore.sortOrder = 'asc'
    }
}

function getSortIcon(field: string) {
    if (jobStore.sortBy !== field)
        return '↑↓';
    else {
        return jobStore.sortOrder === 'asc' ? '↑' : '↓'
    }
}


function checkScreenSize() {
    isMobile.value = window.innerWidth <= 768
}


onMounted(() => {
    jobStore.loadJobs()
    searchInput.value = jobStore.searchQuery
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    showForm.value = route.query.showForm === 'true'
})
onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize)
})
let timeout: any = null

watch(searchInput, (newSearchInput) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
        jobStore.searchQuery = newSearchInput
    }, 500)
})
watch(() => jobStore.editJobItem, (newJob) => {
    if (newJob) {
        showForm.value = true
    }
}, { immediate: true })


</script>

<style>
table {
    table-layout: fixed;
    width: 100%;
    border-radius: 8px;

    th {
        background-color: white !important;
    }

    td {
        vertical-align: middle;
    }
}

table tbody tr {
    height: 60px;
}

th:hover {
    cursor: pointer;
    background-color: lightgrey;
}

.badge {
    font-size: 1rem;
}

.skeleton-loader {
    height: 30px;
    width: 100%;
    background: linear-gradient(90deg,
            #e0e0e0 25%,
            #f5f5f5 50%,
            #e0e0e0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
}

@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }

    100% {
        background-position: 200% 0;
    }
}

.search-input {
    height: 43px;
}

.job-list-wrapper {
    max-width: 100%;
    overflow-x: auto;
}

@media (max-width: 820px) {
    .job-list-wrapper {
        overflow-x: hidden;
    }

    .table-header {
        flex-direction: column;

        .search-input {
            width: 100%;
        }

        .filter-input,
        .filter-group {
            flex-direction: column;
            width: 100%;

            select {
                margin: 0 !important;
            }
        }

        .btn-group {
            width: 100%;
        }
    }
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99999;
    display: flex;
    justify-content: center;
    align-items: center;
}

@media (max-width: 767px) {
    .btns {
        display: flex;
        flex-direction: column-reverse;
    }

    .export-btn {
        width: 100%;
    }

    .add-btn {
        width: 100%;
        margin: 10px 0 !important;
    }
}
</style>