import './assets/main.css'

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Desktop from "./components/Desktop.vue";
import Blockchain from "./components/Blockchain.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/section1', component: Desktop },
    { path: '/section2', component: Blockchain },
  ]
});

createApp(App).use(router).mount('#app')
