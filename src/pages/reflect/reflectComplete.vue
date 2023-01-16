<template>
  <div>
    <el-row class="inner_content">
      <el-col :span="14">
        <div class="md_title">Daily Mood</div>
        <div class="top_message ac">l2 What’s your mood today? Why do you feel it?</div>
        <div class="user_list_max mt-32">
          <PaintingItem :item="userList[0]" :showLookRange="true" @handle="$router.push('/detailDrawingPage')" />
        </div>
      </el-col>
      <el-col :span="10" class="right_info_max">
        <div class="md_title">Before you finish</div>

        <p class="item_label">How you feel</p>
        <el-input v-model="formData.emoji" placeholder="Search for emoji"></el-input>

        <p class="item_label">Leave some notes for yourself</p>
        <el-input v-model="formData.notes" type="textarea" :rows="3" placeholder="Write notes"></el-input>

        <div class="jac mt-32">
          <el-button class="start_drawing" type="success">
            Save to My Reflections
          </el-button>
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
