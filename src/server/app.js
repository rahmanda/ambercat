import Vue from 'vue';
import App from '../App.vue';
import { createRouter } from './router';

export function createApp({ url, content }) {
  const router = createRouter();

  const app = new Vue({
    router,
    render(createElement) {
      return createElement(App, {
        props: {
          content,
          url,
        },
      });
    },
  });

  return { app, router };
};
