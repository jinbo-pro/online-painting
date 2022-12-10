<template>
  <div class="container">
    <div class="ac">
      <PageNavigator />
      <div class="title ml-24">You are drawing for</div>
    </div>
    <div class="title jac">Main title here: When do you feel most free?</div>
    <p class="subject_about">
      Sollicitant homines non sunt nisi quam formae rerum principiis opiniones.Mors enimest terribilis ut Socrati aliud
      esse apparet.Sed timor mortis est notio terribile.Cum
    </p>
    <div class="refresh_box jac">
      <i class="el-icon-refresh-right"></i>
      <el-button class="btn" type="text">l don"t like this topic, refresh</el-button>
    </div>
    <el-row class="jac">
      <el-col :xs="24" :span="16" class="jac">
        <div class="about_video">
          <video
            class="meta"
            controls
            src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
          ></video>
        </div>
      </el-col>
    </el-row>
    <div class="fdc jac mt-30">
      <el-button type="primary" @click="linkDraw" :disabled="count != 0">
        Counting down {{ count ? `${count}s` : '' }}
      </el-button>
      <el-button class="mt-16" type="text" @click="linkDraw">Skip to drawing</el-button>
    </div>
  </div>
</template>

<script>
import PageNavigator from '@/components/PageNavigator.vue'
import { SetTimr } from '@/utils/common'
export default {
  components: {
    PageNavigator
  },
  data() {
    return {
      count: 30
    }
  },
  created() {},
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
}
</style>
