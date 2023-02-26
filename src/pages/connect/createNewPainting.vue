<template>
  <div class="mid_container">
    <el-row class="inner_content">
      <el-col :span="16" class="max_h">
        <div class="ac xs_title top_message">
          <div class="time_box mr-14">3 days 5 hours 30 mins</div>
          CONNECT with
          <div class="user_name ml-14">{{ cpUserInfo.name }}</div>
        </div>
        <div class="draw_h pd-16">
          <Draw @loadDone="loadDone" />
        </div>
      </el-col>
      <el-col :span="8" class="right_info_max">
        <div class="mt-24">Your Mission:</div>
        <div class="md_title">{{ updatePrompt.activity }}</div>
        <div class="xs_title">{{ updatePrompt.body }}</div>
        <div class="line_x"></div>
        <div class="xs_title">Thinking Guide</div>
        <p>{{ updatePrompt.thinkingGuide }}</p>
        <div class="xs_title">Drawing Guide</div>
        <p>{{ updatePrompt.drawingGuide }}</p>
        <div class="fdc jac mt-32">
          <!-- <el-button class="start_drawing" @click="loadDone"> test load draft </el-button> -->
          <el-button class="start_drawing" @click="saveHandle"> Save </el-button>
          <el-button class="start_drawing" type="success" style="margin-left: 0" @click="submitHandle">
            Submit
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Draw from '@/components/Draw.vue'
import { connectSave, connectSubmit, currentConnect } from '@/apiList/api_v1'
import { useGetDrawingSubmitData, useGetDrawingDraftData, useLoadDraftDrawing } from '@/hooks/drawingData'

export default {
  components: {
    Draw
  },
  data() {
    return {
      drawId: '',
      connectId: '',
      updatePrompt: {
        id: '',
        activity: '',
        body: ''
      },
      cpUserInfo: {
        name: ''
      },
      draftImageData: ''
    }
  },
  created() {
    this.getInitConnectData()
  },
  methods: {
    loadDone() {
      if (this.draftImageData) {
        // 画板渲染完成 加载画作
        console.log('load draft')
        setTimeout(() => {
          // TODO 此处应该在画板准备就绪之后调用，目前写成延迟简单处理一下
          useLoadDraftDrawing(this.draftImageData)
        }, 800)
      }
    },
    getInitConnectData() {
      currentConnect({}).then((res) => {
        this.drawId = res.user.drawId
        this.connectId = res.user.connectId
        Object.assign(this.updatePrompt, res.prompt)
        Object.assign(this.cpUserInfo, res.connectUser)
        this.draftImageData = res.user.draft
      })
    },
    async saveHandle() {
      try {
        await this.$confirm('Draft save?', 'Tips', { type: 'warning' })
        const draftData = await useGetDrawingDraftData()
        console.log('Drawing draft data', draftData)

        // save 返回的格式应该是 object 这里暂时测试用
        const data = typeof draftData == 'string' ? { draft: draftData } : draftData

        await connectSave({ drawId: this.drawId, connectId: this.connectId, ...data })
        this.$message.success('Saved successfully')
      } catch (e) {
        console.error(e)
      }
    },
    async submitHandle() {
      try {
        await this.$confirm('Draft submit?', 'Tips', { type: 'warning' })
        const draftData = await useGetDrawingSubmitData()
        console.log('Drawing Submit data', draftData)

        await connectSubmit({ drawId: this.drawId, connectId: this.connectId, ...draftData })
        this.$router.push({
          path: '/drawDoneDiscuss',
          query: {
            drawId: this.drawId,
            connectId: this.connectId
          }
        })
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.inner_content {
  height: 100%;
}

.draw_h {
  height: calc(100% - 78px);
}

.top_message {
  .time_box {
    font-size: 12px;
    padding: 4px 6px;
    border-radius: 16px;
    box-sizing: border-box;
    font-weight: normal;
    border: 1px solid #daddb4;
  }

  .user_name {
    color: #7da453;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 8px;
  }
}

.right_info_max {
  height: 100%;
  padding: 0 16px;
  box-shadow: -2px 0px 4px rgba(0, 0, 0, 0.05);
}

.start_drawing {
  width: 50%;
  padding: 12px;
  border-radius: 32px;
  margin-bottom: 16px;
}
</style>
