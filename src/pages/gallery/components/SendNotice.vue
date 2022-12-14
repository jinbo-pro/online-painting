<template>
  <el-dialog :title="$t(`sendNotice['Send a new message']`)" :visible.sync="dialogVisible" width="50%">
    <div class="mb-16">{{ $t(`sendNotice['Recipient']`) }}</div>
    <el-input v-model="recipient"></el-input>
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
  methods: {
    send() {
      this.$emit('send', { recipient: this.recipient, message: this.message })
    }
  }
}
</script>

<style lang="scss" scoped></style>
