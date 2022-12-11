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
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
}
</style>
