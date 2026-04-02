<template>
    <div class="user">
        <div v-if="pageName === 'settings'">
            <h5 class="mt-3">Profile</h5>
            <p class="text-muted small">
                Update your name and choose how you appear across the app
            </p>
        </div>
        <div class="mb-3">
            <label class="form-label required">Name</label>
            <input class="form-control" placeholder="eg. John Smith" v-model="name" :class="{
                'is-invalid': error,
                'is-valid': !error && name
            }" />
            <small class="text-danger">{{ error }}</small>
        </div>

        <div class="mb-3">
            <label>Choose Your Emoji</label>
            <div class="mt-3 mb-2  d-flex flex-wrap">
                <button class="btn emoji me-1" v-for="e of emojis" :key="e" @click="emoji = e"
                    :class="[(emoji === e) ? 'selected' : '']">
                    {{ e }}
                </button>
            </div>

        </div>

        <button class="btn btn-primary my-2" @click="handleSubmit" :class="[pageName === 'onboarding' ? 'w-100' : '']">
            <span v-if="pageName === 'onboarding'">
                Start Tracking Jobs <i class="bi bi-arrow-right-short ms-2"></i>
            </span>
            <span v-else>
                <i class="bi bi-check2-all"></i> Save Changes
            </span>
        </button>
        <div v-if="pageName === 'settings'" class=" mb-5">
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
                    <div class="modal-dialog">
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
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/useUserStore'
import { useJobStore } from '@/stores/useJobStore'
import router from '@/router'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast()

const userStore = useUserStore()
const jobStore = useJobStore()
const route = useRoute();
const pageName = ref(route.name)
const name = ref<String>('')
const emoji = ref<String>('')
const error = ref<String>('')

const emojis = ['😎', '😊', '👦', '🧔', '👧', '🧕', '🚀', '🔥', '💼', '👽', '🌱', '🌷', '🌈', '🎀',]

const handleSubmit = () => {
    if (!name.value.trim()) {
        error.value = 'Name is required'
        return
    }
    else {
        userStore.saveUser(name.value, emoji.value)
        if (pageName.value === 'onboarding')
            router.replace('/')
        else
            toast.success("Changes updated successfully")
    }
}

const deleteData = () => {
    userStore.resetUser()
    jobStore.resetJobs()
   toast.success('Sucessfully deleted all data')
    router.replace('/onboarding')
}

onMounted(() => {
    if(userStore.user.name){
        name.value = userStore.user.name;
        emoji.value = userStore.user.emoji;
    } else 
    emoji.value = '😎'
    
})
</script>
<style scoped>
.emoji.selected {
    background-color: rgb(28, 200, 138) !important;
}

hr {
    margin: 24px 0;
}
</style>