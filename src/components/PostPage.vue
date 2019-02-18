<template>
  <main role="main">
    <div class="bg-indigo h-1"/>
    <section class="post">
      <h1>{{ postData.title }}</h1>
      <time class="text-base mb-8 text-grey-dark block"
            :datetime="postData.date">
        {{ postData.date | date }}
      </time>
      <article v-html="postContent"/>
      <hr>
    </section>
  </main>
</template>

<script>
// import posts from '@/tmp/posts';
import { markdownCompiler } from '../vendor';

export default {
  props: ['content', 'data'],
  data() {
    return {
      postContent: this.content,
      postData: this.data,
    };
  },
  // mounted() {
  //   if (!this.postContent && !this.postData) {
  //     const path = this.$route.path.split('/')[1].split('.html')[0];
  //     posts[path]()
  //       .then(({ default: file }) => {
  //         markdownCompiler()
  //           .then(({ default: compiler }) => {
  //             const { content, data } = compiler(file);
  //             this.postContent = content;
  //             this.postData = data;
  //           })
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   }
  // },
}
</script>
