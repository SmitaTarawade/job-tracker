import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Toast from "vue-toastification"
import { createHead } from '@vueuse/head'
import "vue-toastification/dist/index.css"
import { useUserStore } from '@/stores/useUserStore'


const app = createApp(App)
const head = createHead()
app.use(head)

const pinia = createPinia()
app.use(pinia)

const userStore = useUserStore()
userStore.loadUser


app.use(router)
    .use(Toast, {
        position: "bottom-right",
        timeout: 3000,
        closeOnClick: true,
        pauseOnHover: true,
    }).mount('#app')
