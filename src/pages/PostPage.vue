<template>
  <div>
    <div v-html="postContent"/>
    <button type="button" @click="add">{{ count }}</button>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it';
import frontmatter from 'gray-matter';
import posts from '@/tmp/posts';

const htmlGenerator = new MarkdownIt();

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
      const path = this.$route.path.split('/')[1];
      posts[path]()
        .then(({ default: file }) => {
          const { content } = frontmatter(file);
          this.postContent = htmlGenerator.render(content);
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
