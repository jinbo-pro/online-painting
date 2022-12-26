<template>
  <div class="container">
    <div class="ac mb-24" @click="linkSearch">
      <span class="mr-24">{{ $t('app.Search') }}</span>
      <el-input v-model="keyword" placeholder="prompt, theme, keywords..." style="width: 40%"></el-input>
    </div>
    <el-row>
      <el-col :span="18" class="banner_max box_bod">
        <el-carousel trigger="click" height="280px" :interval="8000" indicator-position="outside">
          <el-carousel-item v-for="(item, index) in bannerList" :key="index">
            <el-row @click.native="linkBannerInfo(item.id)">
              <el-col :span="12" class="cover_max pd-12 jac">
                <el-image class="info_cover" :src="item.coverPath"></el-image>
              </el-col>
              <el-col :span="12">
                <div class="mt-12">{{ item.description }}</div>
                <div class="title">{{ item.name }}</div>
                <div class="user_max fw ac">
                  <div v-for="(user, i) in item.userList" :key="i" class="user_item_box">{{ user }}</div>
                </div>
                <div class="mt-24 ml-16">
                  <el-row class="ac">
                    <el-col :span="8" class="avatar_max">
                      <el-avatar
                        v-for="e in item.userList.slice(0, 3)"
                        :key="e"
                        :size="40"
                        src="/bg.jpg"
                        class="item_head"
                      ></el-avatar>
                    </el-col>
                    <el-col :span="16" class="pl-14 fw ac tag_max">
                      <div
                        v-for="(tag, i) in item.identityList"
                        :key="i"
                        class="tag_item_box"
                        :style="`background-color: ${tag.bgc};`"
                      >
                        {{ $t('identity.' + tag.label) }}
                      </div>
                    </el-col>
                  </el-row>
                  <div class="pr-24 jend ac">
                    <div class="stars_icon">
                      <i class="iconfont icon-aixin"></i>
                    </div>
                    {{ item.stars | numberFormat }}
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="6">
        <div class="trending_max box_bod ml-14 pd-24">
          <div class="title xs_title">Trending Prompts</div>
          <div v-for="(item, index) in trendingList" :key="index" class="item_tre">
            {{ index + 1 }} . {{ item.title }}
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="mb-16 mt-16">Popular</div>
    <div class="popular_max">
      <DrawingGroup :list="popularList" @handle="linkInfo" />
    </div>
    <div class="mb-16 mt-16">Team Gallery</div>
    <div class="popular_max">
      <DrawingGroup :list="teamGalleryList" @handle="linkInfo" />
    </div>
    <div class="line_se"></div>
  </div>
</template>

<script>
import DrawingGroup from '@/components/drawing/DrawingGroup.vue'
import { listData } from '@/utils/mock'
import { getGalleryBannerList, getGalleryHomeList, getGalleryList } from '@/apiList/api_work'
export default {
  components: {
    DrawingGroup
  },
  data() {
    return {
      keyword: '',
      bannerList: [],
      trendingList: [],
      popularList: [],
      teamGalleryList: []
    }
  },
  created() {
    this.trendingList = listData('5-10')
    this.getList()
  },
  methods: {
    getList() {
      const getDrawList = (res) => {
        if (!Array.isArray(res)) return []
        return res.map((e) => {
          return {
            path: e.coverPath,
            title: e.name
          }
        })
      }
      // 获取画廊 banner 列表
      getGalleryBannerList({}).then((res) => {
        if (!Array.isArray(res)) return
        const mockList = listData(res.length)
        this.bannerList = mockList.map((e, i) => {
          return {
            ...e,
            ...res[i]
          }
        })
      })

      // 获取画廊 首页 列表
      getGalleryHomeList({}).then((res) => {
        if (!res) return
        this.popularList = getDrawList(res.popular)
        this.teamGalleryList = getDrawList(res.teamGallery)
      })
    },
    linkSearch() {
      this.$router.push({
        path: '/drawingSearch',
        query: { keyword: this.keyword }
      })
    },
    linkBannerInfo(id) {
      this.$router.push({
        path: '/busDrawingInfo',
        query: { id }
      })
    },
    linkInfo() {
      console.log('预览?')
    }
  }
}
</script>

<style lang="scss" scoped>
.cover_max {
  height: 280px;
}
.banner_max {
  .title {
    padding: 16px 0;
  }
}
.avatar_max {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: hidden;
  .item_head {
    margin-left: -14px;
  }
  .item_head:first-child {
    margin-left: 0;
  }
}
.user_max {
  .user_item_box {
    padding: 2px 6px;
    color: #fff;
    background-color: #e1e1e1;
    margin-right: 8px;
    margin-bottom: 8px;
  }
}
.tag_max {
  .tag_item_box {
    border-radius: 16px;
    color: #fff;
    padding: 4px 8px;
    margin-right: 8px;
    margin-bottom: 8px;
  }
}
.stars_icon {
  margin-right: 8px;
  .iconfont {
    font-size: 32px;
  }
}
.trending_max {
  padding-top: 0;
  height: 308px;
  overflow: hidden;
  .item_tre {
    margin-bottom: 8px;
  }
}
</style>
