<template>
  <div class="container">
    <div class="pb-24">
      <PageNavigator />
    </div>
    <el-row class="about_box">
      <el-col :span="13" class="img_box box_bod jac pd-16">
        <img class="info_cover" :src="currentCover.cover" />
      </el-col>
      <el-col :span="11" class="right_message_box">
        <div class="jsb ac">
          <div>
            <div class="title">Title</div>
            <div class="time">02/12/2022</div>
          </div>
          <div class="send">
            <i class="el-icon-s-promotion"></i>
          </div>
        </div>
        <p>
          Tollere odium autem in nostra potestate sint.ab omnibus et contra naturam transferre innobis.Sed interim toto
          desiderio supprimunt:si vis aliqua quae in manu tua tibi necesseconfundentur et quae,quod laudabile
          esset,nihil tamen possides.
        </p>
        <el-button type="primary" icon="el-icon-present" class="order_swag" @click="linkShopping">
          Order a Swag
        </el-button>
      </el-col>
    </el-row>
    <ScrollCoverList :list="drawingList" :current.sync="activeIndex" valueKey="cover" />
  </div>
</template>

<script>
import PageNavigator from '@/components/PageNavigator.vue'
import ScrollCoverList from '@/components/ScrollCoverList.vue'
import { listData } from '@/utils/mock'
export default {
  components: {
    PageNavigator,
    ScrollCoverList
  },
  data() {
    return {
      activeIndex: 0,
      drawingList: []
    }
  },
  computed: {
    currentCover() {
      return this.drawingList[this.activeIndex]
    }
  },
  created() {
    this.drawingList = listData('3-10')
  },
  methods: {
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
