<template>
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
        v-show="hover && activeIndex < list.length - 1"
        @click.stop="throttledArrowClick(activeIndex + 1)"
        class="el-carousel__arrow el-carousel__arrow--right"
      >
        <i class="el-icon-arrow-right"></i>
      </button>
    </transition>
    <div class="img_list_max mt-24" ref="imgListDom">
      <div
        v-for="(item, index) in coverList"
        :key="index"
        @click="selectCover(index)"
        :class="['img_item_box', { active: activeIndex == index }]"
      >
        <el-image fit="cover" class="drawing_list_cover" :src="item"> </el-image>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'throttle-debounce/throttle'
export default {
  name: 'ScrollCoverList',
  props: {
    current: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default: () => []
    },
    valueKey: {
      type: String,
      default: 'url'
    }
  },
  data() {
    return {
      hover: false
    }
  },
  computed: {
    activeIndex: {
      get() {
        return this.current
      },
      set(v) {
        this.$emit('update:current', v)
      }
    },
    coverList() {
      return this.list.map((e) => {
        if (typeof e === 'string') return e
        return e[this.valueKey]
      })
    }
  },
  created() {
    this.throttledArrowClick = throttle(100, true, (index) => {
      this.setActiveItem(index)
    })
  },
  methods: {
    selectCover(index) {
      this.activeIndex = index
      this.$emit('change', index)
    },
    async setActiveItem(index) {
      let length = this.list.length
      if (index < 0) {
        this.activeIndex = 0
      } else if (index >= length) {
        this.activeIndex = length - 1
      } else {
        this.activeIndex = index
      }
      await this.$nextTick()
      const dom = this.$refs.imgListDom
      dom.scrollLeft = (dom.clientWidth / this.list.length) * this.activeIndex
      this.$emit('change', this.activeIndex)
    }
  }
}
</script>

<style lang="scss" scoped>
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
    padding: 8px;
    display: inline-block;
    border: 1px solid transparent;
  }
  .active {
    border: 1px solid #e1e1e1;
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
