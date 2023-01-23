<template>
  <div class="step_max">
    <div class="step_inner_bgc" :style="{ width: stepBgcLang }"></div>
    <div class="bar_max jsb ac">
      <div v-for="(item, index) in stepCount" :key="index" class="bar_box">
        <div :class="['bar', { active_bar: item == 1 }, { incomplete: item == 2 }]"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressStep',
  props: {
    progress: {
      type: Number,
      default: 0
    },
    stepCount: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  computed: {
    stepBgcLang() {
      if (!this.progress || this.progress < 0) return 0
      if (this.progress >= 100) return '100%'
      return this.progress + '%'
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
$box-h: 24px;
$bar-size: 40px;

.step_max {
  width: 100%;
  height: $box-h;
  border: 1px solid #f1f1f1;
  box-sizing: border-box;
  box-shadow: 0px 1px 1px rgba(125, 164, 83, 0.3), inset 0px 1px 1px rgba(48, 48, 48, 0.1);
  position: relative;
  .step_inner_bgc {
    top: 0;
    left: 0;
    z-index: 100;
    position: absolute;
    width: 0;
    height: $box-h;
    background-color: #7da453;
  }
  .bar_max {
    width: calc(100% + $bar-size);
    position: absolute;
    top: 0;
    left: -($bar-size / 2);
    z-index: 200;
    transform: translateY(-25%);
  }
  .bar_box {
    width: $bar-size;
    height: $bar-size;
    &:hover {
      .bar {
        animation: barAnimation 0.3s ease-in-out;
      }
    }
  }
  .bar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  .active_bar {
    background-color: #7da453;
  }
  .incomplete {
    background-color: red;
  }
}
@keyframes barAnimation {
  0% {
    transform: scale(0.9);
  }

  80% {
    transform: scale(1.1);
  }

  to {
    transform: scale(1);
  }
}
</style>
