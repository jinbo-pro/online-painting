<template>
  <div class="container">
    <div class="ac">
      <PageNavigator />
      <div class="title ml-24">{{ $t(`drawMode['Prepare your AI canvas']`) }}</div>
    </div>
    <el-row class="content_max">
      <el-col :span="8" class="box fdc jsb ac">
        <div class="title top">{{ $t(`drawMode['Canvas mode']`) }}</div>
        <div v-for="(item, index) in leftSelectModeList" :key="index" class="select_mode">
          <label class="select_label fdc jac">
            <el-radio v-model="activeMode" :label="item.value" class="radio"></el-radio>
            <img class="mb-16" :src="item.icon" alt="" />
            <div class="title">{{ $t(`drawMode['${item.title}']`) }}</div>
          </label>
        </div>
      </el-col>
      <el-col :span="16" class="pl-24">
        <div class="box fdc jsb ac">
          <div class="title top jac">{{ $t(`drawMode['Do you want to draw for?']`) }}</div>
          <div class="right_type fw jac">
            <div v-for="(item, index) in drawModeList" :key="index" class="item_type_box fdc jac">
              <div class="item_type box_bod">
                <label class="select_label fdc jac">
                  <el-radio v-model="activeType" :label="item.value" class="radio"></el-radio>
                  <img :src="item.icon" alt="" />
                </label>
              </div>
              <div>{{ $t(`drawMode['${item.title}']`) }}</div>
            </div>
          </div>
          <div class="foot_btn jac mt-24">
            <el-button v-if="activeMode == 1" type="primary" @click="linkDraw">
              {{ $t(`drawMode["Let's draw!"]`) }}
            </el-button>
            <template v-else>
              <el-button type="primary" @click="createDrawGroup">创建组</el-button>
              <el-button type="primary" @click="openTeamList">加入组</el-button>
            </template>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="选择加入的房间" :visible.sync="dialogTableVisible">
      <el-table :data="teamList">
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="createDate" label="创建时间">
          <template slot-scope="{ row }">
            {{ row.createDate | parseTimeFnumber(row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button size="mini" type="primary" @click="joinDrawGroup(row.id)">加入</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import PageNavigator from '@/components/PageNavigator.vue'
import { addTeam, addTeamUser, getTeamId, getTeamList, leaveTeam } from '@/apiList/api_work'
import { local } from '@/utils/storage'
export default {
  components: {
    PageNavigator
  },
  data() {
    return {
      activeMode: 1,
      leftSelectModeList: [
        { value: 1, title: 'By myself', icon: require('@/assets/draw-mode/1.png') },
        { value: 2, title: 'With someone', icon: require('@/assets/draw-mode/2.png') }
      ],
      activeType: 1,
      dialogTableVisible: false,
      teamList: []
    }
  },
  computed: {
    drawModeList() {
      if (this.activeMode == 1) {
        return [
          { value: 1, title: 'Self Relfection', icon: require('@/assets/draw-mode/3.png') },
          { value: 2, title: 'Greetings for athers', icon: require('@/assets/draw-mode/4.png') },
          { value: 3, title: 'Stress-relief games', icon: require('@/assets/draw-mode/5.png') }
        ]
      } else {
        return [
          { value: 21, title: 'Getting to connect with a new person', icon: require('@/assets/draw-mode/2.png') },
          { value: 22, title: 'Crafting a group greeting', icon: require('@/assets/draw-mode/4.png') },
          { value: 23, title: 'Quick games with the team', icon: require('@/assets/draw-mode/5.png') },
          { value: 24, title: 'Team-building games', icon: require('@/assets/draw-mode/6.png') }
        ]
      }
    }
  },
  created() {
    this.checkIsJoinTeam()
  },
  methods: {
    async checkIsJoinTeam() {
      const info = await getTeamId({})
      if (!info || !info.id) return
      this.$confirm(`${info.name} <br />是否进入?`, '您有一个正在进行中的团队', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '进入',
        cancelButtonText: '离开',
        type: 'warning'
      })
        .then(() => {
          this.$router.push({
            path: '/connectTeam',
            query: { teamId: info.id }
          })
        })
        .catch(() => {
          leaveTeam(info.id).then(() => {
            this.$message.success('离开成功')
          })
        })
    },
    linkDraw() {
      let path = '/drawSubject'
      if (this.activeMode == 2) {
        path = '/connectTeam'
      }
      this.$router.push({
        path,
        query: { mode: this.activeMode }
      })
    },
    async createDrawGroup() {
      const userInfo = local.get('userInfo')
      const res = await addTeam({
        name: userInfo.name + '新建的绘画房间',
        type: '1'
      })
      this.$router.push({
        path: '/connectTeam',
        query: { mode: this.activeMode, teamId: res.id }
      })
    },
    openTeamList() {
      this.dialogTableVisible = true
      getTeamList({ type: '1' }).then((res) => {
        this.teamList = res
      })
    },
    joinDrawGroup(teamId) {
      addTeamUser(teamId).then((res) => {
        this.$router.push({
          path: '/connectTeam',
          query: { mode: this.activeMode, teamId }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content_max {
  height: calc(100% - 80px);
  .top {
    font-size: 18px;
  }
  .select_mode {
    width: 90%;
    height: 40%;
    position: relative;
    border: 1px solid #f1f1f1;
    .title {
      font-size: 22px;
    }
  }
  .select_label {
    width: 100%;
    height: 100%;
    ::v-deep .el-radio__label {
      color: transparent;
    }
  }
  .radio {
    position: absolute;
    top: 16px;
    left: 16px;
  }
  .foot_btn {
    margin-bottom: 45px;
  }
}
.box {
  height: 100%;
  border: 1px solid #f1f1f1;
  box-sizing: border-box;
  padding: 16px 0;
}

.right_type {
  .item_type_box {
    width: 42%;
  }
  & .item_type_box:nth-of-type(even) {
    margin-left: 24px;
  }
  .item_type {
    width: 100%;
    position: relative;
    height: 18vh;
    padding: 16px;
    margin: 16px;
  }
}
</style>
