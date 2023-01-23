<template>
  <div
    class="paint_max"
    :style="`grid-template-columns: repeat(${columns}, ${coverAuto ? 'auto' : 'minmax(200px, 300px)'})`"
  >
    <div v-for="(item, index) in list" :key="index" class="mr-16 mb-16">
      <PaintingItem :item="item" :showLookRange="item.showLookRange" @handle="handlePainting" />
    </div>
  </div>
</template>

<script>
import PaintingItem from './PaintingItem.vue'
export default {
  name: 'PaintingGroup',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Number,
      default: 2
    },
    coverAuto: {
      type: Boolean,
      default: false
    }
  },
  components: {
    PaintingItem
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    handlePainting(e) {
      this.$emit('handle', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.paint_max {
  display: grid;
  grid-row-gap: 16px;
  grid-column-gap: 16px;
}
</style>
