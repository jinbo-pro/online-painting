<template>
  <div>
    <el-row class="drawing_container">
      <el-col :xs="0" :span="4" class="jsb ac">
        <div class="left_nav_max container fdc jsb">
          <el-tabs tab-position="right" class="nav_content">
            <el-tab-pane v-for="(item, index) in leftNavList" :key="index" :label="item.title"> </el-tab-pane>
          </el-tabs>
          <div class="foot_btn pb-16 fdc jsb ac">
            <div class="mb-16">
              <el-button type="primary">Sign Out</el-button>
            </div>
            <el-button type="text">Help</el-button>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :span="20">
        <div class="right_drawing_max container pd-24">
          <div class="title">Create something new</div>
          <div class="create_btn" @click="linkDraw">
            <div class="btn_box jac">
              <i class="el-icon-circle-plus"></i>
            </div>
            <p v-if="isManage" class="foot_msg jac">+ new company gallery</p>
            <p v-else class="foot_msg jac">+ new canvas</p>
          </div>
          <div class="title">My drawings</div>
          <div class="drawing_content">
            <DrawingGroup :list="drawingList" @handle="linkInfo" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DrawingGroup from '@/components/drawing/DrawingGroup.vue'
import { listData } from '@/utils/mock'
import { local } from '@/utils/storage'
export default {
  components: {
    DrawingGroup
  },
  data() {
    return {
      isManage: false,
      leftNavList: [
        { id: 1, title: 'My Drawings', url: '' },
        { id: 2, title: 'My Account', url: '' }
      ],
      drawingList: []
    }
  },
  created() {
    this.drawingList = listData('3-10')
    this.isManage = local.get('userName') == 'admin'
  },
  methods: {
    linkDraw() {
      if (this.isManage) {
        this.$router.push('/createDrawingPreview')
      } else {
        this.$router.push('/selectDrawMode')
      }
    },
    linkInfo(item) {
      this.$router.push({
        path: '/drawingInfo',
        query: { id: item.id || 1 }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.left_nav_max {
  padding: 0;
  box-sizing: border-box;
  border-right: 2px solid #f1f1f1;
  div {
    height: 100%;
  }
  .nav_content {
    ::v-deep .el-tabs__header {
      width: 100%;
    }
  }
  .foot_btn {
    height: 100px;
  }
}
.right_drawing_max {
  overflow-y: scroll;
  box-sizing: border-box;
  .foot_msg {
    font-size: 16px;
  }
}
.create_btn {
  width: 150px;
  .btn_box {
    width: 150px;
    height: 150px;
    font-size: 26px;
    color: #999;
    border: 1px solid #f1f1f1;
  }
}
</style>
