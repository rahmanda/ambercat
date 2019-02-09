import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './pages/HomePage.vue';
import PostPage from './pages/PostPage.vue';
import FourOhFourPage from './pages/FourOhFourPage.vue';

Vue.use(Router);

export function createRouter(serverMode = false) {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: HomePage,
      },
      {
        path: '/404',
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
