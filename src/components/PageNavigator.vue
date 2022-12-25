<template>
  <el-button v-if="type == 'back'" icon="el-icon-back" @click="handleBack">{{ $t(`app.Back`) }}</el-button>
  <el-button v-else @click="handleNext">{{ $t(`app.Next`) }} <i class="el-icon-right"></i> </el-button>
</template>

<script>
export default {
  name: 'PageNavigator',
  props: {
    type: {
      type: String,
      default: 'back'
    },
    customer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    handleBack() {
      if (this.customer) {
        this.$emit('handleBack')
        return
      }
      this.$router.go(-1)
    },
    handleNext() {
      if (this.customer) {
        this.$emit('handleNext')
        return
      }
      // history.forward();
      this.$emit('handleNext')
    }
  }
}
</script>

<style lang="scss" scoped></style>
