<template>
  <div>
    <div v-html="postContent"/>
    <button type="button" @click="add">{{ count }}</button>
  </div>
</template>

<script>
import posts from '@/tmp/posts';
import markdownCompiler from '@/lib/markdown-compiler';

export default {
  props: ['content'],
  data() {
    return {
      count: 0,
      postContent: this.content,
    };
  },
  mounted() {
    if (!this.postContent) {
      const path = this.$route.path.split('/')[1].split('.html')[0];
      posts[path]()
        .then(({ default: file }) => {
          this.postContent = markdownCompiler(file).content;

        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  methods: {
    add() {
      this.count += 1;
    },
  },
}
</script>
