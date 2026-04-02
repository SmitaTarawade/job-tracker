import {createRouter, createWebHistory} from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'
const routes = [
    {
        path: '/',
        name:'dashboard',
        component: () => import('../views/DashboardView.vue')
    },
    {
        path: '/jobs',
        name:'jobs',
        component: () => import('../views/JobView.vue')
    },
     {
        path: '/onboarding',
        name: 'onboarding',
        component: () => import('../views/OnboardingView.vue')
    },{
        path: '/settings',
        name: 'settings',
        component: () => import('../views/SettingsView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


router.beforeEach((to, from) => {
    const userStore = useUserStore()
    if(!userStore.isLoaded){
        userStore.loadUser()
    } 

    if(userStore.hasUser()  && to.name !== 'onboarding'){
       return { name: 'onboarding' }
    }
    if (!userStore.hasUser && to.name === 'onboarding') {
    return { name: 'dashboard' }
  }
})  

export default router