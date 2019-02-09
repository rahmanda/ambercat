<template>
  <div>
    <div v-html="content"/>
    <button type="button" @click="add">{{ count }}</button>
  </div>
</template>

<script>
export default {
  props: ['content'],
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    add() {
      this.count += 1;
    },
  },
}
</script>
