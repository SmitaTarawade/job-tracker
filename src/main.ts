import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

createApp(App)
    .use(createPinia())
    .use(router)
    .use(Toast, {
        position: "bottom-right",
        timeout: 3000,
        closeOnClick: true,
        pauseOnHover: true,
    }).mount('#app')
