<template>
  <div class="container dashboard_container">
    <div class="jsb ac">
      <div class="md_title">Reflect Analytics</div>
      <el-button class="new_greetings" type="success" @click="$router.push('/selectReflectionMode')">
        + New Reflection
      </el-button>
    </div>
    <div class="count_max ac">
      <div
        v-for="(item, index) in countList"
        :key="index"
        @click="selectNavType(index)"
        :class="['count_item_box mr-24', { active: activeIndex == index }]"
      >
        <div class="jsb ac">
          <div>{{ item.title }}</div>
          <svg-icon width="20px" height="20px" :icon-class="item.icon"></svg-icon>
        </div>
        <div class="count_num f24">{{ item.count }}</div>
      </div>
    </div>
    <div class="md_title"></div>
    <PaintingGroup :list="coverList" @handle="linkPageInfo" />
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
        { title: 'Mood', count: 0, key: 'know yourself', icon: 'L1Mood', bgc: '#F7F9FB' },
        { title: 'Challenge', count: 0, key: 'calm and relax', icon: 'L1Challenge', bgc: '#FAFBEE' },
        { title: 'SafeSpace', count: 0, key: 'connection with people', icon: 'L1SafeSpace', bgc: '#FAFBEE' },
        { title: 'Unifished', count: 0, key: 'unifished', icon: 'L1Unifished', bgc: '#F7F9FB' }
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
    },
    linkPageInfo(e) {
      this.$router.push({
        path: '/detailDrawingPage',
        query: { drawId: e.drawId }
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
    border: 2px solid transparent;
    .count_num {
      font-weight: bold;
    }
  }
  .active {
    background-color: #fafbee;
    border: 2px solid #d2d97c;
  }
}
.new_greetings {
  width: 200px;
  padding: 12px;
  font-size: 18px;
  border-radius: 32px;
}
</style>
