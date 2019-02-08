import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './pages/HomePage.vue';
import PostPage from './pages/PostPage.vue';
import FourOhFourPage from './pages/FourOhFourPage.vue';

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: HomePage },
      { path: '/post/:slug', component: PostPage },
      { path: '/404', component: FourOhFourPage },
    ],
  });
}
