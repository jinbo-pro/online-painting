<template>
  <div class="container dashboard_container">
    <div class="jsb ac">
      <div class="md_title">Connect Analytics</div>
      <el-button class="new_greetings" type="success" @click="$router.push('/drawingBoard')">
        + New Greetings
      </el-button>
    </div>
    <div class="count_max ac">
      <div
        v-for="(item, index) in countList"
        :key="index"
        class="count_item_box mr-24"
        @click="linkCountInfo(item.url)"
        :style="`background-color: ${item.bgc};`"
      >
        <div class="jsb ac">
          <div>{{ item.title }}</div>
          <svg-icon width="20px" height="20px" :icon-class="item.icon"></svg-icon>
        </div>
        <div class="count_num f24">{{ item.count }}</div>
      </div>
    </div>
    <div class="md_title"></div>
    <PaintingGroup :list="coverList" />
  </div>
</template>

<script>
import { listData } from '@/utils/mock'
import PaintingGroup from '@/components/Painting/PaintingGroup.vue'
export default {
  components: {
    PaintingGroup
  },
  data() {
    return {
      activeIndex: 0,
      coverList: [],
      countList: [
        { title: 'Received', count: 33, icon: 'greetReceived', bgc: '#F7F9FB', url: '/receivedBlessing' },
        { title: 'Sent', count: 21, icon: 'greetSent', bgc: '#F7F9FB', url: '/detailDrawingPage' },
        { title: 'Swag', count: 21, icon: 'greetSwag', bgc: '#F7F9FB', url: '/swagBlessing' },
        { title: 'Unifished', count: 5, icon: 'greetUnifished', bgc: '#F7F9FB', url: '/detailDrawingPage' }
      ]
    }
  },
  created() {
    const list = listData(10)
    this.coverList = list.map((e) => {
      return {
        ...e,
        showLookRange: true
      }
    })
  },
  methods: {
    linkCountInfo(path) {
      this.$router.push({
        path,
        query: { id: 1 }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard_container {
  overflow: hidden;
}
.count_max {
  .count_item_box {
    width: 202px;
    height: 112px;
    padding: 16px;
    border-radius: 16px;
    box-sizing: border-box;
    .count_num {
      font-weight: bold;
    }
  }
}
.new_greetings {
  width: 200px;
  padding: 12px;
  font-size: 18px;
  border-radius: 32px;
}
</style>
