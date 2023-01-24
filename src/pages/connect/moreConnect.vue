<template>
  <div>
    <PaintingGroup :list="coverList" :columns="4" @handle="paintHandle" />
    <div v-show="!isEnd" :id="loadDomId" class="jac">
      <img src="@/assets/loading.gif" />
    </div>
  </div>
</template>

<script>
import PaintingGroup from '@/components/Painting/PaintingGroup.vue'
import { getIndexData } from '@/apiList/api_v1'
import { guid } from '@/utils/jcore'
export default {
  components: {
    PaintingGroup
  },
  data() {
    return {
      isEnd: false,
      currentPage: 1,
      loadDomId: 'load-' + guid(),
      coverList: []
    }
  },
  created() {},
  mounted() {
    const loadingDom = document.getElementById(this.loadDomId)
    const observer = new IntersectionObserver(
      (nodes) => {
        nodes.forEach((v) => {
          // 判断加载图标是否进入可视区域
          if (v.isIntersecting && !this.isLoading && !this.isEnd) {
            this.currentPage++
            this.getList()
          }
        })
      },
      // 监听的元素和视口重叠的大小
      { threshold: 0.1 }
    )
    observer.observe(loadingDom)
  },
  methods: {
    paintHandle(e) {
      this.$router.push({
        path: '/drawDoneDiscuss',
        query: { connectId: e.connectId, connectState: e.state }
      })
    },
    getList() {
      this.isLoading = true
      getIndexData({
        pageSize: 10,
        currentPage: this.currentPage
      }).then((res) => {
        this.isLoading = false
        if (!res || !res.list) {
          this.isEnd = true
          return
        }
        const list = res ? res.list : []
        if (!list || !list.length) {
          this.isEnd = true
          return
        }
        this.coverList = this.coverList.concat(list)

        if (this.coverList.length >= res.total) {
          this.isEnd = true
          return
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
