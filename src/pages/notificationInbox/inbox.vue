<template>
  <div class="jac box">
    <div :span="4" class="left_nav box pd-16">
      <div
        v-for="(item, index) in noticeTypeList"
        :key="index"
        @click="activeType = index"
        :class="['item_notice_type f20 mb-12', { active: activeType == index }]"
      >
        {{ item }}
      </div>
    </div>
    <div :span="6" class="notice_list box">
      <div
        v-for="(item, index) in noticeList"
        :key="index"
        @click="activeIndex = index"
        :class="['item_notice jsb ac', { active: activeIndex == index }]"
      >
        <div class="user_name">{{ item.userName }}</div>
        <div class="create_time">{{ item.createTime }}</div>
      </div>
    </div>
    <div :span="14" class="right_notice_max box">
      <div class="notice_card">
        <div class="jsb ac">
          <div class="md_title">Sender</div>
          <div class="ac">
            <div class="mr-32">8:55 pm</div>
            <el-dropdown>
              <i class="el-icon-more" style="transform: rotate(90deg)"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="read">Mark as unread</el-dropdown-item>
                <el-dropdown-item @click.native="deleteNotice">Delete</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="pr-32">
          <p>{{ current.userName }}</p>
          <div class="md_title">Message</div>
          <p>{{ current.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getIrecipientList, msg_del, msg_markRead } from '@/apiList/api_work'
import { listData } from '@/utils/mock'
export default {
  data() {
    return {
      activeType: 0,
      noticeTypeList: ['All', 'Unread', 'Starred'],
      activeIndex: 0,
      noticeList: [],
      tableData: [],
      current: {
        id: '',
        status: '',
        content: '',
        sendUserId: ''
      }
    }
  },
  created() {
    this.getList()
    this.noticeList = listData('3-10')
    // mock
    Object.assign(this.current, this.noticeList[0])
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

<style lang="scss" scoped>
.left_nav {
  width: 17%;
}
.notice_list {
  width: 20%;
}
.right_notice_max {
  width: 62%;
}
.item_notice_type {
  cursor: pointer;
  font-weight: bold;
  color: #8d8d8d;
  &.active {
    color: #313131;
  }
}
.item_notice {
  padding: 16px 12px;
  border-bottom: 1px solid #d6d6d6;
  &.active {
    background-color: #d6d6d6;
  }
}
.right_notice_max {
  padding: 36px;
  .notice_card {
    padding: 40px 80px;
    border-radius: 20px;
    box-sizing: border-box;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.05), -4px -4px 10px rgba(0, 0, 0, 0.05);
  }
}
.box {
  height: 100%;
  box-sizing: border-box;
  box-shadow: 2px 0px 4px rgba(125, 164, 83, 0.1);
}
</style>
