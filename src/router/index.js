import {createRouter,  createWebHistory} from 'vue-router'
import ChatApp from "@/views/ChatApp.vue";

const routes = [
  {
    path: '/:id',
    name: 'home',
    component: ChatApp
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
