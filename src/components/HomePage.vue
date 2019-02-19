<template>
  <div id="homepage" class="text-lg text-grey-darkest">
    <div class="max-w-md mx-auto px-8 pt-16 pb-8">
      <h1 class="text-5xl text-indigo-dark mt-0 mb-4">Ambercat</h1>
      <p class="text-xl mb-0 font-semibold text-grey-dark">A stupidly simple static site generator based on Vue.js</p>
    </div>
    <div class="max-w-md mx-auto px-8 py-6">
      <div v-for="post in data.posts"
           class="mb-12">
        <div class="text-sm text-grey-darker">
          <time :datetime="post.date">
            {{ post.date | date }}
          </time>
          <span class="mx-1">•</span>
          <span :title="post.readingTime.text">{{ post.readingTime.text }}</span>
        </div>
        <a :href="post.path"
           class="text-3xl font-semibold">
          {{ post.title }}
        </a>
        <p v-if="post.summary"
           class="text-base text-grey-darker mt-2">{{ post.summary }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
};
</script>
