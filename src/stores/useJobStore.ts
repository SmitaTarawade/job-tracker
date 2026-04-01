import { ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Job, JobStatus } from "../types/jobs";
import { useToast } from "vue-toastification"

export const useJobStore = defineStore('jobStore', () => {
    //State
    const jobs = ref<Job[]>([])
    const selectedStatus = ref<JobStatus | ''>('');
    const editJobItem = ref<Job | null>(null)
    const toast = useToast()

    let sortBy = ref<'id' | 'company' | 'role' | 'status'>('id')
    let sortOrder = ref('desc')

    let isLoading = ref(false);

    let searchQuery = ref<string>('');
    //Actions
    const addJob = (job: Job) => {
        try {
            jobs.value.push(job)
            toast.success("Job added successfully")
        } catch (error) {
            toast.error("Failed to add job")
        }
    }

    const editJob = (job: Job) => {
        editJobItem.value = { ...job }
    }

    const updateJob = (updatedJob: {}) => {
        const id = editJobItem.value?.id;
        const index = jobs.value.findIndex(i => i.id === id)
        try {

            if (index !== -1)
                jobs.value[index] = { ...jobs.value[index], ...updatedJob }

            editJobItem.value = null
            toast.success("Job updated successfully")
        } catch (error) {
            toast.error("Failed to update job")
        }

    }

    const removeJob = (id: number) => {
         try {
        jobs.value = jobs.value.filter(job => job.id !== id)
        toast.success("Job removed successfully")
         } catch (error) {
            toast.error("Failed to remove job")
        }
    }

    //Getters

    const finalJobs = computed(() => {
        let result = [...jobs.value]
        //filtered jobs
        if (selectedStatus.value)
            result = result.filter(job => job.status === selectedStatus.value);

        //sort jobs
        if (sortBy.value) {
            result.sort((a, b) => {
                const key = sortBy.value

                const getValue = (val: any) => {
                    if (key === 'id') return new Date(val).getTime()
                    return String(val ?? '').toLowerCase()
                }

                const aVal = getValue(a[key])
                const bVal = getValue(b[key])

                if (aVal < bVal) return sortOrder.value === 'asc' ? -1 : 1
                if (aVal > bVal) return sortOrder.value === 'asc' ? 1 : -1
                return 0
            })
        }

        //search jobs
        if (searchQuery) {
            const query = searchQuery.value.toLowerCase()
            result = result.filter(job => job.company.toLowerCase().includes(query) || job.role.toLowerCase().includes(query))
        }

        return result

    })

    const total = computed(() => {
        return jobs.value.length
    })

    const applied = computed(() => {
        return jobs.value.filter(job => job.status === 'applied').length
    })

    const interviewed = computed(() => {
        return jobs.value.filter(job => job.status === 'interview').length
    })

    const rejected = computed(() => {
        return jobs.value.filter(job => job.status === 'rejected').length
    })
    const selected = computed(() => {
        return jobs.value.filter(job => job.status === 'selected').length
    })

    //Persistence

    const loadJobs = () => {
        isLoading.value = true;
        setTimeout(() => {
            const savedJobs = localStorage.getItem('jobs');
            if (savedJobs)
                jobs.value = JSON.parse(savedJobs)
            isLoading.value = false;
        }, 800)

    }

    watch(jobs, (newJobs) => {
        localStorage.setItem('jobs', JSON.stringify(newJobs));
    }, { deep: true })


    return {
        jobs,
        isLoading,
        searchQuery,
        selectedStatus,
        finalJobs,        
        sortBy,
        sortOrder,
        editJobItem,
        total,
        applied,
        interviewed,
        rejected,
        selected,
        addJob,
        removeJob,
        loadJobs,
        editJob,
        updateJob,
    }

})