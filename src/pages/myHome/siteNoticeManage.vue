<template>
  <div class="container">
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="userName" label="Form"> </el-table-column>
      <el-table-column prop="title" label="Description"> </el-table-column>
      <el-table-column prop="userName" label="Status"> </el-table-column>
    </el-table>
    <div class="mt-30 pd-30 box_bod">
      <div class="title">Sender</div>
      <p>{{ current.userName }}</p>
      <div class="title">Message</div>
      <p>
        {{ current.content }}
      </p>
      <div>
        <el-button @click="read">Mark as Read</el-button>
        <el-button @click="deleteNotice">Delete</el-button>
      </div>
    </div>
    <div class="pd-30"></div>
  </div>
</template>

<script>
import { listData } from '@/utils/mock'
export default {
  data() {
    return {
      tableData: [],
      current: {}
    }
  },
  created() {
    this.tableData = listData('2-5')
    this.current = listData('2-3')[0]
  },
  methods: {
    read() {
      console.log('read')
    },
    deleteNotice() {
      onsole.log('deleteNotice')
    }
  }
}
</script>

<style lang="scss" scoped></style>
