import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from '@/global/axiosConfig'

let app = createApp(App)
app.config.globalProperties.$https = axios;

app.use(router).use(router)
app.mount('#app')
