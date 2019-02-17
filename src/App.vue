<template>
  <div id="app">
    <router-view :content="content" :data="data"/>
  </div>
</template>

<script>
export default {
  props: ['content', 'data'],
}
</script>
