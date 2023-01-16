<template>
  <div>
    <div class="ac">
      <PageNavigator />
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
      <el-col :xs="24" :span="16" class="jac">
        <div class="about_video">
          <video class="meta" v-if="drawInfo.path.endsWith('.mp4')" controls :src="drawInfo.path"></video>
          <img class="about_img" v-else :src="drawInfo.path">
        </div>
      </el-col>
    </el-row>
    <div class="fdc jac mt-30">
      <el-button type="primary" @click="linkDraw" :disabled="count != 0">
        {{ $t(`drawSubject['Counting down']`) }} {{ count ? `${count}s` : '' }}
      </el-button>
      <el-button class="mt-16" type="text" @click="linkDraw">{{ $t(`drawSubject['Skip to drawing']`) }}</el-button>
    </div>
  </div>
</template>

<script>
import PageNavigator from '@/components/PageNavigator.vue'
import { SetTimr } from '@/utils/common'
import { getTheme } from '@/apiList/api_work'
export default {
  components: {
    PageNavigator
  },
  data() {
    return {
      count: 30,
      drawInfo: {
        id: '',
        path: '',
        title: ''
      }
    }
  },
  created() {
    this.getDrawTitle()
  },
  mounted() {
    const t = new SetTimr(this.count)
    t.start((count) => {
      this.count = count
    })
  },
  methods: {
    linkDraw() {
      console.log(678, '-->>> 开始作画')
      this.$message.success('作画 [x]')
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
.about_video {
  padding: 24px 0;
  .meta {
    width: 100%;
  }
  .about_img {
    max-height: 300px;
  }
}
</style>
