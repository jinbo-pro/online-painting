<template>
  <el-dialog :visible.sync="dialogVisible" width="90%">
    <el-row>
      <el-col :span="12">
        <el-image :src="item.cover"></el-image>
      </el-col>
      <el-col :span="12" class="right_content fdc jsb pl-24">
        <div class="jsb ac">
          <div class="ac">
            <el-avatar :size="40" :src="item.userImg" class="item_head mr-16"></el-avatar>
            <span>{{ item.userName }}</span>
          </div>
          <i v-if="isShare" class="el-icon-s-promotion"></i>
        </div>
        <p>{{ item.content }}</p>
        <div class="jsb ac">
          <el-button type="primary" round>{{ $t('drawPreview.Marketing') }}</el-button>
          <span>{{ item.createTime }}</span>
        </div>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  name: 'PreviewDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    isShare: {
      type: Boolean,
      default: true
    },
    item: {
      type: Object,
      default: () => ({})
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
.right_content {
  height: 250px;
  .el-icon-s-promotion {
    font-size: 32px;
  }
}
</style>
