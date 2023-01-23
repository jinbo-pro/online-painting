<template>
  <div class="container dashboard_container">
    <div class="jsb ac">
      <div class="md_title">Greet Analytics</div>
      <el-button class="new_greetings" type="success" @click="$router.push('/individualGreetMode')">
        + New Greetings
      </el-button>
    </div>
    <div class="count_max ac">
      <div
        v-for="(item, index) in countList"
        :key="index"
        :class="['count_item_box mr-24', { active: activeIndex == index }]"
        @click="selectNavType(index)"
      >
        <div class="jsb ac">
          <div>{{ item.title }}</div>
          <svg-icon width="20px" height="20px" :icon-class="item.icon"></svg-icon>
        </div>
        <div class="count_num f24">{{ item.count }}</div>
      </div>
    </div>
    <div class="md_title"></div>
    <PaintingGroup :list="coverList" @handle="handlePainting" />
  </div>
</template>

<script>
import PaintingGroup from '@/components/Painting/PaintingGroup.vue'
import { getStatistics, getListByType } from '@/apiList/api_v1'
export default {
  components: {
    PaintingGroup
  },
  data() {
    return {
      activeIndex: 0,
      countList: [
        {
          title: 'Received',
          count: '',
          key: 'received',
          icon: 'greetReceived',
          url: '/receivedBlessing'
        },
        {
          title: 'Sent',
          count: '',
          key: 'sent',
          icon: 'greetSent',
          url: '/detailDrawingPage'
        },
        { title: 'Swag', count: '', key: 'swage', icon: 'greetSwag', bgc: '#F7F9FB', url: '/swagBlessing' },
        {
          title: 'Unifished',
          count: '',
          key: 'unfinished',
          icon: 'greetUnifished',
          url: '/detailDrawingPage'
        }
      ],
      coverList: []
    }
  },
  created() {
    getStatistics({}).then((res) => {
      this.countList.forEach((item) => {
        item.count = res[item.key + 'Count']
      })
    })
    this.getList()
  },
  methods: {
    getList() {
      getListByType({ type: this.countList[this.activeIndex].key }).then((res) => {
        this.coverList = res.list.map((e) => {
          return {
            ...e,
            showLookRange: true,
            lookRange: e.companyIsView == 1,
            path: e.userDrawPath,
            title: e.name
          }
        })
      })
    },
    linkCountInfo(path) {
      this.$router.push({
        path,
        query: { id: 1 }
      })
    },
    selectNavType(index) {
      this.activeIndex = index
      this.getList()
    },
    handlePainting(e) {
      let url = ''
      if (this.activeIndex == 0) {
        url = '/receivedBlessing'
      } else if (this.activeIndex == 1) {
        url = '/detailDrawingPage'
      } else if (this.activeIndex == 2) {
        url = '/swagBlessing'
      } else {
        url = '/drawingBoard'
      }
      this.$router.push({
        path: url,
        query: { greetId: e.greetId, drawId: e.drawId }
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
    background-color: #f7f9fb;
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
