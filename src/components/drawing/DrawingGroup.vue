<template>
  <div class="drawing_content">
    <DrawingItem v-for="(item, index) in list" :key="index" :item="item" @handle="handle" />
  </div>
</template>

<script>
import DrawingItem from './DrawingItem.vue'
export default {
  name: 'DrawingGroup',
  props: {
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
    grid-column-gap: 16px;
    grid-template-columns: repeat(4, 200px);
  }
  // 电脑
  @media only screen and (min-width: 1200px) and (max-width: 1919px) {
    display: grid;
    grid-column-gap: 16px;
    grid-template-columns: repeat(6, 200px);
  }
}
</style>
