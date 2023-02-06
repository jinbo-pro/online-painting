<template>
  <div>
    <div class="cover_list_max pd-16">
      <el-carousel
        trigger="click"
        height="23.42vw"
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
              </div>
              <p class="mb-32">{{ item.content }}</p>
              <div class="ac">
                <div class="ac mr-32">
                  <div class="mr-14">Swag included</div>
                  <svg-icon width="20px" height="20px" icon-class="SwagIncluded"></svg-icon>
                </div>
                <div class="see_order" @click="linkOrderInfo(item)">See order details</div>
              </div>
              <div class="ac mt-32">
                <span>to</span>
                <el-avatar :size="40" :src="item.path" class="item_head mr-16 ml-12"></el-avatar>
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
  </div>
</template>

<script>
import { listData } from '@/utils/mock'
export default {
  data() {
    return {
      activeIndex: 0,
      drawingList: []
    }
  },
  created() {
    this.drawingList = listData('3-10')
  },
  methods: {
    swiperChange(e) {
      this.activeIndex = e
    },
    linkOrderInfo(item) {
      console.log(item, '-->>> 跳转到订单')
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
.see_order {
  cursor: pointer;
}
</style>
