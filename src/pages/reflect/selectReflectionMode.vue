<template>
  <div>
    <div class="md_title">Topic of the week (ongoing)</div>
    <div class="jac">
      <el-image class="left_cover" src="http://www.ruanyifeng.com/images_pub/pub_1.jpg"></el-image>
      <div class="ml-16">
        <p>Weekly progress</p>
        <div class="progress_max pl-24">
          <ProgressStep :progress="progress" :stepCount="7" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressStep from '@/components/ProgressStep.vue'
export default {
  components: {
    ProgressStep
  },
  data() {
    return {
      progress: 25
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.left_cover {
  width: 302px;
  height: 227px;
  border-radius: 20px;
}
.progress_max {
  width: 500px;
}
</style>
