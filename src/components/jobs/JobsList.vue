<template>
    <div class="row m-0 gx-5">
        <div :class="(showForm || jobStore.editJobItem) ? 'col-9' : 'col-12'" class="ps-0">
            <div v-if="jobStore.isLoading" class="table-skeleton">
                <div v-for="i in 3" :key="i" class="skeleton-loader mb-2"></div>
            </div>
            <div v-else="jobStore.isLoading">
                <div v-if="jobStore.jobs.length === 0" class="text-center mt-5">

                    <div style="font-size: 48px;">🚀</div>

                    <h5 class="mt-3">Start Your Job Journey</h5>

                    <p class="text-muted">
                        Add your first job application to begin tracking your progress
                    </p>

                </div>
                <div v-else class="table-view">
                    <div class="d-flex gap-3 mb-3 table-header">
                        <h5 class="d-flex align-items-center mb-0">Your Applications:</h5>

                        <div class="ms-auto h-100">
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

                        <div class="d-flex align-items-center gap-2 ">
                            <i class="bi bi-funnel"></i>
                            <span>Filter:</span>
                            <select v-model="jobStore.selectedStatus"
                                class="form-select h-100 form-select-sm w-auto me-3 text-capitalize">
                                <option value="">All</option>
                                <option v-for="status of statusOptions" :value="status" :key="status"
                                    class="text-capitalize">
                                    {{ status }}</option>
                            </select>
                            <button class="btn btn-success ms-auto" title="Export to Excel" @click="exportToExcel">
                                <i class="bi bi-file-earmark-arrow-down"></i> Export to Excel
                            </button>
                            <button type="button" aria-hidden="false" v-if="!showForm && !jobStore.editJobItem"
                                class="btn btn-primary ms-3" @click="showForm = true"><i class="bi bi-plus"></i><span>
                                    Add Job </span></button>
                        </div>
                    </div>

                    <div class="job-list-wrapper">

                        <table class="table align-middle my-4">
                            <thead class="table-light sticky-top">
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
                                    :statusOptions="statusOptions"></job-item>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </div>
        <div class="col-3 pe-0">
            <job-form v-if="showForm || jobStore.editJobItem" @close="showForm = !showForm"
                :editJobData="editJobData" />
        </div>
    </div>
</template>

<script setup lang="ts">
import JobItem from '@/components/jobs/JobItem.vue';
import JobForm from '@/components/jobs/JobForm.vue';
import { onMounted, ref, watch } from 'vue'
import { useJobStore } from '@/stores/useJobStore';
import { getDate } from '@/utils/formatDate'
import * as XLSX from 'xlsx'

const searchInput = ref('')
const showForm = ref(true)
const editJobData = ref()
const jobStore = useJobStore()

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



function exportToExcel() {
    const data = jobStore.finalJobs.map(job => ({
        Date: getDate(job.id),
        Company: job.company,
        Role: job.role,
        Status: job.status,
        Notes: job.notes
    }))

    const worksheet = XLSX.utils.json_to_sheet(data)
    worksheet['!cols'] = [
        { wch: 20 }, // Company
        { wch: 20 }, // Role
        { wch: 15 }, // Status
        { wch: 15 }, // Date
        { wch: 30 }  // Notes
    ]
    const workbook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Jobs')

    XLSX.writeFile(workbook, 'jobs.xlsx')
}

onMounted(() => {
    console.log(jobStore.jobs.length)
    jobStore.loadJobs()
    searchInput.value = jobStore.searchQuery
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

    th:nth-child(1) {
        width: 15%
    }

    th:nth-child(2) {
        width: 18%
    }

    th:nth-child(3) {
        width: 15%
    }

    th:nth-child(4) {
        width: 15%
    }

    th:nth-child(5) {
        width: 15%
    }

    th:nth-child(6) {
        width: 21%
    }

    td {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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

.job-list-wrapper {
    max-height: 422px;
    overflow-y: auto;
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
</style>