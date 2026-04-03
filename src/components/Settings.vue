<template>
    <div class="user">
        <div>
            <h5 class="mt-3">Profile</h5>
            <p class="text-muted small">
                Update your name and choose how you appear across the app
            </p>
        </div>
        <user-form/>
        <div class=" mb-5">
            <hr class="my-5">
            <div>
                <h5 class="text-danger">Danger Zone</h5>
                <p class="text-muted small">
                    Resetting will permanently delete your profile and all job data
                </p>
                <button class="btn btn-danger my-3" data-bs-toggle="modal" data-bs-target="#deleteAppModal">
                    <i class="bi bi-exclamation-circle"></i>
                    Reset App & Delete Data
                </button>
                <small class="text-danger d-block mt-2">
                    *This action cannot be undone
                </small>
                <!-- Modal -->
                <div class="modal fade" id="deleteAppModal" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">

                            <div class="modal-header">
                                <h5 class="modal-title">Confirm Delete</h5>
                            </div>

                            <div class="modal-body">
                                <p>Are you sure you want to reset this app and permanently delete all job data?</p>
                                <small class="text-danger">*This action cannot be undone</small>
                            </div>

                            <div class="modal-footer">
                                <button class="btn btn-secondary" data-bs-dismiss="modal">
                                    Cancel
                                </button>
                                <button class="btn btn-danger" data-bs-dismiss="modal" @click="deleteData">
                                    Delete
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/useUserStore'
import { useJobStore } from '@/stores/useJobStore'
import UserForm from '@/components/shared/UserForm.vue'
import { useToast } from 'vue-toastification'
import router from '@/router'
const userStore = useUserStore()
const jobStore = useJobStore()
const toast = useToast()
const deleteData = () => {
    userStore.resetUser()
    jobStore.resetJobs()
    toast.success('Sucessfully deleted all data')
    router.replace('/onboarding')
}

</script>