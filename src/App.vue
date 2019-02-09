<template>
  <div id="app">
    <router-view :content="content"/>
  </div>
</template>

<script>
export default {
  props: ['content'],
}
</script>
