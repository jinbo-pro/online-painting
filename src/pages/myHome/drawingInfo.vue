<template>
  <div class="container">
    <div class="pb-24">
      <PageNavigator />
    </div>
    <el-row class="about_box">
      <el-col :span="13" class="img_box box_bod jac pd-16">
        <img class="info_cover" :src="drawInfo.path" />
      </el-col>
      <el-col :span="11" class="right_message_box">
        <div class="jsb ac">
          <div>
            <div class="title">{{ drawInfo.title }}</div>
            <div class="time">{{ drawInfo.createDate | parseTimeFnumber(drawInfo.createTime) }}</div>
          </div>
          <div class="send">
            <i class="el-icon-s-promotion"></i>
          </div>
        </div>
        <p>{{ drawInfo.description }}</p>
        <el-button type="primary" icon="el-icon-present" class="order_swag" @click="linkShopping">
          {{ $t(`myHome['Order a Swag']`) }}
        </el-button>
      </el-col>
    </el-row>
    <ScrollCoverList :list="drawingList" :current.sync="activeIndex" valueKey="path" />
    <div class="line_se"></div>
  </div>
</template>

<script>
import PageNavigator from '@/components/PageNavigator.vue'
import ScrollCoverList from '@/components/ScrollCoverList.vue'
import { listData } from '@/utils/mock'
import { getDrawInfo } from '@/apiList/api_work'
export default {
  components: {
    PageNavigator,
    ScrollCoverList
  },
  data() {
    return {
      activeIndex: 0,
      drawingList: [],
      drawInfo: {
        id: '',
        path: '',
        title: '',
        description: '',
        createDate: '',
        createTime: ''
      }
    }
  },
  computed: {
    currentCover() {
      return this.drawingList[this.activeIndex]
    }
  },
  created() {
    const id = this.$route.query.id
    if (id) {
      this.getInfo(id)
    }
    this.drawingList = listData('3-10')
  },
  methods: {
    getInfo(id) {
      getDrawInfo(id).then((res) => {
        Object.assign(this.drawInfo, res)
      })
    },
    linkShopping(id) {
      this.$router.push({
        path: '/shoppingMall',
        query: { id: this.currentCover.id }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.about_box {
  height: 70%;
  .img_box {
    height: 100%;
    .info_cover {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .send {
    cursor: pointer;
    font-size: 32px;
  }
}
.right_message_box {
  padding: 24px;
  .title {
    font-size: 24px;
    font-weight: bold;
  }
  .time {
    padding-top: 10px;
    color: #999;
  }
  .order_swag {
    margin-top: 30px;
  }
}
</style>
