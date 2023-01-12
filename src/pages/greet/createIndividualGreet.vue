<template>
  <div class="container">
    <el-row class="inner_content">
      <el-col :span="14">
        <div class="md_title">Daily Mood</div>
        <div class="top_message ac">
          <div>Wish a colleage to recover soon created on</div>
          <div class="time_box">jan 2 - 9, 2023</div>
        </div>
        <div class="user_list_max mt-32">
          <PaintingItem :item="userList[0]" :showLookRange="true" />
        </div>
      </el-col>
      <el-col :span="10" class="right_info_max">
        <div class="md_title">Before you finish</div>

        <p>Add a personal note to your colleage!</p>
        <p class="item_label">Send to</p>
        <el-input v-model="formData.emoji" placeholder="Search for colleage"></el-input>

        <p class="item_label">Add a personal notes</p>
        <el-input v-model="formData.notes" type="textarea" :rows="3" placeholder="Search for colleage"></el-input>
        <div class="ac mt-24 mb-24">
          <svg-icon width="14px" height="14px" icon-class="greetSwag"></svg-icon>
          <div class="ml-12 item_label">Add a swag for free!</div>
        </div>
        <div class="jac mt-32">
          <el-button class="start_drawing" type="success">Complete Task</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PaintingItem from '@/components/Painting/PaintingItem.vue'
import { listData } from '@/utils/mock'
export default {
  components: {
    PaintingItem
  },
  data() {
    return {
      isDone: 1,
      radio: 2,
      userList: [],
      formData: {
        emoji: '',
        notes: ''
      }
    }
  },
  created() {
    this.userList = listData(2)
  },
  methods: {}
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
}
.item_label {
  font-size: 16px;
  font-weight: bold;
}
</style>
