import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router';

export function createApp(context, filters = []) {
  const router = createRouter();

  filters.forEach(filter => {
    Vue.filter(filter.name, filter.fn);
  });

  const app = new Vue({
    router,
    render(createElement) {
      return createElement(App, {
        props: context,
      });
    },
  });

  return { app, router };
};
