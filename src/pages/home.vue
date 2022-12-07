<template>
  <div>
    <SelectLang />
    <p>{{ $t('router.home') }}</p>
    <el-button type="primary">{{ $t('app.text') }}</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import SelectLang from '@/components/SelectLang.vue'
export default {
  components: {
    SelectLang
  },
  data() {
    return {
      tableData: []
    }
  },
  created() {},
  methods: {
   
  }
}
</script>

<style lang="less" scoped></style>
