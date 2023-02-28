<template>
  <div class="chat_room_container">
    <div class="chat_content">
      <div class="message_list_max">
        <div
          v-for="(item, index) in list"
          :key="index"
          :class="['message_item_box', { is_me: item.sendUserId == userInfo.id }]"
        >
          <div v-if="item.sendUserId == userInfo.id" class="jend mb-14">
            <div class="user_name">{{ item.recipientUserName }}</div>
            <HeadPhoto :cover="item.recipientPhoto" :size="25" />
          </div>
          <div v-else class="ac mb-14">
            <HeadPhoto :cover="item.sendPhoto" :size="25" />
            <div class="user_name">{{ item.recipientUserName }}</div>
          </div>
          <div class="message_box">{{ item.content }}</div>
        </div>
      </div>
      <div class="send_box jsb ac pd-14">
        <el-input class="content_box mr-12" v-model="content" placeholder="Leave a message"></el-input>
        <svg-icon class="send_btn" width="1.46vw" height="1.46vw" icon-class="ChatRoomSend" @click="send"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { local } from '@/utils/storage'
import HeadPhoto from '@/components/HeadPhoto.vue'
import { getChatList, sendChatMessage } from '@/apiList/api_v1'
/**聊天室 */
export default {
  name: 'ChatRoom',
  components: {
    HeadPhoto
  },
  props: {
    grId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      list: [],
      content: '',
      errCount: 0,
      userInfo: {
        id: '',
        name: ''
      }
    }
  },
  watch: {
    list() {
      this.$nextTick(() => {
        // 消息滚动到底部
        const mainDom = document.querySelector('.chat_content')
        mainDom.scrollTop = mainDom.scrollHeight
      })
    }
  },
  created() {
    Object.assign(this.userInfo, local.get('userInfo'))
    this.getList()
  },
  mounted() {
    this.clearTime()
    if (this.grId) {
      this.timr = setInterval(() => {
        this.getList()
      }, 5000)
    }
  },
  destroyed() {
    this.clearTime()
  },
  methods: {
    clearTime() {
      if (this.timr) {
        clearInterval(this.timr)
        this.timr = null
      }
    },
    getList() {
      if (!this.grId) return
      getChatList({ grId: this.grId })
        .then((res) => {
          this.list = res
        })
        .catch(() => {
          this.errCount++
          if (this.errCount > 3) {
            this.clearTime()
          }
        })
    },
    send() {
      if (!this.content) return this.$message.error('消息不能为空')
      sendChatMessage({
        content: this.content,
        recipientUserId: this.userInfo.id,
        recipientUserName: this.userInfo.name,
        grId: this.grId
      }).then(() => {
        this.content = ''
        this.getList()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chat_room_container {
  width: 100%;
  height: 100%;
  min-width: 400px;
  min-height: 300px;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 20px;
  box-sizing: border-box;
  border: 1px solid rgba(141, 141, 141, 0.5);
  position: relative;
}
.chat_content {
  height: 100%;
  overflow-y: scroll;
  background-color: #f7f9fb;
  box-sizing: border-box;
  padding: 16px;
  padding-bottom: 80px;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
}
.send_box {
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  background-color: #f7f9fb;
  border-top: 1px solid rgba(141, 141, 141, 0.5);
  left: 0;
  bottom: 0;
  z-index: 10;
  .send_btn {
    cursor: pointer;
  }
}
.content_box {
  ::v-deep .el-input__inner {
    border-radius: 24px;
  }
}
.message_item_box {
  margin-bottom: 18px;
  .user_name {
    font-size: 20px;
    margin-left: 8px;
  }
  .message_box {
    padding: 12px;
    margin-left: 30px;
    background: #ffffff;
    border: 1px solid rgba(141, 141, 141, 0.5);
    border-radius: 10px;
  }
  &.is_me {
    .user_name {
      margin-left: 0;
      margin-right: 8px;
    }
    .message_box {
      margin-left: 0;
      margin-right: 30px;
    }
  }
}
</style>
