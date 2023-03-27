<template>
  <div class="nav_max">
    <el-row class="jsb ac">
      <el-col :xs="0" :span="4" class="jac">
        <router-link to="/">
          <svg-icon width="2.92vw" height="2.92vw" icon-class="Logo"></svg-icon>
        </router-link>
      </el-col>
      <el-col :xs="20" :span="14">
        <div class="jsb ac">
          <div
            v-for="(item, index) in navList"
            :key="index"
            @click="handleSelect(item, index)"
            :class="['nav_item_box jac', { active: activeIndex == index }, { disabled: item.disabled }]"
          >
            <div v-if="item.children && item.children.length && !item.disabled">
              <el-dropdown>
                <span>{{ $t('navBar.' + item.title) }}</span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(e, i) in item.children"
                    :key="i"
                    @click.native="dropLinkPage(e.url, index)"
                    :disabled="e.disabled"
                  >
                    {{ e.title }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div v-else>{{ $t('navBar.' + item.title) }}</div>
          </div>
          <!-- <div class="hidden-xs-only draw_box">
            <el-button type="primary" @click="$router.push('/selectDrawMode')">{{ $t('navBar.Draw') }}</el-button>
          </div> -->
        </div>
      </el-col>
      <el-col :xs="4" :span="6">
        <div class="jac">
          <el-popover placement="right" width="300" trigger="hover">
            <div class="notice_max pd-24">
              <div
                v-for="(item, index) in noticeList"
                :key="index"
                class="notice_item_box mb-16"
                @click="$router.push(`/inbox?id=${item.id}`)"
              >
                {{ item.content }} {{ item.createDate | parseTimeFnumber(item.createTime) }}
              </div>
            </div>
            <div slot="reference">
              <div class="mr-16">
                <svg-icon width="1.46vw" height="1.46vw" icon-class="TopNotice"></svg-icon>
              </div>
            </div>
          </el-popover>
          <el-dropdown>
            <HeadPhoto :cover="userInfo.photo" :size="40" />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(e, i) in profileList" :key="i" @click.native="profileHandle(e)">
                {{ e.title }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getIrecipientList, userLogout } from '@/apiList/api_work'
import { local } from '@/utils/storage'
import { getConnectState, getModuleSettings } from '@/apiList/api_v1'
import HeadPhoto from '@/components/HeadPhoto.vue'
export default {
  name: 'NavBar',
  components: {
    HeadPhoto
  },
  data() {
    return {
      noticeList: [],
      LogoImg: require('@/assets/logo.png'),
      activeIndex: 0,
      navList: [
        {
          title: 'Greet',
          url: '/greet',
          disabled: false,
          children: [
            { title: 'Individual', url: '/individualGreetMode' },
            { title: 'Team', url: '/myReflections', disabled: true }
          ]
        },
        {
          title: 'Connect',
          url: '/connect',
          disabled: true,
          children: [
            { title: 'My Connect', url: '/myConnect' },
            { title: 'Dashboard', url: '/connectDashboard' }
          ]
        },
        {
          title: 'Reflect',
          url: '/reflect',
          disabled: true,
          children: [
            { title: 'Create New', url: '/selectReflectionMode' },
            { title: 'My Reflections', url: '/myReflections' }
          ]
        },
        {
          title: 'Gallery',
          url: '/galleriesPreview',
          disabled: true,
          children: [{ title: 'All Galleries', url: '/allGalleries' }]
        },
        { title: 'Play', url: '', disabled: true }
      ],
      profileList: [
        { title: 'Sign out', url: 'Sign out' },
        { title: 'Profile Settings', url: '/profileSettings' },
        { title: 'My Orders', url: '/myOrders' }
      ],
      userInfo: {
        photo: ''
      }
    }
  },
  created() {
    this.userInfo = local.get('userInfo')
    const path = this.$route.matched[0].path
    const index = this.navList.findIndex((e) => e.url == path)
    this.activeIndex = index > 0 ? index : 0
    this.getNoticeList()
    // 获取模块的可用
    getModuleSettings({}).then((res) => {
      if (!res) return
      for (let item of this.navList) {
        const k = item.title.toLocaleLowerCase()
        item.disabled = res[k] != 1
      }
    })
  },
  methods: {
    async profileHandle(e) {
      const url = e.url
      if (url == 'Sign out') {
        await this.$confirm('Are you sure to exit?', 'Tips', { type: 'warning' })
        await userLogout({})
        local.clear()
        location.reload()
        return
      }
      if (this.$route.path == url) return
      this.$router.push(url)
    },
    getNoticeList() {
      getIrecipientList({}).then((res) => {
        this.noticeList = res
      })
    },
    handleSelect(item, index) {
      if (item.disabled) return
      this.activeIndex = index
      this.linkPage(item.url)
    },
    async dropLinkPage(url, index) {
      this.activeIndex = index
      // 跳转到我的连接时判断当前连接状态
      if (url == '/myConnect') {
        const res = await getConnectState({})
        if (res.currentStatus > 3) {
          this.$router.push('/drawDoneDiscuss')
          return
        }
      }
      this.linkPage(url)
    },
    linkPage(url) {
      if (this.$route.path == url) return
      this.$router.push(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav_max {
  padding: 6px;
  box-sizing: border-box;
  background-color: #fff;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
}
.nav_item_box {
  height: 40px;
  padding: 4px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  &.active {
    border-bottom: 2px solid #7da453;
  }
  &.disabled {
    color: #999;
    cursor: not-allowed;
  }
}
.draw_box {
  padding: 0 3%;
}
.notice_icon {
  cursor: pointer;
  font-size: 26px;
}
.notice_max {
  height: 230px;
  overflow-y: scroll;
  .notice_item_box {
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      color: #409eff;
      transition: 0.3s;
    }
  }
}
</style>
