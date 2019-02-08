<template>
  <router-view v-bind="$props"/>
</template>

<script>
export default {
  props: ['url', 'content'],
}
</script>
