import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router';

export function createApp({ url, content, data }) {
  const router = createRouter();

  const app = new Vue({
    router,
    render(createElement) {
      return createElement(App, {
        props: {
          content,
          data,
          url,
        },
      });
    },
  });

  return { app, router };
};
