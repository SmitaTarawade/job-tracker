<template>
    <div class="tiles">
        <div class="row  mx-0 p-0">
            <div class="col-md-6 col-sm-12">
                <div>
                    <div class="p-3 text-white mb-4 w-100 rounded border d-flex align-items-center shadow-sm progress-alert"
                        style="background:#1cc88a;">
                        <h5 class="mb-0 me-3">🚀</h5>
                        <div>
                            <h6 class="mb-0">Progress update:</h6>
                            <p class="mb-0">{{ message }}</p>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <h5>Your quick stats:</h5>
                    <div class="col-6 my-2">
                        <div class="card p-3 shadow-sm">
                            <div class="d-flex align-items-center gap-3">
                                <i class="bi bi-send fs-4 text-secondary"></i>
                                <div>
                                    <div class="text-muted">Applied</div>
                                    <div class="fw-bold fs-5">{{ jobStore.applied }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-6 my-2">
                        <div class="card p-3 shadow-sm">
                            <div class="d-flex align-items-center gap-3">
                                <i class="bi bi-chat-dots fs-4 text-primary"></i>
                                <div>
                                    <div class="text-muted">Interviews</div>
                                    <div class="fw-bold fs-5">{{ jobStore.interviewed }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 my-2">
                        <div class="card p-3 shadow-sm">
                            <div class="d-flex align-items-center gap-3">
                                <i class="bi bi-emoji-frown fs-4 text-danger"></i>
                                <div>
                                    <div class="text-muted">Rejected</div>
                                    <div class="fw-bold fs-5">{{ jobStore.rejected }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 my-2">
                        <div class="card p-3 shadow-sm">
                            <div class="d-flex align-items-center gap-3">
                                <i class="bi bi-emoji-grin fs-4 text-success"></i>
                                <div>
                                    <div class="text-muted">Selected</div>
                                    <div class="fw-bold fs-5">{{ jobStore.selected }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 mt-3">
                        <div class="card shadow-sm p-3 d-flex justify-content-center">
                            <div class="d-flex align-items-center gap-3 pt-0">
                                <i class="bi bi-briefcase fs-4 text-primary"></i>
                                <div>
                                    <div class="text-muted">Total jobs</div>
                                    <div class="fs-5">{{ jobStore.total }} applied this month</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-sm-12 h-100 mt-4 mt-md-0">
                <status-chart />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useJobStore } from '@/stores/useJobStore'
import StatusChart from '@/components/dashboard/StatusChart.vue'
import { computed, ref } from 'vue'

const jobStore = useJobStore()

const message = computed(() => {
    if (jobStore.interviewed > 0) {
        return "You're getting traction— interviews mean you're doing something right."
    }
    if (jobStore.applied > 0) {
        return "Consistency beats luck. Keep applying — you're closer than you think."
    }
    return "Start small. One application today is enough."
})

</script>
<style>
@media (max-width: 767px){
    .progress-alert {
        flex-direction: column;
        h5 {
            margin: 0 0 10px !important;
        }
    }
}
</style>