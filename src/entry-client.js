import { createApp } from './app';

const container = '#app';

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector(container)) {
    const { app } = createApp({});
    app.$mount(container);
  };
});
