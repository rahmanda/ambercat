import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router';

export function createApp({ url, content }) {
  const router = createRouter();

  const app = new Vue({
    template: `<App :content="content" :url="url"/>`,
    components: { App },
    data: () => ({ url, content }),
    router,
  });

  return { app, router };
};
