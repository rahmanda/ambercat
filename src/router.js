import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './components/HomePage.vue';
import PostPage from './components/PostPage.vue';
import FourOhFourPage from './components/FourOhFourPage.vue';

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: HomePage,
      },
      {
        path: '/index.html',
        component: HomePage,
      },
      {
        path: '/404.html',
        component: FourOhFourPage,
      },
      {
        path: '/:slug',
        component: PostPage,
      },
      {
        path: '**',
        component: FourOhFourPage,
      },
    ],
  });
}
