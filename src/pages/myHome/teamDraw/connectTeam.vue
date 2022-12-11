<template>
  <div class="container">
    <div class="ac">
      <PageNavigator />
      <div class="title ml-24">You are drawing for</div>
    </div>
    <div class="title jac">Main title here: When do you feel most free?</div>
    <p class="subject_about">
      Sollicitant homines non sunt nisi quam formae rerum principiis opiniones.Mors enimest terribilis ut Socrati aliud
      esse apparet.Sed timor mortis est notio terribile.Cum
    </p>
    <div class="refresh_box jac">
      <i class="el-icon-refresh-right"></i>
      <el-button class="btn" type="text">l don"t like this topic, refresh</el-button>
    </div>
    <el-row class="jac">
      <el-col :xs="24" :span="16" class="connect_max box_bod" ref="connectMax">
        <div v-for="(item, index) in userList" :key="index" class="item_box" :style="item.position">
          <div class="fdc jac">
            <el-avatar :size="50" :src="item.head" class="user_head_img"></el-avatar>
            <el-checkbox v-model="item.ready"></el-checkbox>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="fdc jac mt-30">
      <label>
        <el-button type="primary" class="ready_box">
          <el-checkbox v-model="checkedReady">I'm ready!</el-checkbox>
        </el-button>
      </label>
      <el-button class="mt-16" type="text" @click="linkDraw">Skip to drawing</el-button>
    </div>
  </div>
</template>

<script>
import PageNavigator from '@/components/PageNavigator.vue'
import { createPoint } from '@/utils/common'
export default {
  components: {
    PageNavigator
  },
  data() {
    return {
      checkedReady: false,
      userList: []
    }
  },
  created() {},
  mounted() {
    this.initGetUser()
  },
  methods: {
    initGetUser() {
      const dom = this.$refs.connectMax
      const w = dom.$el.clientWidth
      const h = dom.$el.clientHeight
      const pointList = createPoint(w, h, 5, 92)
      this.userList = pointList.map((e, i) => {
        return {
          ready: false,
          position: { top: e.y + 'px', left: e.x + 'px' },
          head: `http://www.ruanyifeng.com/images_pub/pub_${i + 1}.jpg`
        }
      })
    },
    linkDraw() {
      console.log(678, '-->>> 开始作画')
      this.$message.success('作画 [x]')
    }
  }
}
</script>

<style lang="scss" scoped>
.subject_about {
  text-align: center;
  font-size: 12px;
  line-height: 1.2em;
}
.refresh_box {
  color: #409eff;
  .btn {
    margin-left: 6px;
  }
}
.connect_max {
  height: 30vh;
  position: relative;
  .item_box {
    padding: 10px;
    position: absolute;
    .user_head_img {
      margin-bottom: 4px;
    }
  }
}

.ready_box {
  ::v-deep {
    .el-checkbox {
      color: #fff;
    }
    .el-checkbox__label {
      color: #fff;
    }
  }
}
</style>
