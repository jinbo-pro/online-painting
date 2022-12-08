<template>
  <div class="container info_max">
    <div class="back_box">
      <PageNavigator />
    </div>
    <el-row class="about_box">
      <el-col :span="13" class="img_box jac">
        <el-image fit="cover" class="info_cover" src="/bg.jpg" :preview-src-list="['/bg.jpg']"></el-image>
      </el-col>
      <el-col :span="11" class="right_message_box">
        <div class="jsb ac">
          <div>
            <div class="title">Title</div>
            <div class="time">02/12/2022</div>
          </div>
          <div>发送</div>
        </div>
        <p>
          Tollere odium autem in nostra potestate sint.ab omnibus et contra naturam transferre innobis.Sed interim toto
          desiderio supprimunt:si vis aliqua quae in manu tua tibi necesseconfundentur et quae,quod laudabile
          esset,nihil tamen possides.
        </p>
        <el-button type="primary" icon="el-icon-present" class="order_swag">Order a Swag</el-button>
      </el-col>
    </el-row>
    <div class="foot_img_box" @mouseenter.stop="hover = true" @mouseleave.stop="hover = false">
      <transition name="carousel-arrow-left">
        <button
          type="button"
          v-show="hover && activeIndex > 0"
          @click.stop="throttledArrowClick(activeIndex - 1)"
          class="el-carousel__arrow el-carousel__arrow--left"
        >
          <i class="el-icon-arrow-left"></i>
        </button>
      </transition>
      <transition name="carousel-arrow-right">
        <button
          type="button"
          v-show="hover && activeIndex < drawingList.length - 1"
          @click.stop="throttledArrowClick(activeIndex + 1)"
          class="el-carousel__arrow el-carousel__arrow--right"
        >
          <i class="el-icon-arrow-right"></i>
        </button>
      </transition>
      <div class="img_list_max" ref="imgListDom">
        <div v-for="(item, index) in drawingList" :key="index" class="img_item_box">
          <el-image fit="cover" class="drawing_list_cover" :src="item"></el-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'throttle-debounce/throttle'
import PageNavigator from '@/components/PageNavigator.vue'
export default {
  components: {
    PageNavigator
  },
  data() {
    return {
      loop: false,
      hover: false,
      activeIndex: 0,
      drawingList: []
    }
  },
  created() {
    this.drawingList = Array(8).fill('/bg.jpg')
    this.throttledArrowClick = throttle(300, true, (index) => {
      this.setActiveItem(index)
    })
  },
  methods: {
    setActiveItem(index) {
      let length = this.drawingList.length
      let oldIndex = this.activeIndex
      if (index < 0) {
        this.activeIndex = 0
      } else if (index >= length) {
        this.activeIndex = length - 1
      } else {
        this.activeIndex = index
      }
      const dom = this.$refs.imgListDom
      if (oldIndex < this.activeIndex) {
        dom.scrollLeft += 150
      } else {
        dom.scrollLeft -= 150
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.back_box {
  padding-bottom: 24px;
}
.info_max {
  padding: 20px 24px;
}
.about_box {
  height: 80%;
  max-height: 300px;
  .img_box {
    border: 1px solid #e1e1e1;
    height: 100%;
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
.foot_img_box {
  position: relative;
}
.img_list_max {
  white-space: nowrap;
  width: 100%;
  overflow-x: scroll;
  position: relative;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  .img_item_box {
    margin: 8px;
    display: inline-block;
  }
  .btn {
    position: absolute;
    top: 50%;
    transform: scaleY(-50%);
    opacity: 0;
    transition: 0.3s;
  }
  .left {
    left: 0;
  }
  .right {
    right: 0;
  }
}
.drawing_list_cover {
  width: 150px;
  height: 120px;
}
.el-carousel__arrow {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
