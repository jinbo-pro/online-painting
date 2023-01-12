<template>
  <div class="container">
    <div class="md_title">Topic of the week (ongoing)</div>
    <div class="jac">
      <el-image class="left_cover" src="http://www.ruanyifeng.com/images_pub/pub_1.jpg"></el-image>
      <div class="ml-16">
        <p>Weekly progress</p>
        <div class="step_max">
          <div class="step_inner_bgc" :style="{ width: stepBgcLang }"></div>
          <div class="bar_max jsb ac">
            <div
              v-for="(item, index) in barList"
              :key="item.id"
              :class="['bar', { active_bar: activeStep > index }]"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PaintingItem from '@/components/Painting/PaintingItem.vue'
import { listData } from '@/utils/mock'
export default {
  components: {
    PaintingItem
  },
  data() {
    return {
      isDone: 1,
      radio: 2,
      barList: [],
      formData: {
        emoji: '',
        notes: ''
      },
      activeStep: 3
    }
  },
  computed: {
    stepBgcLang() {
      return (600 / 7) * this.activeStep + 'px'
    }
  },
  created() {
    this.barList = listData(7)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.left_cover {
  width: 302px;
  height: 227px;
  border-radius: 20px;
}

.step_max {
  width: 600px;
  height: 24px;
  border: 1px solid #e1e1e1;
  box-sizing: border-box;
  box-shadow: 0px 1px 1px rgba(125, 164, 83, 0.3), inset 0px 1px 1px rgba(48, 48, 48, 0.1);
  position: relative;
  .step_inner_bgc {
    top: 0;
    left: 0;
    z-index: 10;
    position: absolute;
    height: 24px;
    width: 0;
    background-color: #7da453;
  }
  .bar_max {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 20;
  }
  .bar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    transform: translateY(-25%);
  }
  .active_bar {
    background-color: #7da453;
  }
}
</style>
