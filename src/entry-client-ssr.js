import { createApp } from './app';
import posts from '@/tmp/posts';
import { markdownCompiler, anchorjs } from './vendor';
import css from './app.css';

const container = '#app';

function generateAnchors() {
  anchorjs().then(({ default: lib }) => {
    const anchors = new lib();
    const tags = ['h2', 'h3', 'h4', 'h5', 'h6'];
    tags.forEach(tag => anchors.add(tag));
  });
}

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
            generateAnchors();
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
