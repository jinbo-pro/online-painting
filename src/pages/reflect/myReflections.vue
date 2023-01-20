<template>
  <div class="container dashboard_container">
    <div class="jsb ac">
      <div class="md_title">REFLECT Analytics</div>
      <el-button class="new_greetings" type="success" @click="$router.push('/selectReflectionMode')">
        + New Reflection
      </el-button>
    </div>
    <div class="count_max ac">
      <div
        v-for="(item, index) in countList"
        :key="index"
        class="count_item_box mr-24"
        @click="selectNavType(index)"
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
    <PaintingGroup :list="coverList" @handle="$router.push('/detailDrawingPage')" />
  </div>
</template>

<script>
import PaintingGroup from '@/components/Painting/PaintingGroup.vue'
import { getReflectIndex, getReflectList } from '@/apiList/api_v1'
export default {
  components: {
    PaintingGroup
  },
  data() {
    return {
      activeIndex: 0,
      coverList: [],
      countList: [
        { title: 'L1 Mood', count: 33, key: 'know yourself', icon: 'L1Mood', bgc: '#F7F9FB' },
        { title: 'L1 Challenge', count: 21, key: 'calm and relax', icon: 'L1Challenge', bgc: '#FAFBEE' },
        { title: 'L1 SafeSpace', count: 21, key: 'connection with people', icon: 'L1SafeSpace', bgc: '#FAFBEE' },
        { title: 'L1 Unifished', count: 5, key: 'unifished', icon: 'L1Unifished', bgc: '#F7F9FB' }
      ]
    }
  },
  created() {
    getReflectIndex({}).then((res) => {
      this.countList.forEach((item) => {
        item.count = res[item.key]
      })
    })
    this.getList()
  },
  methods: {
    selectNavType(index) {
      this.activeIndex = index
      this.getList()
    },
    getList() {
      getReflectList({ promptTopic: this.countList[this.activeIndex].key }).then((res) => {
        if (!res || !res.list) return
        this.coverList = res.list.map((e) => {
          return {
            ...e,
            path: e.userDrawPath
          }
        })
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
