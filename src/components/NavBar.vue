<template>
  <div class="nav_max">
    <el-row class="jsb ac">
      <el-col :xs="0" :span="4" class="jac">
        <router-link to="/">
          <el-avatar :src="LogoImg"></el-avatar>
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
            {{ $t('navBar.' + item.title) }}
          </div>
          <div class="hidden-xs-only draw_box">
            <el-button type="primary" @click="linkDraw">{{ $t('navBar.Draw') }}</el-button>
          </div>
        </div>
      </el-col>
      <el-col :xs="4" :span="6">
        <div class="jac">
          <SelectLang />
          <el-popover placement="right" width="300" trigger="hover">
            <div class="notice_max pd-24">
              <div
                v-for="(item, index) in noticeList"
                :key="index"
                class="notice_item_box mb-16"
                @click="linkNoticeInfo(item.id)"
              >
                {{ item.title }}
              </div>
            </div>
            <div slot="reference">
              <div class="hidden-xs-only notice_icon mr-14">
                <i class="el-icon-message-solid"></i>
              </div>
            </div>
          </el-popover>
          <el-avatar class="hidden-xs-only" :src="LogoImg"></el-avatar>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SelectLang from '@/components/SelectLang.vue'
import { getIrecipientList } from '@/apiList/api_work'
export default {
  name: 'NavBar',
  components: {
    SelectLang
  },
  data() {
    return {
      noticeList: [],
      LogoImg: require('@/assets/logo.png'),
      activeIndex: 0,
      navList: [
        { title: 'Gallery', url: '/businessGalleryHome', disabled: false },
        { title: 'Connect', url: '', disabled: false },
        { title: 'Play', url: '', disabled: false },
        { title: 'Greet', url: '', disabled: false },
        { title: 'Learn', url: '', disabled: true }
      ]
    }
  },
  created() {
    this.getNoticeList()
  },
  methods: {
    getNoticeList() {
      getIrecipientList({}).then((res) => {
        this.noticeList = res
      })
    },
    handleSelect(item, index) {
      if (item.disabled) return
      this.activeIndex = index
      console.log(item.url, '-->>> url')
      if (!item.url) {
        console.log('链接开发中')
        return
      }
      if (this.$route.path != item.url) {
        this.$router.replace(item.url)
      }
    },
    linkDraw() {
      this.$router.push('/selectDrawMode')
    },
    linkNoticeInfo(id) {
      this.$router.push({
        path: '/busDrawingInfo',
        query: { id }
      })
    },
    load() {
      this.count++
    }
  }
}
</script>

<style lang="scss" scoped>
.nav_max {
  padding: 6px;
  box-sizing: border-box;
  background-color: #ced8e0;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
}
.nav_item_box {
  height: 40px;
  padding: 4px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  &.active {
    border-bottom: 2px solid #409eff;
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
