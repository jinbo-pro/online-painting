<template>
  <el-row class="inner_content">
    <el-col :span="16">
      <div class="top_message ac">
        <div>Hey {{ userInfo.name }}, come to meet your CONNECT for</div>
        <div class="time_box">jan 2 - 9, 2023</div>
      </div>
      <div class="top_message ac">
        <div>{{ cpUserInfo.name }} is expecting your creative piece in</div>
        <div class="time_box">3 day 5 hours</div>
      </div>
      <div class="jac">
        <div class="left_max jac">
          <el-avatar style="width: 16.1vw; height: 16.1vw" :src="cpUserInfo.photo"></el-avatar>
          <div class="message_box ml-24">
            <div class="mb-12">Hey, I am</div>
            <div class="user_name">{{ cpUserInfo.name }}</div>
            <p class="about_title">{{ cpUserInfo.officeName }}</p>
            <div class="about_info">{{ cpUserInfo.remarks }}</div>
            <div v-if="currentStatus == 2" class="foot_btn jac mt-24">Switch</div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col v-if="currentStatus == 2" :span="8" class="right_info_max">
      <div class="md_title">Ready to go?</div>
      <div class="jsb ac">
        <div>Deadline in</div>
        <div class="time_box">3 days 5 hours 30 mins</div>
      </div>
      <div class="jsb ac mt-12">
        <div>CONNECT with</div>
        <div class="user_name">{{ cpUserInfo.name }}</div>
      </div>
      <div class="mt-24">Your Mission:</div>
      <div class="md_title">{{ updatePrompt.activity }}</div>
      <el-radio-group v-model="promptIndex">
        <div v-for="(item, index) in discoverDrawList" :key="index" class="item_select_discover">
          <el-radio :label="item.id">{{ item.body }}</el-radio>
        </div>
      </el-radio-group>
      <div class="md_title">Thinking Guide</div>
      <p>{{ selectThinkingGuide }}</p>
      <div class="jac mt-32 pb-32">
        <el-button class="start_drawing" type="success" @click="setPromptHandle"> Start Drawing </el-button>
      </div>
    </el-col>
    <el-col v-if="currentStatus == 3" :span="8" class="right_info_max">
      <div class="mt-24">Your Mission:</div>
      <div class="md_title">{{ updatePrompt.activity }}</div>
      <p>{{ updatePrompt.body }}</p>
      <div class="cover_box jac">
        <el-image class="cover" :src="cpUserInfo.userDrawPath" lazy></el-image>
      </div>
      <div class="jac mt-32 pb-32">
        <el-button class="start_drawing" type="success" @click="linkPage">Edit my draft</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { currentConnect, getPromptByTopic, setPrompt } from '@/apiList/api_v1'
export default {
  data() {
    return {
      editType: 'create',
      promptIndex: '10',
      discoverDrawList: [],
      userInfo: {
        photo: '',
        name: '',
        officeName: '',
        remarks: ''
      },
      // 匹配的人
      cpUserInfo: {
        photo: '',
        name: '',
        officeName: '',
        remarks: ''
      },
      updatePrompt: {
        id: '',
        activity: '',
        body: ''
      },
      currentStatus: 2
    }
  },
  computed: {
    selectThinkingGuide() {
      const cur = this.discoverDrawList.find((x) => x.id == this.promptIndex)
      return cur ? cur.thinkingGuide : ''
    }
  },
  created() {
    this.getInitData()
  },
  methods: {
    async getInitData() {
      const res = await currentConnect({})
      if (!res) return
      Object.assign(this.userInfo, res.user)
      Object.assign(this.cpUserInfo, res.connectUser)
      // this.currentStatus = res.currentStatus
      // if (res.currentStatus > 3) {
      //   this.$router.push('/drawDoneDiscuss')
      //   return
      // }
      if (res.currentStatus == 3) {
        // 编辑已有连接
        Object.assign(this.updatePrompt, res.prompt)
      } else {
        // 配置新连接
        const promp = await getPromptByTopic({ topic: res.prompt.topic })
        Object.assign(this.updatePrompt, res.prompt)
        this.discoverDrawList = promp.list
      }
    },
    async setPromptHandle() {
      const cur = this.discoverDrawList.find((x) => x.id == this.promptIndex)
      await setPrompt({ promptId: cur.id, connectId: this.userInfo.connectId })
      this.linkPage()
    },
    linkPage() {
      this.$router.push({
        path: '/createNewPainting',
        query: { id: this.updatePrompt.id }
      })
    }
  }
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
.left_max {
  margin-top: 36px;
  .message_box {
    width: 40%;
    .user_name {
      color: #7da453;
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 8px;
    }
    .about_title {
      font-size: 22px;
      font-weight: bold;
    }
    .about_info {
      color: #8d8d8d;
      font-size: 12px;
    }
    .foot_btn {
      border: 2px solid #7da453;
      border-radius: 24px;
      cursor: pointer;
      width: 129px;
      height: 32px;
      color: #7da453;
      font-size: 20px;
    }
  }
}
.inner_content {
  height: 100%;
}
.right_info_max {
  height: 100%;
  padding: 0 16px;
  box-shadow: -2px 0px 4px rgba(0, 0, 0, 0.05);
  .user_name {
    color: #7da453;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 8px;
  }
}
.item_select_discover {
  padding: 8px 0;
}
.start_drawing {
  width: 50%;
  padding: 12px;
  border-radius: 32px;
}
.cover_box {
  height: 270px;
  border-radius: 20px;
  overflow: hidden;
  .cover {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
