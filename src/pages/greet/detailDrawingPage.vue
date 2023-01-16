<template>
  <div>
    <div class="jend">
      <div>
        <div class="jsb ac">
          <div class="mr-16">Make this visible to the company</div>
          <el-switch v-model="lookRange" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
        </div>
        <div class="foot_msg">Your creation can be seen Alphabet-wide</div>
      </div>
    </div>
    <div class="cover_list_max pd-16">
      <el-carousel
        trigger="click"
        height="320px"
        :interval="8000"
        :initial-index="activeIndex"
        indicator-position="outside"
        @change="swiperChange"
      >
        <el-carousel-item v-for="(item, index) in drawingList" :key="index">
          <el-row>
            <el-col :span="14" class="jac">
              <el-image class="cover_max" fit="cover" :src="item.path" @click="previewCover(item)"></el-image>
            </el-col>
            <el-col :span="10" class="right_content fdc jsb pl-24">
              <div class="jsb">
                <div class="time_box">Jan 2 - 9, 2023</div>
              </div>
              <div class="jsb ac">
                <div class="xs_title">Spiritual Animal</div>
                <template>
                  <i v-if="item.isStar" class="iconfont icon-aixin1"></i>
                  <i v-else class="iconfont icon-aixin"></i>
                </template>
              </div>
              <p class="mb-32">{{ item.content }}</p>
              <div class="ac">
                <el-avatar :size="40" :src="item.path" class="item_head mr-16"></el-avatar>
                <div>
                  <div>{{ item.userName }}</div>
                  <div class="f12 name_msg">{{ item.userName }}</div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="jsb ac">
      <ScrollCoverList :list="drawingList" :current.sync="activeIndex" valueKey="path" />
      <div class="right_btn_box mt-32">
        <div>
          <el-button class="start_drawing" type="success" @click="orderASwag"> Order a Swag </el-button>
        </div>
        <div>
          <el-button class="start_drawing" @click="share"> Share </el-button>
        </div>
        <div>
          <el-button class="start_drawing" @click="download"> Download </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { listData } from '@/utils/mock'
import ScrollCoverList from '@/components/ScrollCoverList.vue'
export default {
  components: {
    ScrollCoverList
  },
  data() {
    return {
      isSwag: false,
      lookRange: false,
      activeIndex: 0,
      drawingList: []
    }
  },
  created() {
    this.isSwag = this.$route.path == '/swagBlessing'
    this.drawingList = listData('3-10')
  },
  methods: {
    swiperChange(e) {
      this.activeIndex = e
    },
    orderASwag() {
      console.log(1, '-->>> orderASwag')
    },
    share() {
      console.log(2, '-->>> share')
    },
    download() {
      console.log(3, '-->>> download')
    }
  }
}
</script>

<style lang="scss" scoped>
.cover_list_max {
  .cover_max {
    width: 480px;
    height: 300px;
    overflow: hidden;
    border-radius: 10px;
  }
  .right_content {
    height: 250px;
    .iconfont {
      cursor: pointer;
      font-size: 32px;
    }
    .name_msg {
      color: #999;
    }
  }
}
.start_drawing {
  width: 80%;
  padding: 12px;
  border-radius: 32px;
}
.time_box {
  font-size: 12px;
  padding: 4px 6px;
  border-radius: 16px;
  box-sizing: border-box;
  font-weight: normal;
  border: 1px solid #daddb4;
}
.right_btn_box {
  width: 250px;
  div {
    margin-bottom: 8px;
  }
}
.foot_msg {
  font-size: 12px;
  color: #8d8d8d;
}
</style>
