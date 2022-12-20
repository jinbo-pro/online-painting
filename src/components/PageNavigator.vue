<template>
  <el-button v-if="type == 'back'" icon="el-icon-back" @click="$router.go(-1)">{{ $t(`app.Back`) }}</el-button>
  <el-button v-else @click="handleNext">{{ $t(`app.Next`) }} <i class="el-icon-right"></i> </el-button>
</template>

<script>
export default {
  name: 'PageNavigator',
  props: {
    type: {
      type: String,
      default: 'back'
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    handleNext() {
      // history.forward();
      this.$emit('handleNext')
    }
  }
}
</script>

<style lang="scss" scoped></style>
