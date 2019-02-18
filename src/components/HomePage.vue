<template>
  <div id="homepage" class="text-lg text-grey-darkest">
    <div class="bg-indigo h-1"/>
    <div class="bg-grey-lighter shadow-md">
      <div class="max-w-md mx-auto px-8 py-6">
        <h1 class="text-5xl text-indigo-dark mt-0 mb-6">Ambercat</h1>
        <p class="mb-0">A stupidly simple static site generator based on Vue.js</p>
      </div>
    </div>
    <div class="max-w-md mx-auto px-8 py-6">
      <div v-for="post in data.posts"
           class="mb-10">
        <time :datetime="post.date"
              class="block text-sm mb-2 text-grey-darker">
          {{ post.date | date }}
        </time>
        <a :href="post.path"
           class="text-3xl font-semibold">
          {{ post.title }}
        </a>
        <p v-if="post.summary"
           class="text-base text-grey-darker mt-4">{{ post.summary }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
};
</script>
