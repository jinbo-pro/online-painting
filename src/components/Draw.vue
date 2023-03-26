<template>
  <div :class="['draw_container', { full_screen: isFullScreen }]">
    <div class="right_close">
      <i v-if="isFullScreen" @click="isFullScreen = false" class="el-icon-close"></i>
      <i v-else @click="isFullScreen = true" class="el-icon-full-screen"></i>
    </div>
    <iframe :id="drawingBoardId" class="draw_content" :src="drawingBoardValidUrl" title="viva drawing board"></iframe>
  </div>
</template>

<script>
import { drawingBoardId, drawingBoardValidUrl } from '@/config/constants'
export default {
  name: 'Draw',
  data() {
    return {
      isFullScreen: false,
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
  position: relative;
  .draw_content {
    width: 100%;
    height: 100%;
    border: none;
  }
}
.full_screen {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  box-sizing: border-box;
  // zIndex 最大不要超过 2000 以保证 element 的 dialog 正常显示
  z-index: 1000;
  padding-right: 60px;
  background-color: #fbfbfb;
  border: none;
}
.right_close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 45px;
  border-radius: 10px;
  box-shadow: 6px 2px 2px #cfcfcf;
}
</style>
