<template>
  <main role="main">
    <h1>{{ data.title }}</h1>
    <article v-html="content"/>
  </main>
</template>

<script>
export default {
  props: ['content', 'data'],
}
</script>
