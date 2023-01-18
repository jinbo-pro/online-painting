<template>
  <div v-if="type == 'back'" @click="handleBack" class="btn">
    <i class="el-icon-back"></i>
    <span class="ml-10">{{ $t(`app.Back`) }}</span>
  </div>
  <div v-else @click="handleNext" class="btn">
    <span class="mr-10">{{ $t(`app.Next`) }}</span>
    <i class="el-icon-right"></i>
  </div>
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

<style lang="scss" scoped>
.btn {
  cursor: pointer;
}
</style>
