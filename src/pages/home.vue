<template>
  <div>
    <el-row class="drawing_container jsb ac">
      <el-col :span="4">
        <div class="left_nav_max fdc jsb">
          <el-tabs tab-position="right" class="nav_content">
            <el-tab-pane v-for="(item, index) in leftNavList" :key="index" :label="item.title"> </el-tab-pane>
          </el-tabs>
          <div class="pb-16 fdc jsb ac">
            <div class="mb-16">
              <el-button type="primary">Sign Out</el-button>
            </div>
            <el-button type="text">Help</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="right_drawing_max pd-24">
          <div class="title">Create something new</div>
          <div class="create_btn">
            <div class="btn_box jac">
              <i class="el-icon-circle-plus"></i>
            </div>
            <p class="foot_msg jac">+ new canvas</p>
          </div>
          <div class="title">My drawings</div>
          <div class="drawing_content">
            <div v-for="(item, index) in drawingList" :key="index" class="drawing_item_box">
              <el-image class="cover" :src="item.cover" lazy></el-image>
              <p>Tanta petere igitur, ne sineres memini fieri etiam aliquam</p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leftNavList: [
        { id: 1, title: 'My Drawings', url: '' },
        { id: 2, title: 'My Account', url: '' }
      ],
      drawingList: []
    }
  },
  created() {
    this.drawingList = Array(15).fill({ cover: require('@/assets/bg.jpg') })
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
$h: calc(100vh - 62px);

.left_nav_max {
  min-height: $h;
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
}
.right_drawing_max {
  height: $h;
  overflow-y: scroll;
  box-sizing: border-box;
  .title {
    font-size: 24px;
    font-weight: bold;
    padding: 24px 0;
  }
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
.drawing_content {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
}
.drawing_item_box {
  .cover {
    max-width: 100%;
  }
}
</style>
