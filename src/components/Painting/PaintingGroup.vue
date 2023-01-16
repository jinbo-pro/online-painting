<template>
  <div class="paint_max ac fw">
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

<style lang="scss" scoped></style>
