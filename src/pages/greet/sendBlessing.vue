<template>
  <div>
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
                <template v-if="isSwag">
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
              <div v-if="isSwag" class="jsb ac mt-32">
                <el-button class="start_drawing" type="success" @click="submitHandle(1)"> Say Thanks </el-button>
                <el-button class="start_drawing" @click="submitHandle(2)"> Order A Swag </el-button>
              </div>
            </el-col>
          </el-row>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { listData } from '@/utils/mock'
export default {
  data() {
    return {
      isSwag: false,
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
    submitHandle() {
      console.log(678, '-->>> 跳转到商城')
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
  .start_drawing {
    width: 30%;
    padding: 12px;
    border-radius: 32px;
  }
}
.time_box {
  font-size: 12px;
  padding: 4px 6px;
  border-radius: 16px;
  box-sizing: border-box;
  font-weight: normal;
  border: 1px solid #daddb4;
}
</style>
