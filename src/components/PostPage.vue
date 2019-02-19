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
    <footer class="flex flex-col md:flex-row max-w-md mx-auto my-8">
      <div v-if="postData.olderPost"
            class="flex-1 px-6 pb-8 text-left">
        <p class="mb-2 text-grey-dark">Older Post</p>
        <a :href="postData.olderPost.path">← {{ postData.olderPost.title }}</a>
      </div>
      <div v-if="postData.newerPost"
            class="flex-1 px-6 pb-8 text-left md:text-right">
        <p class="mb-2 text-grey-dark">Newer Post</p>
        <a :href="postData.newerPost.path">{{ postData.newerPost.title }} →</a>
      </div>
    </footer>
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
