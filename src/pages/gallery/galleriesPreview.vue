<template>
  <div>
    <div class="jsb ac mb-24">
      <div>
        <div class="md_title">The Fantasy Trip Gallery</div>
        <div>The most imaginative stories from XER team</div>
      </div>
      <div>
        <el-radio-group v-model="showMode">
          <el-radio-button label="2">Collage View</el-radio-button>
          <el-radio-button label="1">Slideshow</el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <div v-if="showMode == 1">
      <div class="cover_list_max pd-16">
        <el-carousel
          ref="swiper"
          trigger="click"
          height="320px"
          :interval="8000"
          :initial-index="activeIndex"
          indicator-position="outside"
          @change="swiperChange"
        >
          <el-carousel-item v-for="(item, index) in coverList" :key="index">
            <el-row>
              <el-col :span="14" class="jac">
                <el-image
                  class="cover_max"
                  fit="cover"
                  :src="item.coverPath"
                  :preview-src-list="previewSrcList"
                  @click="previewCover(item)"
                ></el-image>
              </el-col>
              <el-col :span="10" class="right_content fdc jsb pl-24">
                <div class="xs_title">{{ item.name }}</div>
                <p class="mb-32">{{ item.content }}</p>
                <div class="share_box jac" @click="share">
                  <svg-icon width="16px" height="16px" icon-class="GalleryShare"></svg-icon>
                  <span class="text">Share</span>
                </div>
                <div class="ac">
                  <el-avatar :size="40" :src="item.coverPath" class="item_head mr-16"></el-avatar>
                  <div>
                    <div>{{ item.description }}</div>
                    <div class="f12 name_msg">{{ item.team }}</div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-carousel-item>
        </el-carousel>
      </div>

      <ScrollCoverList :list="coverList" :current.sync="activeIndex" valueKey="path" @change="footCoverChange" />
    </div>
    <div v-else class="gallery_max">
      <div v-for="(item, index) in coverList" :key="index" class="gallery_item_box">
        <el-image class="img_box" fit="cover" :src="item.coverPath" :preview-src-list="previewSrcList"></el-image>
      </div>
    </div>
  </div>
</template>

<script>
import ScrollCoverList from '@/components/ScrollCoverList.vue'
import { getGalleryList } from '@/apiList/api_work'
export default {
  components: {
    ScrollCoverList
  },
  data() {
    return {
      showMode: '2',
      activeIndex: 0,
      coverList: [],

      showPreview: false,
      selectDraw: {
        cover: '',
        userName: '',
        userImg: '',
        content: '',
        createTime: ''
      }
    }
  },
  computed: {
    previewSrcList() {
      return this.coverList.map((e) => e.path)
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getGalleryList({}).then((res) => {
        this.coverList = res
      })
    },
    swiperChange(e) {
      this.activeIndex = e
    },
    footCoverChange(e) {
      this.$refs.swiper.setActiveItem(e)
    },
    previewCover(item) {
      Object.assign(this.selectDraw, item)
      this.showPreview = true
    },
    share() {
      this.$alert('Send to private mail, email, WhatsApp', 'Share', {
        confirmButtonText: 'confirm',
        callback: (action) => {
          this.$message({
            type: 'info',
            message: `share: ${action}`
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.gallery_max {
  column-count: 4;
  column-gap: 10px;
  .gallery_item_box {
    border-radius: 20px;
    margin-bottom: 12px;
    .img_box {
      max-width: 100%;
    }
  }
}
.cover_list_max {
  .cover_max {
    width: 480px;
    height: 300px;
    overflow: hidden;
    border-radius: 10px;
  }
  .right_content {
    height: 250px;
    .iconfont {
      cursor: pointer;
      font-size: 32px;
    }
    .name_msg {
      color: #999;
    }
  }
}
.share_box {
  width: 80px;
  height: 26px;
  cursor: pointer;
  border: 2px solid #8d8d8d;
  border-radius: 40px;
  .text {
    margin-left: 8px;
  }
}
</style>
