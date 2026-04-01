<script setup lang="ts">
import Navigation from './components/dashboard/Navigation.vue';
</script>

<template>
 <div class="mx-auto">
  <navigation/>
  <div class="px-5 my-4">
     <router-view></router-view>
  </div>
  <footer class="mt-5 bg-light py-5 border-top">
    <div class="d-flex justify-content-between align-items-center flex-wrap text-muted small px-5">
      
      <div>
        © 2026 Job Tracker • Built with Vue
      </div>

      <div>
        Stay consistent 💼 • Keep going 🚀
      </div>

    </div>
  </footer>
  
 </div>
</template>

<style>

</style>
