<template>
  <SendNotice :show.sync="dialogVisible" @send="sendNoticeConfirm">
    <div class="cover_box jac">
      <div class="mr-16">
        <img class="left_img" src="http://www.ruanyifeng.com/images_pub/pub_1.jpg" />
      </div>
      <div class="fdc jsb">
        <img class="right_img mb-14" src="http://www.ruanyifeng.com/images_pub/pub_2.jpg" />
        <img class="right_img" src="http://www.ruanyifeng.com/images_pub/pub_3.jpg" />
      </div>
    </div>
  </SendNotice>
</template>

<script>
import { sendMessage } from '@/apiList/api_work'
import SendNotice from './SendNotice.vue'
export default {
  name: 'ShareDrawingDialog',
  components: {
    SendNotice
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      recipient: '',
      message: ''
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
  methods: {
    sendNoticeConfirm(data) {
      sendMessage({ content: data.message, userIds: data.recipient }).then((res) => {
        this.dialogVisible = false
        this.$message.success('发送成功')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cover_box {
  .left_img {
    height: 94px;
  }
  .right_img {
    height: 40px;
  }
}
</style>
