<template>
  <div>
    <el-row class="inner_content">
      <el-col :span="16">
        <div class="md_title">Daily Mood</div>
        <div class="top_message ac">l2 What’s your mood today? Why do you feel it?</div>
        <div class="user_list_max mt-32">
          <PaintingItem
            style="width: 350px"
            :isEdit="true"
            :item="userList[0]"
            :showLookRange="true"
            @editTitle="editTitle"
          />
        </div>
      </el-col>
      <el-col :span="8" class="right_info_max">
        <div class="md_title">Before you finish</div>

        <p class="item_label">How you feel</p>
        <el-input v-model="formData.emoji" placeholder="Search for emoji"></el-input>

        <p class="item_label">Leave some notes for yourself</p>
        <el-input v-model="formData.notes" type="textarea" :rows="3" placeholder="Write notes"></el-input>

        <div class="jac mt-32">
          <el-button class="start_drawing" type="success" @click="$router.push('/myReflections')">
            Save to My Reflections
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PaintingItem from '@/components/Painting/PaintingItem.vue'
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
    this.userList = [
      {
        title: 'calm and relax',
        path: 'http://114.115.209.57:8090/drawClient/download/fa0d701083794b6780fc9875b5b49417/Thanks for your contribution in the past.png'
      }
    ]
  },
  methods: {
    async editTitle(title) {
      const res = await this.$prompt('Please enter a title!', 'Tips', {
        closeOnClickModal: false,
        inputValidator: (v) => !!v,
        inputErrorMessage: 'Please enter a title!'
      })
      const row = this.userList[0]
      row.title = res.value
      this.userList.splice(0, 1, row)
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
