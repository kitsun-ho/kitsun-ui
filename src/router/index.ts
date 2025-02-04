import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Button.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior: () => {
    return Object.assign({ left: 0, top: 0 }, { x: 0, y: 0 });
  },
});

export default router;
