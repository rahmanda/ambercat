<template>
  <main role="main">
    <h1>{{ postData.title }}</h1>
    <article v-html="postContent"/>
  </main>
</template>

<script>
import posts from '@/tmp/posts';
const markdownCompiler = () => import(/* webpackChunkName: "ambercat/lib/markdown-compiler" */ 'ambercat/lib/markdown-compiler');

export default {
  props: ['content', 'data'],
  data() {
    return {
      postContent: this.content,
      postData: this.data,
    };
  },
  mounted() {
    if (!this.postContent && !this.postData) {
      const path = this.$route.path.split('/')[1].split('.html')[0];
      posts[path]()
        .then(({ default: file }) => {
          markdownCompiler()
            .then(({ default: compiler }) => {
              const { content, data } = compiler(file);
              this.postContent = content;
              this.postData = data;
            })
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
}
</script>
