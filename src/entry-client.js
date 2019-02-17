import { createApp } from './app';
import posts from '@/tmp/posts';
import markdownCompiler from 'ambercat/lib/markdown-compiler';

const container = '#app';

function fetchPost(container, render) {
  const path = window.location.pathname.split('/')[1].split('.html')[0];
  posts[path]()
    .then(({ default: file }) => {
      const { data, content } = markdownCompiler(file);
      const { app } = render({ data, content });
      app.$mount(container);
    })
    .catch(err => {
      console.log(err);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector(container)) {
    fetchPost(container, createApp);
  };
});
