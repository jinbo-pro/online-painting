<template>
  <div>
    <div v-for="(item, index) in list" :key="index" class="item_li_box ac mb-16">
      <div class="left_cover_box pd-16">
        <el-image
          v-for="(e, i) in item.coverList"
          :key="i"
          fit="cover"
          :preview-src-list="item.coverList"
          class="cover_item_box mr-16"
          :src="e"
        ></el-image>
      </div>
      <div class="xs_title jac right_title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
import { getAllGalleries } from '@/utils/mock'
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.list = getAllGalleries()
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.item_li_box {
  height: 180px;
  box-sizing: border-box;
  background: #f7f9fb;
  border-radius: 30px;
  padding: 12px 24px;
}
.left_cover_box {
  width: 60%;
}
.cover_item_box {
  width: 160px;
  height: 160px;
  overflow: hidden;
  border-radius: 10px;
}
.right_title {
  width: 40%;
  height: 100%;
}
</style>
