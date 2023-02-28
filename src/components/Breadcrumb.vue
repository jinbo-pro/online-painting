<template>
  <div class="breadcrumb_max">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in navList" :key="index">
        {{ item.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data() {
    return {}
  },
  computed: {
    navList() {
      return this.$route.matched.map((e) => {
        return {
          path: e.path,
          title: e.meta.title
        }
      })
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.breadcrumb_max {
  padding-bottom: 10px;
}
</style>
