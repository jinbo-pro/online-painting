<template>
  <div class="mid_container">
    <el-row class="inner_content">
      <el-col :span="16" class="max_h">
        <div class="ac top_message">
          <div class="time_box mr-14">{{ timeDistanceStr }}</div>
          CONNECT with
          <div class="user_name ml-14">{{ cpUserInfo.name }}</div>
        </div>
        <div class="draw_h draw_inner_box">
          <Draw @drawingReady="drawingReady" />
        </div>
      </el-col>
      <el-col :span="8" class="right_info_max">
        <div class="mt-10">Your Mission:</div>
        <div class="md_title">{{ updatePrompt.activity }}</div>
        <div class="xs_title">{{ updatePrompt.body }}</div>
        <div class="line_x"></div>
        <div class="xs_title">Thinking Guide</div>
        <p>{{ updatePrompt.thinkingGuide }}</p>
        <div class="xs_title">Drawing Guide</div>
        <p>{{ updatePrompt.drawingGuide }}</p>
        <div class="fdc jac mt-32" v-loading="submitLoading">
          <el-button class="start_drawing" @click="btnHandle('save')"> Save </el-button>
          <el-button class="start_drawing" type="success" style="margin-left: 0" @click="btnHandle('submit')">
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
import { timeDistance } from '@/utils/jcore'

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
      draftImageData: '',
      timeDistanceStr: '',

      submitLoading: false
    }
  },
  created() {
    this.getInitConnectData()
  },
  methods: {
    drawingReady() {
      if (this.draftImageData) {
        // 画板渲染完成 加载画作
        console.log('load draft')
        setTimeout(() => {
          useLoadDraftDrawing(this.draftImageData)
        }, 300)
      }
    },
    getInitConnectData() {
      currentConnect({}).then((res) => {
        this.drawId = res.user.drawId
        this.connectId = res.user.connectId
        Object.assign(this.updatePrompt, res.prompt)
        Object.assign(this.cpUserInfo, res.connectUser)
        this.draftImageData = res.user.draft

        const user = res.user
        this.timeDistanceStr = timeDistance(user.createDate, user.createTime, user.intendedDate, user.intendedTime)
      })
    },
    async btnHandle(type) {
      await this.$confirm(`Draft ${type}?`, 'Tips', { type: 'warning' })
      this.submitLoading = true
      try {
        type == 'save' ? await this.saveHandle() : await this.submitHandle()
      } catch (error) {
        console.error(error)
      } finally {
        this.submitLoading = false
      }
    },
    async saveHandle() {
      const draftData = await useGetDrawingDraftData()
      console.log('Drawing draft data', draftData)

      if (!draftData || !draftData.draft) {
        this.$message.error('useGetDrawingDraftData result empty')
        return
      }

      await connectSave({ drawId: this.drawId, connectId: this.connectId, ...draftData })
      this.$message.success('Saved successfully')
    },
    async submitHandle() {
      const draftData = await useGetDrawingSubmitData()
      console.log('Drawing Submit data', draftData)

      if (!draftData || !draftData.draft) {
        this.$message.error('useGetDrawingSubmitData result empty')
        return
      }

      await connectSubmit({ drawId: this.drawId, connectId: this.connectId, ...draftData })
      this.$router.push({
        path: '/drawDoneDiscuss',
        query: {
          drawId: this.drawId,
          connectId: this.connectId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.inner_content {
  height: 100%;
}

.draw_h {
  height: calc(100% - 10px);
}
.draw_inner_box {
  padding: 0 10px;
}
.top_message {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 6px;
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
  box-sizing: border-box;
  box-shadow: -2px 0px 4px rgba(0, 0, 0, 0.05);
}

.start_drawing {
  width: 50%;
  padding: 12px;
  border-radius: 32px;
  margin-bottom: 16px;
}
</style>
