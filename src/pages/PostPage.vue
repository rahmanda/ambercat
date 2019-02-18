<template>
  <main role="main" class="post font-sans">
    <h1>{{ postData.title }}</h1>
    <time class="text-base mb-8 text-grey-dark block"
          :datetime="postData.date">
      29 Februari 2016
    </time>
    <article v-html="postContent"/>
    <hr>
  </main>
</template>

<script>
import posts from '@/tmp/posts';
import markdownCompiler from '../compiler';

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

<style lang="scss">
.post {
  @apply max-w-md mx-auto leading-normal text-grey-darkest px-8 text-lg pb-10;

  h1 {
    @apply mt-16 mb-8 text-5xl text-indigo-dark leading-tight;
  }

  h2 {
    @apply my-8 text-3xl text-black leading-tight;
  }

  h3 {
    @apply my-6 text-2xl text-black leading-tight;
  }

  h4, h5, h6 {
    @apply my-4 text-xl text-black leading-tight;
  }

  hr {
    @apply my-12 mx-16 border-solid border-b border-grey;
  }

  blockquote {
    @apply text-center text-black px-4 text-xl my-10 font-semibold;
  }

  p {
    @apply mb-6;
  }

  a {
    @apply font-semibold text-black relative no-underline;
    background-image: -webkit-gradient(linear,left top,left bottom,color-stop(70%,transparent),color-stop(70%,rgba(101,125,225,.4)));
    background-image: linear-gradient(180deg,transparent 70%,rgba(101,125,225,.4) 0);
  }
}
</style>
