<template>
  <div :id="loadDomId" class="load_more_max jac">
    <span v-if="isLoadEnd">don't have more.</span>
    <i v-else class="el-icon-loading"></i>
  </div>
</template>

<script>
import { guid } from '@/utils/jcore'
export default {
  name: 'DropDownLoadMore',
  props: {
    // 是否加载完
    isLoadEnd: {
      type: Boolean,
      default: false
    },
    page: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      loadDomId: `load_${guid()}`
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    }
  },
  created() {},
  mounted() {
    const observer = new IntersectionObserver(
      (nodes) => {
        nodes.forEach((v) => {
          // 判断加载图标是否进入可视区域
          if (v.isIntersecting && !this.isLoadEnd) {
            console.log('加载更多')
            this.$emit('getList', this.currentPage)
            this.currentPage++
          }
        })
      },
      // 监听的元素和视口重叠的大小
      { threshold: 0.1 }
    )
    observer.observe(document.getElementById(this.loadDomId))
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.load_more_max {
  color: #999;
  padding: 12px 0;
}
</style>
