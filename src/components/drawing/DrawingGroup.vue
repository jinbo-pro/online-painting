<template>
  <el-checkbox-group v-model="drawCheckList">
    <div class="drawing_content">
      <div v-for="(item, index) in list" :key="index" class="drawoing_item_box">
        <label>
          <el-checkbox v-if="select" class="check_box" v-model="item.checked" :label="item.id"></el-checkbox>
          <DrawingItem :item="item" @handle="handle" />
        </label>
      </div>
    </div>
  </el-checkbox-group>
</template>

<script>
import DrawingItem from './DrawingItem.vue'
export default {
  name: 'DrawingGroup',
  props: {
    select: {
      type: Boolean,
      default: false
    },
    checkList: {
      type: Array,
      default: () => []
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {
    DrawingItem
  },
  data() {
    return {}
  },
  computed: {
    drawCheckList: {
      get() {
        return this.checkList
      },
      set(v) {
        this.$emit('update:checkList', v)
      }
    }
  },
  created() {},
  methods: {
    handle(item) {
      this.$emit('handle', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.drawing_content {
  // 平板
  @media only screen and (min-width: 768px) and (max-width: 991px) {
    display: grid;
    grid-row-gap: 16px;
    grid-column-gap: 16px;
    grid-template-columns: repeat(4, 200px);
  }
  // 电脑
  @media only screen and (min-width: 1200px) {
    display: grid;
    grid-row-gap: 16px;
    grid-column-gap: 16px;
    grid-template-columns: repeat(6, 200px);
  }
}
.drawoing_item_box {
  position: relative;
  .check_box {
    position: absolute;
    top: 8px;
    left: 8px;
    z-index: 100;
    ::v-deep .el-checkbox__label {
      color: transparent;
    }
  }
}
</style>
