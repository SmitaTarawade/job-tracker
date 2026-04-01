import {createRouter, createWebHistory} from 'vue-router'


const routes = [
    {
        path: '/',
        component: () => import('../views/DashboardView.vue')
    },
    {
        path: '/jobs',
        component: () => import('../views/JobView.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router