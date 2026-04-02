<template>
    <div>
        <navigation />
        <div class="my-4 px-5 main-wrapper">

            <div class="d-flex justify-content-center align-items-center my-5">
                <div class="card bg-light p-4 shadow-sm">
                    <div>
                        <h3 class="mb-1">Settings ⚙️</h3>
                        <p class="text-muted mb-4">
                            Manage your profile and app preferences
                        </p>
                        <hr>
                    </div>
                    <user-form />
                </div>
            </div>

        </div>
        <footer-section />
    </div>
</template>
<script setup lang="ts">
import FooterSection from '@/components/shared/Footer.vue';
import UserForm from '@/components/shared/UserForm.vue';
import Navigation from '@/components/shared/Navigation.vue';

</script>
