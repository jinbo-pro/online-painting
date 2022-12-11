<template>
  <el-dialog title="Send a new message" :visible.sync="dialogVisible" width="50%">
    <div class="cover_box jac">
      <div class="mr-16">
        <img class="left_img" src="http://www.ruanyifeng.com/images_pub/pub_1.jpg" />
      </div>
      <div class="fdc jsb">
        <img class="right_img mb-14" src="http://www.ruanyifeng.com/images_pub/pub_2.jpg" />
        <img class="right_img" src="http://www.ruanyifeng.com/images_pub/pub_3.jpg" />
      </div>
    </div>
    <div class="mb-16">Recipient</div>
    <el-input v-model="recipient"></el-input>
    <div class="mt-16 mb-16">Message</div>
    <el-input type="textarea" v-model="message"></el-input>
    <div slot="footer">
      <div class="jac">
        <el-button icon="el-icon-s-promotion" type="primary" @click="dialogVisible = false">Send</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
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
  methods: {}
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
