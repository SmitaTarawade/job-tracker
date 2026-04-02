<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from './stores/useUserStore';
</script>

<template>
 <div class="mx-auto">
  <router-view></router-view>
 </div>
</template>

<style>
.main-wrapper {
    min-height: calc(100vh - 262px);
}
hr {
    color: #ced4da !important;
}
</style>
