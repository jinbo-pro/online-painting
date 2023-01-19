<template>
  <el-row class="inner_content">
    <el-col :span="14">
      <div class="top_message ac">
        <div>Hey Chelsea, come to meet your CONNECT for</div>
        <div class="time_box">jan 2 - 9, 2023</div>
      </div>
      <div class="top_message ac">
        <div>Ben Green is expecting your creative piece in</div>
        <div class="time_box">3 day 5 hours</div>
      </div>
      <div class="jac">
        <div class="left_max jac">
          <el-avatar :size="220" :src="LogoImg"></el-avatar>
          <div class="message_box ml-24">
            <div class="mb-12">Hey, I am</div>
            <div class="user_name">Ben Green</div>
            <p class="about_title">Market Manager So great to meet you Chelsea!</p>
            <div class="about_info">
              Hi, I've been in the marketing team for 3 years. I like playing with my dog after work (sometimes durign
              work)
            </div>
            <div v-if="editType == 'create'" class="foot_btn jac mt-24">Switch</div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col v-if="editType == 'create'" :span="10" class="right_info_max">
      <div class="md_title">Ready to go?</div>
      <div class="jsb ac">
        <div>Deadline in</div>
        <div class="time_box">3 days 5 hours 30 mins</div>
      </div>
      <div class="jsb ac mt-12">
        <div>CONNECT with</div>
        <div class="user_name">Ben Green</div>
      </div>
      <div class="mt-24">Your Mission:</div>
      <div class="md_title">Stories and memories</div>
      <el-radio-group v-model="radio">
        <div v-for="(item, index) in discoverDrawList" :key="index" class="item_select_discover">
          <el-radio :label="item.value">{{ item.label }}</el-radio>
        </div>
      </el-radio-group>
      <div class="md_title">Thinking Guide(L4)</div>
      <p>
        Is there a memorable moment during travel? Or any eventful story with ups and downs? Did you meet someone
        special in the trip?
      </p>
      <div class="jac mt-32">
        <el-button class="start_drawing" type="success" @click="$router.push('/createNewPainting')">
          Start Drawing
        </el-button>
      </div>
    </el-col>
    <el-col v-else :span="10" class="right_info_max">
      <div class="mt-24">Your Mission:</div>
      <div class="md_title">Stories and memories</div>
      <p>Best travel experience I’ve had recently</p>
      <div class="cover_box jac">
        <el-image class="cover" src="http://www.ruanyifeng.com/images_pub/pub_1.jpg" lazy></el-image>
      </div>
      <div class="jac mt-32">
        <el-button class="start_drawing" type="success" @click="linkPage">Edit my draft</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { currentConnect } from '@/apiList/api_v1'
export default {
  data() {
    return {
      editType: 'create',
      radio: 2,
      LogoImg: require('@/assets/logo.png'),
      discoverDrawList: [
        { label: 'L3 - Body', value: 1 },
        { label: 'Best travel experience I’ve had recently', value: 2 },
        { label: 'What is something new you’ve recently tried that changed your life ', value: 3 }
      ]
    }
  },
  created() {
    this.editType = this.$route.query.editType || 'create'
    this.getInitData()
  },
  methods: {
    getInitData() {
      currentConnect({}).then((res) => {
        console.log(res, '-->>> 678')
      })
    },
    linkPage() {
      this.$router.push({
        path: '/editDraftPainting',
        query: { id: 1 }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.top_message {
  font-size: 20px;
  font-weight: bold;
  margin-right: 6px;
  margin-bottom: 8px;
}
.time_box {
  font-size: 12px;
  padding: 4px 6px;
  margin-left: 16px;
  border-radius: 16px;
  box-sizing: border-box;
  font-weight: normal;
  border: 1px solid #daddb4;
}
.left_max {
  margin-top: 36px;
  .message_box {
    width: 40%;
    .user_name {
      color: #7da453;
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 8px;
    }
    .about_title {
      font-size: 22px;
      font-weight: bold;
    }
    .about_info {
      color: #8d8d8d;
      font-size: 12px;
    }
    .foot_btn {
      border: 2px solid #7da453;
      border-radius: 24px;
      cursor: pointer;
      width: 129px;
      height: 32px;
      color: #7da453;
      font-size: 20px;
    }
  }
}
.inner_content {
  height: 100%;
}
.right_info_max {
  height: 100%;
  padding: 0 16px;
  box-shadow: -2px 0px 4px rgba(0, 0, 0, 0.05);
  .user_name {
    color: #7da453;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 8px;
  }
}
.item_select_discover {
  padding: 8px 0;
}
.start_drawing {
  width: 50%;
  padding: 12px;
  border-radius: 32px;
}
.cover_box {
  height: 270px;
  border-radius: 20px;
  overflow: hidden;
  .cover {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
