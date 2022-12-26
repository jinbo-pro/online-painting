<template>
  <div class="container">
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="recipientUserId" :label="$t(`siteNotice['Form']`)"> </el-table-column>
      <el-table-column prop="content" :label="$t(`siteNotice['Description']`)"> </el-table-column>
      <el-table-column prop="status" :label="$t(`siteNotice['Status']`)"> </el-table-column>
    </el-table>
    <div class="mt-30 pd-30 box_bod">
      <div class="title">{{ $t(`siteNotice['Sender']`) }}</div>
      <p>{{ current.sendUserId }}</p>
      <div class="title">{{ $t(`siteNotice['Message']`) }}</div>
      <p>
        {{ current.content }}
      </p>
      <div>
        <el-button @click="read">{{ $t(`siteNotice['Mark as Read']`) }}</el-button>
        <el-button @click="deleteNotice">{{ $t(`siteNotice['Delete']`) }}</el-button>
      </div>
    </div>
    <div class="pd-30"></div>
  </div>
</template>

<script>
import { getIrecipientList } from '@/apiList/api_work'
export default {
  data() {
    return {
      tableData: [],
      current: {}
    }
  },
  created() {
    getIrecipientList({}).then((res) => {
      this.tableData = res
      this.current = res[0]
    })
  },
  methods: {
    read() {
      console.log('read')
    },
    deleteNotice() {
      console.log('deleteNotice')
    }
  }
}
</script>

<style lang="scss" scoped></style>
