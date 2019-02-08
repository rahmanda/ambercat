import App from './App.vue';
import Vue from 'vue';
import { createRenderer } from 'vue-server-renderer';

const app = new Vue(App);
const renderer = createRenderer();

renderer.renderToString(app).then(html => {
  console.log(html);
}).catch(err => {
  console.error(err);
});
