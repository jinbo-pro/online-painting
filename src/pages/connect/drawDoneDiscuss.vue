<template>
  <div>
    <el-row class="inner_content">
      <el-col :span="14">
        <div class="top_message ac">
          <div>Hey Chelsea, here’s your CONNECT for</div>
          <div class="time_box">jan 2 - 9, 2023</div>
        </div>
        <div class="user_list_max mt-16">
          <div v-for="e in userList" :key="e.id" class="paint_item mb-32">
            <PaintingItem :item="e" :showLookRange="true" />
          </div>
        </div>
      </el-col>
      <!-- 时间没到联系 -->
      <el-col v-if="pageType == 1" :span="10" class="right_info_max">
        <div class="md_title">Before you finish</div>
        <div class="jsb ac">
          <div>Deadline in</div>
          <div class="time_box">3 days 5 hours 30 mins</div>
        </div>
        <p>Maybe you want to discuss and guess each other’s drawing. Start a quick chat with</p>

        <div class="chat_max">
          <ChatRoom v-if="grId" :grId="grId" />
        </div>

        <div class="jac mt-32">
          <el-button class="start_drawing" type="success" @click="pageType = 2">Complete Task</el-button>
        </div>
      </el-col>
      <!-- 匹配失败展示 -->
      <el-col v-if="pageType == 2" :span="10" class="right_info_max">
        <div class="md_title">Mission failed</div>
        <div class="jsb ac">
          <div>Deadline in</div>
          <div class="time_box">0 days 0 hours 0 mins</div>
        </div>
        <p>Don’t worry! You could start a new trial!</p>
        <div class="chat_max not_point"></div>
        <div class="jac mt-32">
          <el-button class="start_drawing" type="success" @click="$router.push('/myConnect')">
            Start new CONNECT
          </el-button>
        </div>
      </el-col>
      <!-- 作画完成 -->
      <el-col v-if="pageType == 3" :span="10" class="right_info_max">
        <div class="md_title">Mission completed 🌟</div>
        <div class="jsb ac">
          <div>Mission finished</div>
          <div class="time_box">0 days 0 hours 0 mins</div>
        </div>
        <div class="pb-32"></div>
        <div class="chat_max">
          <ChatRoom />
        </div>
        <div class="jac mt-32">
          <el-button class="start_drawing" @click="pageType = 3">Exit</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ChatRoom from '@/components/ChatRoom.vue'
import PaintingItem from '@/components/Painting/PaintingItem.vue'
import { currentConnect } from '@/apiList/api_v1'
export default {
  components: {
    ChatRoom,
    PaintingItem
  },
  data() {
    return {
      pageType: 1,
      radio: 2,
      userList: [],
      grId: ''
    }
  },
  created() {
    this.pageType = this.$route.query.pageType || 1
    currentConnect({}).then((res) => {
      this.userList = [res.user, res.connectUser]
      this.grId = res.user.grId
    })
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.top_message {
  font-size: 20px;
  font-weight: bold;
  margin-right: 6px;
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
}
.not_point {
  border: none;
}
.start_drawing {
  width: 50%;
  padding: 12px;
  border-radius: 32px;
}
.user_list_max {
  .paint_item {
    width: 350px;
  }
}
</style>
