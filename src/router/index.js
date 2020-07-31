import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/Index.vue'),
  },
  {
    path: '/crawled-pages',
    name: 'crawledPages',
    component: () => import('@/views/CrawledPages/Index.vue'),
  },
  {
    path: '/crawled-pages/:id',
    name: 'crawledPage',
    component: () => import('@/views/CrawledPages/View.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
