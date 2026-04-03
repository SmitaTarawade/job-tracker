<template>
  <header class="d-flex ms-auto px-5 py-3 sticky">
    <h2 class="mb-0 d-flex align-items-center text-capitalize">{{ userStore.user.emoji }} Hi, {{ userStore.user.name }}!</h2>
    <nav class="navbar-nav nav flex-row flex-wrap bd-navbar-nav ms-auto py-2" :class="{ open: isOpen }">
      <router-link to="/" class="nav-link py-2 px-0 px-lg-2 d-flex align-items-center me-2"
        active-class="active">Dashboard</router-link>
      <router-link to="/jobs" class="nav-link py-2 px-0 px-lg-2 d-flex align-items-center me-2"
        active-class="active">Jobs</router-link>
         
      <div class="nav-item py-2 py-lg-1">
        <div class="vr h-100 mx-2 text-grey-50"></div>
      </div>
       <div class="nav-item col-lg-auto">
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
    <button class="d-block ms-auto d-md-none menu-btn btn" @click="isOpen = !isOpen">
   <i class="bi bi-list"></i>
  </button>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/useUserStore';
import {ref} from 'vue'
const userStore = useUserStore()
let isOpen = ref<Boolean>(false)
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
@media (max-width: 768px) {
  .menu-btn {
    display: block;
  }

  .nav {
    position: absolute;
    top: 78px;
    right: 0;
    width: 100%;
    background: white;
    transition: all 0.3s ease;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 16px 0;
     box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    display: none;
  }

  .nav.open {
    display: flex;
    padding: 3rem;
    z-index: 9;
    justify-content: flex-end;
  }
}
</style>