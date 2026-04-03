<template>
    <div class="">
        <div class="container-fluid p-5 d-flex justify-content-center align-items-center"
            style="background: linear-gradient(135deg, #4e73df, #1cc88a);">
            <div class="row m-0 mx-auto">
                <!-- LEFT -->
                <div class="col-md-7 col-sm-6 d-flex flex-column justify-content-center text-white onboarding-title ">
                    <img src="/src/assets/job-hunt.svg" alt="Job tracking illustration"
                        class="img-fluid mb-3 onboarding-img " />
                    <h1 class="mb-3 d-flex align-items-center">Job Tracker Dashboard</h1>
                    <p class="d-none d-sm-block">
                        A simple way to manage your job applications and stay on top of your goals.
                    </p>
                </div>
                <!-- RIGHT -->
                <div class="col-md-5 col-sm-6  ms-auto card shadow-sm p-4">

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
    min-height: calc(100vh - 119px);
}

.onboarding-img {
    max-width: 225px;
    width:100%;
    height: auto;
}

@media (max-width: 575px) {
    .onboarding-title {
        flex-direction: row !important;
        .onboarding-img {
            max-width: 150px;
        }
    }

}
</style>