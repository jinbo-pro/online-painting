<template>
  <el-dialog
    :title="$t(`sendNotice['Send a new message']`)"
    :visible.sync="dialogVisible"
    width="50%"
    :close-on-click-modal="false"
  >
    <slot />
    <div class="mb-16">{{ $t(`sendNotice['Recipient']`) }}</div>
    <el-cascader-multi
      clearable
      v-model="selectUserIds"
      :data="userList"
      label-key="name"
      value-key="id"
    ></el-cascader-multi>
    <div class="mt-16 mb-16">{{ $t(`sendNotice['Message']`) }}</div>
    <el-input type="textarea" v-model="message"></el-input>
    <div slot="footer">
      <div class="jac">
        <el-button icon="el-icon-s-promotion" type="primary" @click="send">
          {{ $t(`sendNotice['Send']`) }}
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { getUserTreeList } from '@/apiList/api_work'
import { findNodeDfs } from '@/utils/tree'
export default {
  name: 'ShareDrawingDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      message: '',
      selectUserIds: [],
      userList: []
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.show
      },
      set(v) {
        this.$emit('update:show', v)
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      getUserTreeList({}).then((res) => {
        this.userList = res
      })
    },
    send() {
      const ids = this.selectUserIds.map((arr) => arr[arr.length - 1])
      const list = ids.map((e) => findNodeDfs(this.userList, (node) => node.id == e))
      const user = list.filter((e) => e.type == 'user').map((e) => e.id)
      if (!user.length) return this.$message.error('请选择人员')
      this.$emit('send', { recipient: user.toString(), message: this.message })
      // reset
      this.message = ''
      this.selectUserIds = []
    }
  }
}
</script>

<style lang="scss" scoped></style>
