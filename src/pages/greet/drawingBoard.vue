<template>
  <div class="mid_container">
    <el-row class="inner_content">
      <el-col :span="16" class="max_h">
        <div class="max_h pd-16">
          <Draw />
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
        <div class="fdc jac mt-32">
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
import { getPromptByActivity, greetSubmit } from '@/apiList/api_v1'
export default {
  components: {
    Draw
  },
  data() {
    return {
      promptInfo: {
        activity: '',
        body: '',
        drawingGuide: ''
      }
    }
  },
  created() {
    const activity = this.$route.query.activity
    getPromptByActivity({ activity }).then((res) => {
      Object.assign(this.promptInfo, res)
    })
  },
  methods: {
    async saveHandle() {
      await this.$confirm('Draft save？', 'Tips', { type: 'warning' })
      // await connectSave({ id: this.connectId })
      this.$message.success('Saved successfully')
    },
    async submitHandle() {
      const res = await greetSubmit({ code: 'greet', promptId: this.promptInfo.id })
      this.$router.push({
        path: '/individualGreetComplete',
        query: { id: res.id }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
