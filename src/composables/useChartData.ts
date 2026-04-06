import { useJobStore } from "@/stores/useJobStore"

export function useChartData() {
    const jobStore = useJobStore()
    const map: Record<string, number> = {}
    let result = [...jobStore.jobs]
        
    result.forEach((job) => {
            const date = new Date(job.id).toLocaleDateString('en-GB', {
                month: 'short',
                day: 'numeric',
            })

            map[date] = (map[date] || 0) + 1
        })
        return {
            labels: Object.keys(map),
            data: Object.values(map)
        }
}