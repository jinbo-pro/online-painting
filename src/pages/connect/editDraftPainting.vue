<template>
  <div class="mid_container">
    <el-row class="inner_content">
      <el-col :span="16" class="max_h">
        <div class="ac xs_title top_message">
          <div>Hey Chelsea, come to meet your CONNECT for</div>
          <div class="time_box ml-14">Jan 2 - 9, 2023</div>
        </div>
        <div class="ac xs_title top_message" style="padding-top: 0">
          <div class="ml-12">is expecting your creative piece in</div>
          <div class="time_box ml-14">3 days 5 hours</div>
        </div>
        <div class="draw_h pd-16">
          <Draw />
        </div>
      </el-col>
      <el-col :span="8" class="right_info_max">
        <div class="mt-24">Your Mission:</div>
        <div class="md_title">Stories and memories</div>
        <div class="xs_title">Best travel experience I’ve had recently</div>

        <div class="xs_title">Thinking Guide</div>
        <p>
          Is there a memorable moment during travel? Or any eventful story with ups and downs? Did you meet someone
          special in the trip?
        </p>

        <div class="xs_title">Drawing Guide</div>
        <p>Start with characters or items in your mind and we will generate different styles for you.</p>
        <div class="jac mt-32">
          <el-button class="start_drawing" type="success" @click="submitHandle"> Edit my draft </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/**页面-4 编辑-暂时不用 */
import Draw from '@/components/Draw.vue'
export default {
  components: {
    Draw
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    linkPage() {
      this.$router.push({
        path: '/editDraftPainting',
        query: { id: 1 }
      })
    },
    submitHandle() {
      console.log('-->>> type')
    }
  }
}
</script>

<style lang="scss" scoped>
.inner_content {
  height: 100%;
}
.draw_h {
  height: calc(100% - 120px);
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
</style>
