import { useJobStore } from "@/stores/useJobStore"
import * as XLSX from 'xlsx'
import { getDate } from '@/utils/formatDate'

export function useExportExcel() {
    const jobStore = useJobStore()
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