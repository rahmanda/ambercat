<template>
  <div id="app">
    <router-view v-bind="$props"/>
  </div>
</template>

<script>
export default {
  props: ['url', 'content'],
}
</script>
