<template>
  <main role="main"
        :dir="postData.direction"
        :class="{ 'rtl': postData.direction === 'rtl' }">
    <section class="post">
      <div v-if="postData.translations || postData.originalPostPath"
          class="text-sm mt-8 text-grey-darker">
        <span v-if="postData.translations">
          Translate to:
          <a v-for="(translation, key) in postData.translations"
             :key="key"
             :href="translation.path"
             class="mx-1">
            {{ translation.name }}
          </a>
        </span>
        <span v-if="postData.originalPostPath">
          This is a translated version. Read
          <a :href="postData.originalPostPath">
            original post
          </a>
        </span>
      </div>
      <h1>{{ postData.title }}</h1>
      <p v-if="postData.summary"
         class="text-xl font-semibold text-grey-dark">
        {{ postData.summary }}
      </p>
      <div class="text-sm mb-8 text-grey-darker">
        <time :datetime="postData.date">
          {{ postData.date | date(postData.language) }}
        </time>
        <span class="mx-1">•</span>
        <span :title="postData.readingTime.text" dir="ltr">{{ postData.readingTime.text }}</span>
      </div>
      <article v-html="postContent"/>
    </section>
    <footer class="flex flex-col md:flex-row max-w-md mx-auto my-8">
      <div v-if="postData.olderPost"
            class="flex-1 px-6 pb-8 text-left">
        <p class="mb-2 text-grey-dark">Older Post</p>
        <a :href="postData.olderPost.data.path">← {{ postData.olderPost.data.title }}</a>
      </div>
      <div v-if="postData.newerPost"
            class="flex-1 px-6 pb-8 text-left md:text-right">
        <p class="mb-2 text-grey-dark">Newer Post</p>
        <a :href="postData.newerPost.data.path">{{ postData.newerPost.data.title }} →</a>
      </div>
    </footer>
  </main>
</template>

<script>
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
