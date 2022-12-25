<template>
  <div class="container">
    <div class="pb-24">
      <PageNavigator />
    </div>
    <div class="about_head_max">
      <div class="left_head">
        <img class="info_cover" :src="currentCover" />
      </div>
      <div class="right_message ml-24">
        <div class="jsb ac">
          <div class="right_title mb-14">Music of Life</div>
          <div class="right_icon as" @click="starDrawHandle">
            <div class="mr-16 fdc jac">
              <i class="iconfont icon-aixin"></i>
              1.2k
            </div>
            <i class="iconfont icon-fenxiangfangshi" @click="showShare = true"></i>
          </div>
        </div>
        <div class="two_title">
          <span class="mr-32">Curafor's Words</span>
          <span>02/12/2022</span>
        </div>
        <p>
          Tenete ergo quod si servitus quae natura liber, et aliena tua tunc impeditur. Dolebis, etturbabuntur, et
          invenietis, cum culpa tam dis hominibusque.Quod si tibi tantum sit propriaet aliena quale sit, nemo unquam vel
          invitum te continebis.
        </p>
      </div>
    </div>
    <div class="cover_list_max box_bod pd-16">
      <el-carousel
        ref="swiper"
        trigger="click"
        height="280px"
        :interval="8000"
        :initial-index="activeIndex"
        indicator-position="outside"
        @change="swiperChange"
      >
        <el-carousel-item v-for="(item, index) in drawingList" :key="index">
          <el-row>
            <el-col :span="12" class="cover_max jac">
              <el-image :src="item.cover" @click="previewCover(item)"></el-image>
            </el-col>
            <el-col :span="12" class="right_content fdc jsb pl-24">
              <div class="ac">
                <el-avatar :size="40" :src="item.cover" class="item_head mr-16"></el-avatar>
                <span>{{ item.userName }}</span>
              </div>
              <p>{{ item.content }}</p>
              <div class="jsb ac">
                <el-button type="primary" round>{{ $t('drawPreview.Marketing') }}</el-button>
                <span>{{ item.createTime }}</span>
              </div>
            </el-col>
          </el-row>
        </el-carousel-item>
      </el-carousel>
    </div>
    <ScrollCoverList :list="drawingList" :current.sync="activeIndex" valueKey="cover" @change="footCoverChange" />
    <PreviewDialog :show.sync="showPreview" :item="selectDraw" />
    <ShareDrawingDialog :show.sync="showShare" />
  </div>
</template>

<script>
import { listData } from '@/utils/mock'
import PageNavigator from '@/components/PageNavigator.vue'
import ScrollCoverList from '@/components/ScrollCoverList.vue'
import PreviewDialog from './components/PreviewDialog.vue'
import ShareDrawingDialog from './components/ShareDrawingDialog.vue'
import { galleryCancelStar, galleryStar, getGalleryById } from '@/apiList/api_work'
export default {
  components: {
    PageNavigator,
    ScrollCoverList,
    PreviewDialog,
    ShareDrawingDialog
  },
  data() {
    return {
      showShare: false,
      showPreview: false,
      activeIndex: 0,
      selectDraw: {
        cover: '',
        userName: '',
        userImg: '',
        content: '',
        createTime: ''
      },
      drawingList: [],
      drawInfo: {
        id: '',
        isStar: ''
      }
    }
  },
  computed: {
    currentCover() {
      return this.drawingList[this.activeIndex].cover
    }
  },
  created() {
    let id = this.$route.query.id
    if (id) {
      this.getDrawInfo(id)
    }
    this.drawingList = listData('3-10')
  },
  methods: {
    getDrawInfo(id) {
      getGalleryById(this.drawId).then((res) => {
        Object.assign(this.drawInfo, res)
      })
    },
    previewCover(item) {
      Object.assign(this.selectDraw, item)
      this.showPreview = true
    },
    swiperChange(e) {
      this.activeIndex = e
    },
    footCoverChange(e) {
      this.$refs.swiper.setActiveItem(e)
    },
    // 点赞/取消点赞
    async starDrawHandle() {
      const id = this.drawInfo.id
      if (this.drawInfo.isStar == 0) {
        await galleryStar(id)
      } else {
        await galleryCancelStar(id)
      }
      this.$message.success('操作成功')
    }
  }
}
</script>

<style lang="scss" scoped>
.about_head_max {
  display: grid;
  grid-template-columns: 150px 1fr;
  .info_cover {
    max-width: 100%;
    max-height: 100%;
  }
}
.right_message {
  .right_title {
    font-size: 20px;
    font-weight: bold;
  }
  .two_title {
    font-size: 14px;
    color: #999;
  }
  .right_icon {
    .iconfont {
      cursor: pointer;
      font-size: 32px;
    }
  }
}
.cover_list_max {
  .right_content {
    height: 250px;
  }
}
</style>
