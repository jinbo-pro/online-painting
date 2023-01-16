<template>
  <div>
    <PaintingGroup :list="coverList" />
  </div>
</template>

<script>
import PaintingGroup from '@/components/Painting/PaintingGroup.vue'
import { listData } from '@/utils/mock'
export default {
  components: {
    PaintingGroup
  },
  data() {
    return {
      coverList: []
    }
  },
  created() {
    this.coverList = listData(50)
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
