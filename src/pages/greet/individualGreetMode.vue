<template>
  <div>
    <div class="md_title">Select a topic</div>
    <el-radio-group v-model="selectTopic" @change="topicChange">
      <div class="topic_max ac fw">
        <div v-for="(item, index) in coverList" :key="index" class="topic_item_box mr-16 mb-16">
          <el-radio :label="item.topic" class="radio_box">
            <div class="cover_box as">
              <el-image class="cover" :src="item.topicPath"></el-image>
            </div>
            <div class="foot_msg pd-12">{{ item.topic }}</div>
          </el-radio>
        </div>
      </div>
    </el-radio-group>
    <div class="lv2_max ac fw mt-32">
      <div
        v-for="(item, index) in lv2List"
        :key="index"
        class="lv_item_box mr-16 mb-16"
        @click="linkDrawingBoard(item.activity)"
      >
        <div class="cover_box as">
          <el-image class="cover" :src="item.activityPath"></el-image>
        </div>
        <p>{{ item.activity }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getActivityByTopic, getPromptL1 } from '@/apiList/api_v1'
export default {
  data() {
    return {
      selectTopic: '',
      coverList: [],
      lv2List: []
    }
  },
  created() {
    getPromptL1({ code: 'greet' }).then((res) => {
      this.coverList = res
    })
  },
  methods: {
    linkDrawingBoard(activity) {
      this.$router.push({
        path: '/drawingBoard',
        query: { activity }
      })
    },
    topicChange(topic) {
      getActivityByTopic({ topic }).then((res) => {
        this.lv2List = res.list
      })
    }
  }
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
.radio_box {
  width: 100%;
  ::v-deep .el-radio__input {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 10;
  }
}
</style>
