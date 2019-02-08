import App from './App.vue';
import Vue from 'vue';

const container = '#app';

function init(selector) {
  return new Vue({
    el: selector,
    render: h => h(App),
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector(container)) init(container);
});
