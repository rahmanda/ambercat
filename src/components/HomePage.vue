<template>
  <main role="main" id="homepage" class="text-lg text-grey-darkest">
    <div class="max-w-md mx-auto px-6 py-12">
      <h1 class="text-5xl text-indigo-dark mt-0 mb-4">{{ data.title }}</h1>
      <p class="text-xl mb-0 font-semibold text-grey-dark">{{ data.description }}</p>
    </div>
    <div class="max-w-md mx-auto px-6 py-6">
      <div v-for="post in data.posts"
           class="mb-10">
        <div class="text-sm text-grey-darker">
          <time :datetime="post.data.date">
            {{ post.data.date | date(post.data.language) }}
          </time>
          <span class="mx-1">•</span>
          <span :title="post.data.readingTime.text">{{ post.data.readingTime.text }}</span>
        </div>
        <a :href="post.data.path"
           class="text-xl font-semibold">
          {{ post.data.title }}
        </a>
        <p v-if="post.data.summary"
           class="text-base text-grey-darker mt-2">{{ post.data.summary }}</p>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  props: ['data'],
};
</script>
