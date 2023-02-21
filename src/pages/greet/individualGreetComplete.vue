<template>
  <div>
    <el-row class="inner_content">
      <el-col :span="16">
        <div class="md_title">{{ prompt.topic }}</div>
        <div class="top_message ac">
          <div>{{ prompt.activity }}</div>
          <div class="time_box">{{ paintingInfo.createDate | enDate }}</div>
        </div>
        <div class="user_list_max mt-32">
          <PaintingItem :item="paintingInfo" :showLookRange="true" />
        </div>
      </el-col>
      <el-col :span="8" class="right_info_max">
        <div class="md_title">Before you finish</div>

        <p>Add a personal note to your colleage!</p>
        <p class="item_label">Send to</p>
        <el-input v-model="formData.emoji" placeholder="Search for colleage"></el-input>

        <p class="item_label">Add a personal notes</p>
        <el-input v-model="formData.notes" type="textarea" :rows="3" placeholder="Search for colleage"></el-input>
        <div class="ac mt-24 mb-24 swag_link" @click="completeSwag">
          <div class="complete ml-12 item_label">complete without a swag</div>
        </div>
        <div class="jac mt-32">
          <el-button class="start_drawing" type="success" @click="$router.push('/shoppingMall')">
            <svg-icon width="14px" height="14px" icon-class="greetSwag"></svg-icon>
            <span class="ml-32">Add a swag for free</span>
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PaintingItem from '@/components/Painting/PaintingItem.vue'
import { local } from '@/utils/storage'
import { greetGetById } from '@/apiList/api_v1'
export default {
  components: {
    PaintingItem
  },
  data() {
    return {
      isDone: 1,
      radio: 2,
      formData: {
        emoji: '',
        notes: ''
      },
      paintingInfo: {
        name: '',
        createDate: '',
        photo: '',
        path: '',
        title: '',
        lookRange: false
      },
      prompt: {
        topic: '',
        activity: '',
        body: '',
        drawingGuide: '',
      }
    }
  },
  created() {
    const u = local.get('userInfo')
    this.paintingInfo.name = u.name
    this.paintingInfo.photo = u.photo
    greetGetById({ id: this.$route.query.id }).then((res) => {
      Object.assign(this.prompt, res.prompt)
      this.paintingInfo.path = res.userDrawPath
      this.paintingInfo.title = res.prompt.activity
      this.paintingInfo.createDate = res.createDate
    })
  },
  methods: {
    async completeSwag() {
      await this.$confirm('Complete Swag？', 'Tips', { type: 'warning' })
      // await connectSave({ id: this.connectId })
      this.$message.success('Complete successfully')
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

.inner_content {
  height: 100%;
}
.right_info_max {
  height: 100%;
  padding: 0 16px;
  box-shadow: -2px 0px 4px rgba(0, 0, 0, 0.05);
}
.swag_link {
  cursor: pointer;
}
.start_drawing {
  width: 50%;
  padding: 12px;
  border-radius: 32px;
}
.item_label {
  font-size: 16px;
  font-weight: bold;
}
.complete {
  text-decoration-line: underline;
}
</style>
