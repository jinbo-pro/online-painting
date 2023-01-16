<template>
  <div>
    <el-row class="inner_content">
      <el-col :span="14">
        <div class="pd-16">
          <Draw />
        </div>
      </el-col>
      <el-col :span="10" class="right_info_max">
        <div class="mt-24">Your Mission:</div>
        <div class="md_title">Speedy Recovery</div>
        <div class="xs_title">Thinking Guide(L4)</div>
        <p>
          Is there a memorable moment during travel? Or any eventful story with ups and downs? Did you meet someone
          special in the trip?
        </p>
        <div class="fdc jac mt-32">
          <el-button class="start_drawing" @click="submitHandle(1)"> Save </el-button>
          <el-button class="start_drawing" type="success" style="margin-left: 0" @click="submitHandle(2)">
            Submit
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Draw from '@/components/Draw.vue'
export default {
  components: {
    Draw
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    submitHandle(type) {
      console.log(type, '-->>> type')
      this.$router.push({
        path: '/drawDoneDiscuss',
        query: { id: 1 }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.inner_content {
  height: 100%;
}
.right_info_max {
  height: 100%;
  padding: 0 16px;
  box-shadow: -2px 0px 4px rgba(0, 0, 0, 0.05);
}
.start_drawing {
  width: 50%;
  padding: 12px;
  border-radius: 32px;
  margin-bottom: 16px;
}
</style>
