<template>
  <header class="d-flex ms-auto px-5 py-3 sticky">
    <h2 class="mb-0 d-flex align-items-center">{{ userStore.user.emoji }} Hi, <span class="mx-1 text-capitalize"> {{ userStore.user.name }}</span>!</h2>
    <nav class="navbar-nav flex-row flex-wrap bd-navbar-nav ms-auto py-2">
      <router-link to="/" class="nav-link py-2 px-0 px-lg-2 d-flex align-items-center me-2"
        active-class="active">Dashboard</router-link>
      <router-link to="/jobs" class="nav-link py-2 px-0 px-lg-2 d-flex align-items-center me-2"
        active-class="active">Jobs</router-link>
         
      <div class="nav-item py-2 py-lg-1 col-12 col-lg-auto">
        <div class="vr d-none d-lg-flex h-100 mx-lg-2 text-grey"></div>
        <hr class="d-lg-none my-2 text-grey-50">
      </div>
       <div class="nav-item col-6 col-lg-auto">
        <router-link to="/settings" class="nav-link h-100 py-2 px-0 px-lg-2 d-flex align-items-center me-2"
        active-class="active"><i class="bi bi-gear-fill"></i></router-link>       
      </div>
      <div class="nav-item col-6 col-lg-auto">
        <a class="nav-link h-100 py-2 px-0 px-lg-2 d-flex align-items-center me-2" href="https://github.com/SmitaTarawade"
          target="_blank" rel="noopener">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="navbar-nav-svg" viewBox="0 0 512 499.36"
            role="img">
            <title>GitHub</title>
            <path fill="currentColor" fill-rule="evenodd"
              d="M256 0C114.64 0 0 114.61 0 256c0 113.09 73.34 209 175.08 242.9 12.8 2.35 17.47-5.56 17.47-12.34 0-6.08-.22-22.18-.35-43.54-71.2 15.49-86.2-34.34-86.2-34.34-11.64-29.57-28.42-37.45-28.42-37.45-23.27-15.84 1.73-15.55 1.73-15.55 25.69 1.81 39.21 26.38 39.21 26.38 22.84 39.12 59.92 27.82 74.5 21.27 2.33-16.54 8.94-27.82 16.25-34.22-56.84-6.43-116.6-28.43-116.6-126.49 0-27.95 10-50.8 26.35-68.69-2.63-6.48-11.42-32.5 2.51-67.75 0 0 21.49-6.88 70.4 26.24a242.65 242.65 0 0 1 128.18 0c48.87-33.13 70.33-26.24 70.33-26.24 14 35.25 5.18 61.27 2.55 67.75 16.41 17.9 26.31 40.75 26.31 68.69 0 98.35-59.85 120-116.88 126.32 9.19 7.9 17.38 23.53 17.38 47.41 0 34.22-.31 61.83-.31 70.23 0 6.85 4.61 14.81 17.6 12.31C438.72 464.97 512 369.08 512 256.02 512 114.62 397.37 0 256 0z">
            </path>
          </svg>
          <small class="d-lg-none ms-2">GitHub</small>
        </a>        
      </div>
      <!--<div class="nav-item col-6 col-lg-auto">
        <a class="nav-link py-2 px-0 px-lg-2 d-flex align-items-center me-2" href="https://github.com/twbs"
          target="_blank" rel="noopener">
          <i class="bi bi-sun-fill"></i>
        </a>
      </div>-->

    </nav>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/useUserStore';
const userStore = useUserStore()
</script>

<style scoped>
header {
     background-color: aliceblue;
    border-bottom: 1px solid #ebebeb;
}
.nav-link.active {
  color: #0d6efd !important;
}
.bi {
  font-size: 20px;
}
</style>