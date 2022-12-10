<template>
  <div class="container">
    <div class="ac">
      <PageNavigator />
      <div class="title ml-24">Prepare your AI canvas</div>
    </div>
    <el-row class="content_max">
      <el-col :span="8" class="box fdc jsb ac">
        <div class="title top">Canvas mode</div>
        <div v-for="(item, index) in leftSelectModeList" :key="index" class="select_mode">
          <label class="select_label fdc jac">
            <el-radio v-model="activeMode" :label="item.value" class="radio"></el-radio>
            <img class="mb-16" :src="item.icon" alt="" />
            <div class="title">{{ item.title }}</div>
          </label>
        </div>
      </el-col>
      <el-col :span="16" class="box fdc jsb ac">
        <div class="title top jac">Do you want to draw for</div>
        <div class="right_type fw jac">
          <div v-for="(item, index) in drawModeList" :key="index" class="item_type_box fw jac">
            <div class="item_type">
              <label class="select_label fdc jac">
                <el-radio v-model="activeType" :label="item.value" class="radio"></el-radio>
                <img :src="item.icon" alt="" />
              </label>
            </div>
            <div>{{ item.title }}</div>
          </div>
        </div>
        <div class="foot_btn jac">
          <el-button type="primary">Let's draw!</el-button>
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
      activeMode: 1,
      leftSelectModeList: [
        { value: 1, title: 'By myself', icon: require('@/assets/draw-mode/1.png') },
        { value: 2, title: 'With someone', icon: require('@/assets/draw-mode/2.png') }
      ],
      activeType: 1
    }
  },
  computed: {
    drawModeList() {
      if (this.activeMode == 1) {
        return [
          { value: 1, title: 'Self Relfection', icon: require('@/assets/draw-mode/3.png') },
          { value: 2, title: 'Greetings for athers', icon: require('@/assets/draw-mode/4.png') },
          { value: 3, title: 'Stress-relief games', icon: require('@/assets/draw-mode/5.png') }
        ]
      } else {
        return [
          { value: 21, title: 'Getting to connect with a new person', icon: require('@/assets/draw-mode/2.png') },
          { value: 22, title: 'Crafting a group greeting', icon: require('@/assets/draw-mode/4.png') },
          { value: 23, title: 'Quick games with the team', icon: require('@/assets/draw-mode/5.png') },
          { value: 24, title: 'Team-building games', icon: require('@/assets/draw-mode/6.png') }
        ]
      }
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.content_max {
  height: calc(100% - 80px);
  .top {
    font-size: 18px;
  }
  .select_mode {
    width: 90%;
    height: 40%;
    position: relative;
    border: 1px solid #f1f1f1;
    .title {
      font-size: 22px;
    }
  }
  .select_label {
    width: 100%;
    height: 100%;
    ::v-deep .el-radio__label {
      color: transparent;
    }
  }
  .radio {
    position: absolute;
    top: 16px;
    left: 16px;
  }
  .foot_btn {
    margin-bottom: 45px;
  }
}
.box {
  height: 100%;
  border: 1px solid #f1f1f1;
  box-sizing: border-box;
  padding: 16px 0;
}
.right_type {
  .item_type_box {
    width: 42%;
  }
  .item_type {
    width: 300px;
    position: relative;
    height: 18vh;
    box-sizing: border-box;
    padding: 16px;
    margin: 16px;
    border: 1px solid #e1e1e1;
  }
}
</style>
