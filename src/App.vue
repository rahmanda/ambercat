<template>
  <div id="app">
    <div class="bg-indigo h-1"/>
    <nav class="max-w-md mx-auto py-2 px-8 text-base whitespace-nowrap overflow-y-auto">
      <a class="mr-4" href="/">Home</a>
    </nav>
    <router-view :content="content" :data="data"/>
  </div>
</template>

<script>
export default {
  props: ['content', 'data'],
}
</script>
