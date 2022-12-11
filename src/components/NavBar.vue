<template>
  <div class="nav_max">
    <el-row class="jsb ac">
      <el-col :xs="0" :span="4" class="jac">
        <el-avatar :src="LogoImg"></el-avatar>
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
          <div class="hidden-xs-only notice_icon mr-14">
            <i class="el-icon-message-solid"></i>
          </div>
          <el-avatar class="hidden-xs-only" :src="LogoImg"></el-avatar>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SelectLang from '@/components/SelectLang.vue'
export default {
  name: 'NavBar',
  components: {
    SelectLang
  },
  data() {
    return {
      LogoImg: require('@/assets/logo.png'),
      activeIndex: 0,
      navList: [
        { title: 'Gallery', url: '/businessGalleryHome', disabled: false },
        { title: 'Connect', url: '/Connect', disabled: false },
        { title: 'Play', url: '/Play', disabled: false },
        { title: 'Greet', url: '/Greet', disabled: false },
        { title: 'Learn', url: '/Learn', disabled: true }
      ]
    }
  },
  created() {},
  methods: {
    handleSelect(item, index) {
      if (item.disabled) return
      this.activeIndex = index
      console.log(item.url, '-->>> url')
      if (this.$route.path != item.url) {
        this.$router.replace(item.url)
      }
    },
    linkDraw() {
      this.$router.push('/selectDrawMode')
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
</style>
