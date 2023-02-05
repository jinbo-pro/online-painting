<template>
  <div class="draw_container">
    <iframe
      class="draw_content"
      src="http://ec2-35-88-251-74.us-west-2.compute.amazonaws.com:8080"
      title="viva drawing board"
    ></iframe>
  </div>
</template>

<script>
// 对接 外部作画
export default {
  name: 'Draw',
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.draw_container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  border: 2px dashed #8d8d8d;
  border-radius: 20px;
  .draw_content {
    width: 100%;
    height: 100%;
    border: none;
  }
}
</style>
