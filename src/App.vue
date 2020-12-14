<template>
  <div class="main">
    <h3>EMP Vue2 App</h3>
    <Content @handlerClick="handlerClick" />
  </div>
</template>

<script>
import Content from "@emp/vue2Base/HellowWorld.vue";
export default {
  components: {
    Content,
  },
  methods: {
    handlerClick(item) {
      console.log('in project', item)
    }
  }
};
</script>

<style scoped>
.main {
  text-align: center;
}

img {
  width: 200px;
}

h1 {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
