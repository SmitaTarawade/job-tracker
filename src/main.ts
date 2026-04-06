import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index'
import App from './App.vue'
import Toast from "vue-toastification"
import { createHead } from '@vueuse/head'
import { useUserStore } from '@/stores/useUserStore'
import "vue-toastification/dist/index.css"
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";



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
