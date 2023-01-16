<template>
  <div class="draw_container"></div>
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
  min-width: 600px;
  min-height: 400px;
  box-sizing: border-box;
  overflow: hidden;
  border: 2px dashed #8d8d8d;
  border-radius: 20px;
}
</style>
