<template>
  <div class="container">
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="recipientUserId" :label="$t(`siteNotice['Form']`)"> </el-table-column>
      <el-table-column prop="content" :label="$t(`siteNotice['Description']`)"> </el-table-column>
      <el-table-column prop="status" :label="$t(`siteNotice['Status']`)">
        <template slot-scope="{ row }">
          <span v-if="row.status == 1">未读</span>
          <span v-else>已读</span>
        </template>
      </el-table-column>
      <el-table-column label="查看">
        <template slot-scope="{ row }">
          <el-button size="mini" @click="lookInfo(row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="消息详情" :visible.sync="dialogVisible" width="50%">
      <div class="mt-30 pd-30 box_bod">
        <div class="title">{{ $t(`siteNotice['Sender']`) }}</div>
        <p>{{ current.sendUserId }}</p>
        <div class="title">{{ $t(`siteNotice['Message']`) }}</div>
        <p>
          {{ current.content }}
        </p>
      </div>
      <span slot="footer">
        <el-button @click="deleteNotice">{{ $t(`siteNotice['Delete']`) }}</el-button>
        <el-button v-if="current.status == 1" type="primary" @click="read">
          {{ $t(`siteNotice['Mark as Read']`) }}
        </el-button>
      </span>
    </el-dialog>
    <div class="pd-30"></div>
  </div>
</template>

<script>
import { getIrecipientList, msg_del, msg_markRead } from '@/apiList/api_work'
export default {
  data() {
    return {
      tableData: [],
      current: {
        id: '',
        status: '',
        content: '',
        sendUserId: ''
      },
      dialogVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getIrecipientList({}).then((res) => {
        this.tableData = res
      })
    },
    read() {
      msg_markRead(this.current.id).then((res) => {
        this.dialogVisible = false
        this.$message.success('操作成功')
        this.getList()
      })
    },
    lookInfo(row) {
      Object.assign(this.current, row)
      this.dialogVisible = true
    },
    async deleteNotice() {
      await this.$confirm('您确认删除该条信息吗？', '提示', { type: 'warning' })
      await msg_del(this.current.id)
      this.$message.success('操作成功')
      this.getList()
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
