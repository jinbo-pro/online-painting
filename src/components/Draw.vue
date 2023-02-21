<template>
  <div class="draw_container">
    <iframe
      :id="drawingBoardId"
      class="draw_content"
      src="http://localhost:8080/?whiteboardid=b8797bcc-5d3c-42ee-a4d5-6cbfb1c98346"
      title="viva drawing board"
    ></iframe>
  </div>
</template>

<script>
import { drawingBoardId } from '@/utils/constants';
// 对接 外部作画
export default {
  name: 'Draw',
  data() {
    return {
      drawingBoardId
    }
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
