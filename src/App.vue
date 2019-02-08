<template>
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>Hello</title>
      <meta charset="UTF-8">
    </head>
    <body>
      <!--vue-ssr-outlet-->
      <router-view v-bind="$props"/>
    </body>
  </html>
</template>

<script>
export default {
  props: ['url', 'content'],
}
</script>
