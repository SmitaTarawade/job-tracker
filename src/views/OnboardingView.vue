<template>
    <div class="">
        <div class="container-fluid p-5 d-flex justify-content-center align-items-center"
            style="background: linear-gradient(135deg, #4e73df, #1cc88a);">
            <div class="row m-0 mx-auto">
                <!-- LEFT -->
                <div class="col-7 d-flex flex-column justify-content-center text-white p-5">
                    <img src="/src/assets/job-hunt.svg" alt="Job tracking illustration" class="img-fluid mb-4" />
                    <h1 class="mb-3">Job Tracker Dashboard</h1>

                    <p>
                        A simple way to manage your job applications and stay on top of your goals.
                    </p>
                    
                </div>
                <!-- RIGHT -->
                <div class="col-5 ms-auto card shadow-sm p-4">

                    <h2>Welcome 👋</h2>
                    <p class="mb-0">Let's get you started</p>
                    <hr>
                    <user-form />
                </div>
            </div>
        </div>
        <footer-section />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/useUserStore'
import FooterSection from '@/components/shared/Footer.vue'
import UserForm from '@/components/shared/UserForm.vue'
import router from '@/router'

const userStore = useUserStore()
const name = ref<String>('')
const emoji = ref<String>('😎')
const error = ref<String>('')

const emojis = ['😎', '😊', '👦', '🧔', '👧', '🧕', '🚀', '🔥', '💼', '👽', '🌱', '🌷', '🌈', '🎀',]

const handleSubmit = () => {
    if (!name.value.trim()) {
        error.value = 'Name is required'
        return
    }
    else {
        userStore.saveUser(name.value, emoji.value)
        router.push({ name: 'dashboard' })
    }
}

</script>

<style>
.container-fluid {
    height: calc(100vh - 119px);
}
img{
    max-width: 225px !important;
    height:auto;
}
</style>