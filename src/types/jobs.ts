export type JobStatus = 'applied' | 'interview' | 'rejected' | 'selected'
export type Job = {
    id: number,
    company: string,
    role: string,
    status: JobStatus,
    notes?: string
}

