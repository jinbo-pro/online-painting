<template>
  <div class="draw_container">
    <iframe :id="drawingBoardId" class="draw_content" :src="drawingBoardValidUrl" title="viva drawing board"></iframe>
  </div>
</template>

<script>
import { drawingBoardId, drawingBoardValidUrl } from '@/config/constants'
export default {
  name: 'Draw',
  data() {
    return {
      drawingBoardId,
      drawingBoardValidUrl
    }
  },
  created() {},
  mounted() {
    // load 监听 iframe 渲染完成
    const iframe = document.getElementById(drawingBoardId)
    iframe.addEventListener('load', () => this.$emit('loadDone', iframe), true)
    // drawingReady 监听画板准备就绪
    window.addEventListener(
      'message',
      (event) => {
        console.log(event.data, 'drawing ready')
        if (event.data === 'ready') {
          this.$emit('drawingReady', event.data)
        }
      },
      false
    )
  },
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
