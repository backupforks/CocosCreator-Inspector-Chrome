<template>
  <div>
    <el-button @click="onClick">devtools</el-button>
  </div>
</template>

<script>
  export default {
    name: "index",
    methods: {
      onClick() {
        console.log("devtools");
      }
    }
  }
</script>

<style scoped>

</style>
