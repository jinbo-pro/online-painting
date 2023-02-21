<template>
  <div>
    <div class="jend">
      <div>
        <div class="jsb ac">
          <div class="mr-16">Make this visible to the company</div>
          <el-switch v-model="lookRange" active-color="#13ce66"> </el-switch>
        </div>
        <div class="foot_msg">Your creation can be seen Alphabet-wide</div>
      </div>
    </div>
    <div class="cover_list_max pd-16">
      <el-carousel
        trigger="click"
        height="23.42vw"
        :interval="8000"
        :initial-index="activeIndex"
        indicator-position="outside"
        @change="swiperChange"
      >
        <el-carousel-item v-for="(item, index) in drawingList" :key="index">
          <el-row>
            <el-col :span="14" class="jac">
              <el-image class="cover_max" fit="contain" :src="item.path" @click="previewCover(item)"></el-image>
            </el-col>
            <el-col :span="10" class="right_content fdc jsb pl-24">
              <div class="jsb">
                <div class="time_box">Jan 2 - 9, 2023</div>
              </div>
              <div class="jsb ac">
                <div class="xs_title">{{ item.title }}</div>
                <div v-if="item.isStar" @click="starDrawHandle(item)">
                  <i class="iconfont icon-aixin1"></i>
                  {{ item.starCount | numberFormat }}
                </div>
                <i v-else class="iconfont icon-aixin" @click="starDrawHandle(item)"></i>
              </div>
              <p class="mb-32">{{ item.content }}</p>
              <div class="ac">
                <el-avatar :size="40" :src="item.path" class="item_head mr-16"></el-avatar>
                <div>
                  <div>{{ item.userName }}</div>
                  <div class="f12 name_msg">{{ item.userName }}</div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="foot_cover_list jsb ac">
      <div class="left_cover">
        <ScrollCoverList :list="drawingList" :current.sync="activeIndex" valueKey="path" />
      </div>
      <div class="right_btn_box mt-32">
        <div>
          <el-button class="start_drawing" type="success" @click="orderASwag"> Order a Swag </el-button>
        </div>
        <div>
          <el-button class="start_drawing" @click="share"> Share </el-button>
        </div>
        <div>
          <el-button class="start_drawing" @click="download"> Download </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScrollCoverList from '@/components/ScrollCoverList.vue'
import { getDrawInfo } from '@/apiList/api_work'
export default {
  components: {
    ScrollCoverList
  },
  data() {
    return {
      drawId: '',
      lookRange: false,
      activeIndex: 0,
      drawingList: []
    }
  },
  created() {
    this.drawId = this.$route.query.drawId
    getDrawInfo(this.drawId).then((res) => {
      this.drawingList = [res]
    })
  },
  methods: {
    swiperChange(e) {
      this.activeIndex = e
    },
    orderASwag() {
      this.$router.push('/shoppingMall')
    },
    share() {
      this.$alert('share content', 'title', {
        confirmButtonText: 'confirm',
        callback: (action) => {
          this.$message({
            type: 'info',
            message: `share: ${action}`
          })
        }
      })
    },
    download() {
      const cur = this.drawingList[this.activeIndex]
      const elink = document.createElement('a')
      elink.style.display = 'none'
      elink.href = cur.path
      document.body.appendChild(elink)
      elink.click()
    },
    // 点赞/取消点赞
    async starDrawHandle(item) {
      // const id = item.id
      // if (item.isStar !== 0) {
      //   await galleryStar(id)
      // } else {
      //   await galleryCancelStar(id)
      // }
      // this.getDrawInfo()
      const index = this.drawingList.findIndex((e) => e.id == item.id)
      this.drawingList.splice(index, 1, { ...item, isStar: !item.isStar })
    }
  }
}
</script>

<style lang="scss" scoped>
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
.start_drawing {
  width: 80%;
  padding: 12px;
  border-radius: 32px;
}
.time_box {
  font-size: 12px;
  padding: 4px 6px;
  border-radius: 16px;
  box-sizing: border-box;
  font-weight: normal;
  border: 1px solid #daddb4;
}

.foot_msg {
  font-size: 12px;
  color: #8d8d8d;
}
.foot_cover_list {
  .left_cover {
    width: 80%;
  }
  .right_btn_box {
    width: 20px;
    width: 250px;
    div {
      margin-bottom: 8px;
    }
  }
}
.icon-aixin1 {
  color: red;
}
</style>
