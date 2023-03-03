<template>
  <div>
    <el-row class="inner_content">
      <el-col :span="16">
        <div class="top_message ac">
          <div>Hey {{ userInfo.name }}, here’s your CONNECT for</div>
          <div class="time_box">{{ userInfo.createDate | enDate }} - {{ userInfo.intendedDate | enDate }}</div>
        </div>
        <div class="user_list_max mt-16">
          <div v-for="e in userList" :key="e.id" class="paint_item mb-32">
            <PaintingItem :item="e" :showLookRange="true" />
          </div>
        </div>
      </el-col>
      <!-- 时间没到联系 -->
      <el-col v-if="currentStatus == 6" :span="8" class="right_info_max">
        <div class="md_title">Before you finish</div>
        <div class="jsb ac">
          <div>Deadline in</div>
          <div class="time_box">{{ timeDistanceStr }}</div>
        </div>
        <p>Maybe you want to discuss and guess each other’s drawing. Start a quick chat with</p>

        <div class="chat_max">
          <ChatRoom v-if="grId" :grId="grId" />
        </div>

        <div class="jac mt-32">
          <el-button class="start_drawing" type="success" @click="currentStatus = 8">Complete Task</el-button>
        </div>
      </el-col>
      <!-- 匹配失败展示 -->
      <el-col v-if="currentStatus == 7" :span="8" class="right_info_max">
        <div class="md_title">Mission failed</div>
        <div class="jsb ac">
          <div>Deadline in</div>
          <div class="time_box">{{ timeDistanceStr }}</div>
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
      <el-col v-if="currentStatus == 8" :span="8" class="right_info_max">
        <div class="md_title">Mission completed 🌟</div>
        <div class="jsb ac">
          <div>Mission finished</div>
          <div class="time_box">{{ timeDistanceStr }}</div>
        </div>
        <div class="pb-32"></div>
        <div class="chat_max">
          <ChatRoom />
        </div>
        <div class="jac mt-32">
          <el-button class="start_drawing" @click="$router.push('/connectDashboard')">Exit</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ChatRoom from '@/components/ChatRoom.vue'
import PaintingItem from '@/components/Painting/PaintingItem.vue'
import { currentConnect } from '@/apiList/api_v1'
import { timeDistance } from '@/utils/jcore'
export default {
  components: {
    ChatRoom,
    PaintingItem
  },
  data() {
    return {
      radio: 2,
      userList: [],
      grId: '',
      userInfo: {
        photo: '',
        name: '',
        draft: '',
        officeName: '',
        remarks: ''
      },
      currentStatus: 6,
      timeDistanceStr: ''
    }
  },
  created() {
    currentConnect({}).then((res) => {
      const list = [res.user, res.connectUser]
      const user = res.user
       Object.assign(this.userInfo, user)
      this.timeDistanceStr = timeDistance(user.createDate, user.createTime, user.intendedDate, user.intendedTime)
      this.userList = list.map((e) => {
        return {
          ...e,
          path: e.userDrawPath
        }
      })
      this.grId = res.user.grId
      // this.currentStatus = res.currentStatus
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
  padding-bottom: 32px;
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
</style>
