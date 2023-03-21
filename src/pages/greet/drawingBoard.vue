<template>
  <div class="mid_container">
    <el-row class="inner_content">
      <el-col :span="16" class="max_h">
        <div class="draw_h draw_inner_box">
          <Draw @drawingReady="drawingReady" />
        </div>
      </el-col>
      <el-col :span="8" class="right_info_max">
        <div class="mt-24">Your Mission:</div>
        <div class="md_title">{{ promptInfo.topic }}</div>
        <div class="xs_title">{{ promptInfo.activity }}</div>
        <div class="line_x"></div>
        <div class="xs_title">Thinking Guide</div>
        <p>{{ promptInfo.body }}</p>
        <div class="xs_title">Drawing Guide</div>
        <p>{{ promptInfo.drawingGuide }}</p>
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
import { greetSave, greetSubmit, getPromptByActivity } from '@/apiList/api_v1'
import { useGetDrawingDraftData, useGetDrawingSubmitData, useLoadDraftDrawing } from '@/hooks/drawingData'
export default {
  components: {
    Draw
  },
  data() {
    return {
      draftImageData: '',
      promptInfo: {
        activity: '',
        body: '',
        drawingGuide: ''
      },

      promptId: '',
      drawId: '',
      greetId: '',

      submitLoading: false
    }
  },
  created() {
    const activity = this.$route.query.activity
    getPromptByActivity({ activity }).then((res) => {
      this.promptId = res.id
      Object.assign(this.promptInfo, res)
    })
    if (this.$route.query.id) {
      this.drawId = ''
      this.greetId = ''
    }
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

      const info = await greetSave({
        drawId: this.drawId,
        greetId: this.greetId,
        promptId: this.promptId,
        ...draftData
      })
      this.drawId = info.drawId
      this.greetId = info.greetId
      this.$message.success('Saved successfully')
    },
    async submitHandle() {
      const draftData = await useGetDrawingSubmitData()
      console.log('Drawing Submit data', draftData)

      if (!draftData || !draftData.draft) {
        this.$message.error('useGetDrawingSubmitData result empty')
        return
      }

      const info = await greetSubmit({
        drawId: this.drawId,
        greetId: this.greetId,
        promptId: this.promptId,
        ...draftData
      })
      this.$router.push({
        path: '/individualGreetComplete',
        query: {
          drawId: info.drawId,
          greetId: info.greetId,
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.draw_h {
  height: calc(100% - 10px);
}
.draw_inner_box {
  padding: 0 10px;
}
.inner_content {
  height: 100%;
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
