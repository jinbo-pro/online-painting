<template>
  <div>
    <div class="ac">
      <PageNavigator :customer="true" @handleBack="handleBack" />
      <div class="title ml-24">{{ $t(`drawSubject['You are drawing for']`) }}</div>
    </div>
    <div class="title jac">{{ drawInfo.title }}</div>
    <p class="subject_about">{{ drawInfo.description }}</p>
    <div class="refresh_box jac">
      <i class="el-icon-refresh-right"></i>
      <el-button class="btn" type="text" @click="getDrawTitle">
        {{ $t(`drawSubject['l don"t like this topic, refresh']`) }}
      </el-button>
    </div>
    <el-row class="jac">
      <el-col :xs="24" :span="16" class="connect_max box_bod" ref="connectMax">
        <div v-for="(item, index) in userList" :key="index" class="item_box" :style="item.position">
          <div class="fdc jac">
            <el-avatar :size="50" :src="item.head" class="user_head_img"></el-avatar>
            <el-checkbox :value="item.ready"></el-checkbox>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="fdc jac mt-30">
      <label>
        <el-button type="primary" class="ready_box">
          <el-checkbox v-model="checkedReady" @change="readyHandle">{{ $t(`drawSubject["I'm ready!"]`) }}</el-checkbox>
        </el-button>
      </label>
      <el-button class="mt-16" type="text" @click="linkDraw">{{ $t(`drawSubject['Skip to drawing']`) }}</el-button>
    </div>
  </div>
</template>

<script>
import PageNavigator from '@/components/PageNavigator.vue'
import { createPoint } from '@/utils/common'
import { getTeamUser, getTheme, leaveTeam, teamUserCancelReady, teamUserReady, teamUserStart } from '@/apiList/api_work'
import { local, session } from '@/utils/storage'
export default {
  components: {
    PageNavigator
  },
  data() {
    return {
      drawInfo: {
        id: '',
        title: ''
      },
      checkedReady: false,
      pointList: [],
      userList: [],
      teamIsEnd: false
    }
  },
  created() {
    this.teamId = this.$route.query.teamId
    this.getDrawTitle()
  },
  mounted() {
    this.pointList = this.getPointList()
    this.getUserList()
    this.refreshUserList()
  },
  destroyed() {
    if (this.timr) {
      clearInterval(this.timr)
      this.timr = null
    }
  },
  methods: {
    getUserList() {
      const teamId = this.teamId
      if (!teamId) return this.$message.error('未知的团队')
      getTeamUser(teamId).then((res) => {
        if (!this.checkTeamState(res)) {
          this.teamIsEnd = true
          return
        }
        this.userList = res.teamUser.map((e, i) => {
          const point = this.pointList[i]
          return {
            ready: e.status == 2,
            position: { top: point.y + 'px', left: point.x + 'px' },
            id: e.id,
            name: e.name,
            head: `http://www.ruanyifeng.com/images_pub/pub_${i + 1}.jpg`
          }
        })
        const userInfo = local.get('userInfo')
        const curUser = this.userList.find((e) => e.id == userInfo.id)
        this.checkedReady = curUser.ready
      })
    },
    checkTeamState(res) {
      if (!res) return false
      const { teamStatus, teamUser } = res
      if (teamStatus == 2) return false
      if (!Array.isArray(teamUser)) return false
      return true
    },
    getPointList() {
      const pointList = session.get('pointList')
      if (Array.isArray(pointList)) return pointList
      const dom = this.$refs.connectMax
      const w = dom.$el.clientWidth
      const h = dom.$el.clientHeight
      const list = createPoint(w, h, 10, 92)
      session.set('pointList', list)
      return list
    },
    linkDraw() {
      teamUserStart(this.teamId).then((res) => {
        console.log(678, '-->>> 开始作画')
        this.$message.success('作画 [x]')
      })
    },
    async readyHandle(e) {
      if (e) {
        await teamUserReady(this.teamId)
        this.$message.success('准备成功')
      } else {
        await teamUserCancelReady(this.teamId)
        this.$message.success('取消准备成功')
      }
      this.getUserList()
    },
    refreshUserList() {
      this.timr = setInterval(() => {
        this.getUserList()
        if (this.teamIsEnd) {
          clearInterval(this.timr)
          this.timr = null
        }
      }, 1500)
    },
    async handleBack() {
      await this.$confirm('确认删离开当前团队吗？', '提示', { type: 'warning' })
      await leaveTeam(this.teamId)
      this.$router.go(-1)
    },
    getDrawTitle() {
      getTheme({}).then((res) => {
        Object.assign(this.drawInfo, res)
      })
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
