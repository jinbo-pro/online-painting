<template>
  <div class="container">
    <el-row class="inner_content">
      <el-col :span="14">
        <div class="top_message ac">
          <div>Hey Chelsea, here’s your CONNECT for</div>
          <div class="time_box">jan 2 - 9, 2023</div>
        </div>
        <div class="user_list_max mt-32">
          <div v-for="e in userList" :key="e.id" class="mb-32">
            <PaintingItem :item="e" :showLookRange="true" />
          </div>
        </div>
      </el-col>
      <el-col v-if="isDone == 1" :span="10" class="right_info_max">
        <div class="md_title">Before you finish</div>
        <div class="jsb ac">
          <div>Deadline in</div>
          <div class="time_box">3 days 5 hours 30 mins</div>
        </div>
        <p>Maybe you want to discuss and guess each other’s drawing. Start a quick chat with</p>

        <div class="chat_max jac"></div>

        <div class="jac mt-32">
          <el-button class="start_drawing" type="success" @click="isDone = 2">Start Drawing</el-button>
        </div>
      </el-col>
      <el-col v-if="isDone == 2" :span="10" class="right_info_max">
        <div class="md_title">Mission failed</div>
        <div class="jsb ac">
          <div>Deadline in</div>
          <div class="time_box">0 days 0 hours 0 mins</div>
        </div>
        <p>Don’t worry! You could start a new trial!</p>
        <div class="chat_max not_point"></div>
        <div class="jac mt-32">
          <el-button class="start_drawing" type="success" @click="isDone = 3">Start new CONNECT</el-button>
        </div>
      </el-col>
      <el-col v-if="isDone == 3" :span="10" class="right_info_max">
        <div class="md_title">Mission completed 🌟</div>
        <div class="jsb ac">
          <div>Mission finished</div>
          <div class="time_box">0 days 0 hours 0 mins</div>
        </div>
        <div class="pb-32"></div>
        <div class="chat_max"></div>
        <div class="jac mt-32">
          <el-button class="start_drawing" @click="isDone = 3">Exit</el-button>
        </div>
      </el-col>
    </el-row>
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
      userList: [],
      LogoImg: require('@/assets/logo.png'),
      discoverDrawList: [
        { label: 'L3 - Body', value: 1 },
        { label: 'Best travel experience I’ve had recently', value: 2 },
        { label: 'What is something new you’ve recently tried that changed your life ', value: 3 }
      ]
    }
  },
  created() {
    this.userList = listData(2)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.top_message {
  font-size: 20px;
  font-weight: bold;
  margin-right: 6px;
  margin-bottom: 8px;
}
.time_box {
  font-size: 12px;
  padding: 4px 6px;
  margin-left: 16px;
  border-radius: 16px;
  box-sizing: border-box;
  font-weight: normal;
  border: 1px solid #daddb4;
}

.inner_content {
  height: 100%;
}
.right_info_max {
  height: 100%;
  padding: 0 16px;
  box-shadow: -2px 0px 4px rgba(0, 0, 0, 0.05);
}

.chat_max {
  width: 100%;
  height: 374px;
  border-radius: 20px;
  box-sizing: border-box;
  border: 1px solid rgba(141, 141, 141, 0.5);
}
.not_point {
  border: none;
}
.start_drawing {
  width: 50%;
  padding: 12px;
  border-radius: 32px;
}
</style>
