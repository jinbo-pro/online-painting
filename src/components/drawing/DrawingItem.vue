<template>
  <div class="drawing_item_box" @click="linkInfo">
    <div class="cover_box jac">
      <el-image class="cover" :src="item.path" lazy></el-image>
    </div>
    <p class="jac">{{ item.title }}</p>
  </div>
</template>

<script>
export default {
  name: 'DrawingItem',
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    linkInfo() {
      this.$emit('handle', this.item)
    }
  }
}
</script>

<style lang="scss" scoped>
.drawing_item_box {
  .cover_box {
    width: 100%;
    height: 80%;
  }
  .cover {
    width: 200px;
    height: 130px;
  }
}
</style>
