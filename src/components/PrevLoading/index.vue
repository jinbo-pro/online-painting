<template>
  <div v-show="show" class="loading-prev" :style="{ zIndex: index }">
    <div class="loading-prev-box">
      <div class="loading-prev-box-warp">
        <div v-for="e in 9" :key="e" class="loading-prev-box-item"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageLoading',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 500
    }
  }
}
</script>

<style lang="scss" scoped>
.loading-prev {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #ffffff;
}
.loading-prev .loading-prev-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.loading-prev .loading-prev-box-warp {
  width: 80px;
  height: 80px;
}
.loading-prev .loading-prev-box-warp .loading-prev-box-item {
  width: 33.333333%;
  height: 33.333333%;
  background: #409eff;
  float: left;
  animation: loading-prev-animation 1.2s infinite ease;
  border-radius: 1px;
}
.loading-prev .loading-prev-box-warp .loading-prev-box-item:nth-child(7) {
  animation-delay: 0s;
}
.loading-prev .loading-prev-box-warp .loading-prev-box-item:nth-child(4),
.loading-prev .loading-prev-box-warp .loading-prev-box-item:nth-child(8) {
  animation-delay: 0.1s;
}
.loading-prev .loading-prev-box-warp .loading-prev-box-item:nth-child(1),
.loading-prev .loading-prev-box-warp .loading-prev-box-item:nth-child(5),
.loading-prev .loading-prev-box-warp .loading-prev-box-item:nth-child(9) {
  animation-delay: 0.2s;
}
.loading-prev .loading-prev-box-warp .loading-prev-box-item:nth-child(2),
.loading-prev .loading-prev-box-warp .loading-prev-box-item:nth-child(6) {
  animation-delay: 0.3s;
}
.loading-prev .loading-prev-box-warp .loading-prev-box-item:nth-child(3) {
  animation-delay: 0.4s;
}
@keyframes loading-prev-animation {
  0%,
  70%,
  100% {
    transform: scale3D(1, 1, 1);
  }
  35% {
    transform: scale3D(0, 0, 1);
  }
}
</style>
