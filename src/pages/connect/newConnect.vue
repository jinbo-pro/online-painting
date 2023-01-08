<template>
  <div class="container">
    <el-row>
      <el-col :span="12">
        <div class="ac">
          <el-button class="time_btn">Woohoo! Match time!</el-button>
          <div class="ml-16">Week 1: Jan 2 - 9, 2023</div>
        </div>
        <p class="mt-32">Hi Seb, you are matched with Ben this week!</p>
        <div class="jac">
          <div class="left_max ac">
            <img src="@/assets/logo.png" />
            <div class="message_box ml-16">
              <div class="user_name">BEN</div>
              <div class="user_name">GREEN</div>
              <p class="about_title">MARKETING MANAGER</p>
              <div class="about_info">
                Hi, I've been in the marketing team for 3 years. I like playing with my dog after work (sometimes durign
                work)
              </div>
              <div class="email mt-24">ben@company.com</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        Your Mission:
        <div class="md_title">Discover and draw:</div>
        <el-radio-group v-model="radio">
          <div v-for="(item, index) in discoverDrawList" :key="index" class="item_select_discover">
            <el-radio :label="item.value">{{ item.label }}</el-radio>
          </div>
        </el-radio-group>
        <div class="md_title">Deadline: by Wed noon.</div>
      </el-col>
    </el-row>
    <div class="jac mt-32">
      <el-button class="time_btn">Go to drawing</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: 2,
      discoverDrawList: [
        { label: 'Fantasy trip', value: 1 },
        { label: 'Amazing journey', value: 2 },
        { label: 'Spiritual animal', value: 3 }
      ]
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.time_btn {
  color: #fff;
  border-radius: 32px;
  padding: 12px 32px;
  background-color: #ff4f63;
}
.left_max {
  width: 80%;
  .message_box {
    .user_name {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 8px;
    }
    .about_info {
      font-size: 12px;
    }
  }
}
.item_select_discover {
  padding: 8px 0;
}
</style>
