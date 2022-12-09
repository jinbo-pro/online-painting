<template>
  <div class="container">
    <div class="ac">
      <PageNavigator />
      <div class="title ml-24">Prepare your AI canvas</div>
    </div>
    <el-row class="content_max">
      <el-col :span="8" class="box fdc jsa ac">
        <div>Canvas mode</div>
        <div v-for="(item, index) in leftSelectModeList" :key="index" class="select_mode fdc jac">
          <el-radio v-model="item.selct" class="radio"></el-radio>
          <img class="mb-16" :src="item.icon" alt="" />
          <div>{{ item.title }}</div>
        </div>
      </el-col>
      <el-col :span="16" class="box">
        <div>Do you want to draw for</div>
        <div v-for="(item, index) in drawModeList" :key="index">
          <img :src="item.icon" alt="" />
          <div>{{ item.title }}</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PageNavigator from '@/components/PageNavigator.vue'
export default {
  components: {
    PageNavigator
  },
  data() {
    return {
      leftSelectModeList: [
        { selct: false, title: 'By myself', icon: require('@/assets/draw-mode/1.png') },
        { selct: false, title: 'With someone', icon: require('@/assets/draw-mode/2.png') }
      ],
      drawModeList: [
        { title: 'Self Relfection', icon: require('@/assets/draw-mode/3.png') },
        { title: 'Greetings for athers', icon: require('@/assets/draw-mode/4.png') },
        { title: 'Stress-relief games', icon: require('@/assets/draw-mode/5.png') }
      ]
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.content_max {
  height: calc(100% - 80px);
  .select_mode {
    width: 90%;
    height: 40%;
    position: relative;
    border: 1px solid #f1f1f1;
    .radio {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
.box {
  height: 100%;
  border: 1px solid #f1f1f1;
  box-sizing: border-box;
}
</style>
