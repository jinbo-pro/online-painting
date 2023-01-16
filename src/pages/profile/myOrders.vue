<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="orderName" label="Order Name (Drawing name)"> </el-table-column>
      <el-table-column prop="user" label="User"> </el-table-column>
      <el-table-column prop="orderNo" label="Order No"> </el-table-column>
      <el-table-column prop="user" label="User"> </el-table-column>
      <el-table-column prop="orderDetails" label="Order Details"> </el-table-column>
      <el-table-column prop="date" label="Date"> </el-table-column>
      <el-table-column prop="status" label="Status"> </el-table-column>
      <el-table-column prop="invoice" label="Invoice"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped></style>
