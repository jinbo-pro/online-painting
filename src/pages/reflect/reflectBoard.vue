<template>
  <div class="mid_container">
    <el-row class="inner_content">
      <el-col :span="16" class="max_h">
        <div class="max_h pd-16">
          <Draw />
        </div>
      </el-col>
      <el-col :span="8" class="right_info_max">
        <div class="mt-24">Your topic:</div>
        <div class="md_title">Daily Mood</div>
        <div class="xs_title">{{ reflectInfo.activity }}</div>
        <div class="xs_title">Thinking Guide</div>
        <p>{{ reflectInfo.thinkingGuide }}</p>
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
import { getPromptByActivity } from '@/apiList/api_v1'
export default {
  components: {
    Draw
  },
  data() {
    return {
      reflectInfo: {
        activity: '',
        thinkingGuide: ''
      }
    }
  },
  created() {
    getPromptByActivity({ activity: this.$route.query.activity }).then((res) => {
      Object.assign(this.reflectInfo, res)
    })
  },
  methods: {
    async saveHandle() {
      await this.$confirm('Draft save？', 'Tips', { type: 'warning' })
      // await connectSave({ id: this.connectId })
      this.$message.success('Saved successfully')
    },
    submitHandle() {
      this.$router.push({
        path: '/reflectComplete',
        query: { id: 1 }
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
