<template>
  <main role="main">
    <section class="post">
      <h1>{{ postData.title }}</h1>
      <p v-if="postData.summary"
         class="text-xl font-semibold text-grey-dark">
        {{ postData.summary }}
      </p>
      <div class="text-sm mb-8 text-grey-darker">
        <time :datetime="postData.date">
          {{ postData.date | date }}
        </time>
        <span class="mx-1">•</span>
        <span :title="postData.readingTime.text">{{ postData.readingTime.text }}</span>
      </div>
      <article v-html="postContent"/>
    </section>
  </main>
</template>

<script>
import { markdownCompiler } from '../vendor';

export default {
  props: ['content', 'data'],
  data() {
    return {
      postContent: this.content,
      postData: this.data,
    };
  },
}
</script>
