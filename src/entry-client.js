import { createApp } from './app';
import posts from '@/tmp/posts';
const markdownCompiler = () => import(/* webpackChunkName: "ambercat/lib/markdown-compiler" */ 'ambercat/lib/markdown-compiler');

const container = '#app';

function fetchPost(container, render) {
  const { pathname } = window.location;
  const excludedPath = ['/', '/index.html', '/404', '/404.html'];

  if (excludedPath.includes(pathname)) {
    render({}).app.$mount(container);
  } else {
    const path = pathname.split('/')[1].split('.html')[0];
    posts[path]()
      .then(({ default: file }) => {
        markdownCompiler()
          .then(({ default: compiler }) => {
            const { app } = render(compiler(file));
            app.$mount(container);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector(container)) {
    fetchPost(container, createApp);
  };
});
