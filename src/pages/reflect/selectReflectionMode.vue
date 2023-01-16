<template>
  <div>
    <div class="md_title">Topic of the week (ongoing)</div>
    <div class="ac">
      <el-image class="left_cover" src="http://www.ruanyifeng.com/images_pub/pub_1.jpg"></el-image>
      <div class="ml-16">
        <div class="xs_title mb-16">Weekly progress</div>
        <div class="progress_max pl-24">
          <ProgressStep :progress="progress" :stepCount="7" />
        </div>
      </div>
    </div>
    <div class="md_title">Start a new activity</div>
    <div class="topic_max ac fw">
      <div
        v-for="(item, index) in coverList"
        :key="index"
        class="topic_item_box mr-16 mb-16"
        @click="$router.push('/reflectBoard')"
      >
        <div class="cover_box as">
          <el-image class="cover" :src="item.path"></el-image>
        </div>
        <div class="foot_msg pd-12">Goodbye pal</div>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressStep from '@/components/ProgressStep.vue'
import { listData } from '@/utils/mock'
export default {
  components: {
    ProgressStep
  },
  data() {
    return {
      coverList: [],
      progress: 35
    }
  },
  created() {
    this.coverList = listData(7)
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
