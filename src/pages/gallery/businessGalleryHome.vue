<template>
  <div class="container">
    <div class="ac mb-24">
      <span class="mr-24">Search</span>
      <el-input placeholder="prompt, theme, keywords..." style="width: 40%"></el-input>
    </div>
    <el-row>
      <el-col :span="18" class="banner_max box_bod">
        <el-carousel trigger="click" height="280px" :interval="8000" indicator-position="outside">
          <el-carousel-item v-for="(item, index) in bannerList" :key="index">
            <el-row>
              <el-col :span="12" class="cover_max pd-12 jac">
                <el-image class="info_cover" :src="item.cover"></el-image>
              </el-col>
              <el-col :span="12">
                <div class="mt-12">Featured Gallery</div>
                <div class="title">December, Remember</div>
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
                        v-for="(tag, i) in item.tagList"
                        :key="i"
                        class="tag_item_box"
                        :style="`background-color: ${tag.bgc};`"
                      >
                        {{ tag.title }}
                      </div>
                    </el-col>
                  </el-row>
                  <div class="pr-24 jend ac">
                    <img class="stars_icon" src="@/assets/icon/stars.png" />
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
          <div v-for="(item, index) in trendingList" :key="index" class="item_tre">{{ index + 1 }} . {{ item }}</div>
        </div>
      </el-col>
    </el-row>
    <div class="mb-16 mt-16">Popular</div>
    <div class="popular_max">
      <div v-for="(item, index) in popularList" :key="index" class="fdc jac">
        <el-image class="drawing_item_box" :src="item.cover" lazy></el-image>
        <div class="mt-12">{{ item.text }}</div>
      </div>
    </div>
    <div class="mb-16 mt-16">Team Gallery</div>
    <div class="popular_max">
      <div v-for="(item, index) in teamGalleryList" :key="index" class="fdc jac">
        <el-image class="drawing_item_box" :src="item.cover" lazy></el-image>
        <div class="mt-12">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Mock from 'mockjs'
export default {
  data() {
    return {
      bannerList: [],
      trendingList: [],
      popularList: [],
      teamGalleryList: []
    }
  },
  created() {
    const res = Mock.mock({
      'data|5': [
        {
          stars: '@integer(1, 9999)',
          cover: 'http://www.ruanyifeng.com/images_pub/pub_@integer(1, 10).jpg',
          'userList|2-5': ['@name()'],
          'tagList|3': [{ title: '@word()', bgc: '@color()' }]
        }
      ]
    })
    this.bannerList = res.data
    const res2 = Mock.mock({ 'data|5-10': ['@word()'] })
    this.trendingList = res2.data
    const res3 = Mock.mock({
      'data|3-10': [
        {
          cover: 'http://www.ruanyifeng.com/images_pub/pub_@integer(1, 10).jpg',
          text: '@word()'
        }
      ]
    })
    this.popularList = res3.data
    this.teamGalleryList = res3.data
  },
  methods: {}
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
    padding: 2px 6px;
    margin-right: 8px;
    margin-bottom: 8px;
  }
}
.stars_icon {
  width: 32px;
  margin-right: 8px;
}
.trending_max {
  padding-top: 0;
  height: 308px;
  overflow: hidden;
  .item_tre {
    margin-bottom: 8px;
  }
}
.popular_max {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
}
.drawing_item_box {
  .cover {
    max-width: 100%;
    max-height: 130px;
  }
}
</style>
