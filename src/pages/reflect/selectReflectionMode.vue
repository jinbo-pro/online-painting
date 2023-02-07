<template>
  <div>
    <div class="md_title">Topic of the week (ongoing)</div>
    <div class="ac">
      <el-image
        class="left_cover"
        src="http://114.115.209.57:8090/drawClient/download/fa0d701083794b6780fc9875b5b49417/A calming place.png"
      ></el-image>
      <div class="ml-16">
        <div class="xs_title mb-16">Weekly progress</div>
        <div class="progress_max pl-24">
          <ProgressStep :progress="progress" :stepCount="progressList" />
        </div>
      </div>
    </div>
    <div class="md_title">Start a new activity</div>
    <div class="topic_max ac fw">
      <div
        v-for="(item, index) in coverList"
        :key="index"
        class="topic_item_box mr-16 mb-16"
        @click="$router.push('/reflectBoard?activity=' + item.activity)"
      >
        <div class="cover_box as">
          <el-image class="cover" :src="item.activityPath"></el-image>
        </div>
        <div class="foot_msg pd-12">{{ item.activity }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressStep from '@/components/ProgressStep.vue'
import { getWeek } from '@/apiList/api_v1'
export default {
  components: {
    ProgressStep
  },
  data() {
    return {
      coverList: [],
      progress: 0,
      progressList: []
    }
  },
  created() {
    getWeek({}).then((res) => {
      // TODO /reflectView/getWeek 接口数据有问题，目前周几写死
      // const day = new Date().getDay()
      const day = 5
      this.progress = ((day - 1) / 6) * 100
      const list = ['一', '二', '三', '四', '五', '六', '七']
      this.progressList = list.map((e, i) => {
        return day > i + 1 && res.weekStatus[e] == 0 ? 2 : res.weekStatus[e]
      })
      this.coverList = res.list
    })
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.left_cover {
  width: 302px;
  height: 227px;
  border-radius: 20px;
}
.progress_max {
  width: 500px;
}
.topic_item_box {
  width: 220px;
  background: #f7f9fb;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  overflow: hidden;
  .foot_msg {
    font-weight: bold;
  }
  .cover_box {
    height: 155px;
    border-radius: 10px;
    .cover {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
