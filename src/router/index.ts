import { createRouter, createWebHistory } from 'vue-router';

const base = import.meta.env.BASE_URL;

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Button.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(base),
  routes,
  scrollBehavior: () => {
    return { x: 0, y: 0, behavior: 'smooth' };
  },
});

export default router;
