<script setup lang="ts">
import JobList from '@/components/jobs/JobsList.vue';
import FooterSection from '@/components/shared/Footer.vue';
import Navigation from '@/components/shared/Navigation.vue';

</script>

<template>
     <div>
          <navigation/>
          <div class="my-5 px-5 main-wrapper">
               <job-list/>
          </div>         
          <footer-section/>
     </div>
</template> 