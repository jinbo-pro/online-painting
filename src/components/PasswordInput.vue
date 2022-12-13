<template>
  <div>
    <div v-show="!look" class="input_box ac">
      <el-input v-model="password" type="password"></el-input>
      <i class="iconfont icon-yanjing-biyan" @click="look = true"></i>
    </div>
    <div v-show="look" class="input_box ac">
      <el-input v-model="password" type="text"></el-input>
      <i class="iconfont icon-yanjing" @click="look = false"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PasswordInput',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      look: false
    }
  },
  computed: {
    password: {
      get() {
        return this.text
      },
      set(v) {
        this.$emit('update:text', v)
      }
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.input_box {
  .iconfont {
    font-size: 28px;
    margin-left: 16px;
  }
}
</style>
