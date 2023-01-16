<template>
  <div>
    <div class="md_title">Select a topic</div>
    <div class="topic_max ac fw">
      <div v-for="(item, index) in coverList" :key="index" class="topic_item_box mr-16 mb-16">
        <div class="cover_box as">
          <el-image class="cover" :src="item.path"></el-image>
        </div>
        <div class="foot_msg pd-12">Goodbye pal</div>
      </div>
    </div>
    <div class="lv_max ac fw mt-32">
      <div v-for="(item, index) in lvList" :key="index" class="lv_item_box mr-16 mb-16">
        <div class="cover_box as">
          <el-image class="cover" :src="item.path"></el-image>
        </div>
        <p>L2-slslsls</p>
      </div>
    </div>
  </div>
</template>

<script>
import { listData } from '@/utils/mock'
export default {
  data() {
    return {
      coverList: [],
      lvList: []
    }
  },
  created() {
    this.coverList = listData(7)
    this.lvList = listData(3)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
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
.lv_item_box {
  width: 310px;
  height: 192px;
  border-radius: 10px;
  overflow: hidden;
  .cover {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
