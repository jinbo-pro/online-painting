<template>
  <div :style="sizeStyle" :class="['img_box', { circle: circle }]">
    <img :src="cover" />
  </div>
</template>

<script>
import { pxToView } from '@/utils/jcore'
export default {
  name: 'HeadPhoto',
  props: {
    cover: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 40
    },
    circle: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  computed: {
    sizeStyle() {
      return {
        width: pxToView(this.size),
        height: pxToView(this.size)
      }
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.img_box {
  overflow: hidden;
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
    min-width: 100%;
  }
  &.circle {
    border-radius: 50%;
  }
}
</style>
