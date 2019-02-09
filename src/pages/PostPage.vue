<template>
  <div>
    <div v-html="content"/>
    <button type="button" @click="add">{{ count }}</button>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it';
import frontmatter from 'gray-matter';
import posts from '@/tmp/posts';

const htmlGenerator = new MarkdownIt();

export default {
  data() {
    return {
      count: 0,
      content: '',
    };
  },
  mounted() {
    const path = this.$route.path.split('/')[1];
    posts[path]()
      .then(({ default: file }) => {
        const { content } = frontmatter(file);
        this.content = htmlGenerator.render(content);
      });
  },
  methods: {
    add() {
      this.count += 1;
    },
  },
}
</script>
