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