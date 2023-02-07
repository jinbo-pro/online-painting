<template>
  <div class="painting_item_box">
    <div class="top_info_box jsb ac">
      <div class="ac">
        <el-avatar style="width: 2.19vw; height: 2.19vw" :src="item.photo"></el-avatar>
        <div class="user_name ml-16">{{ item.officeName }}</div>
      </div>
      <div v-if="item.createDate" class="pain_time jac">{{ item.createDate | enDate }}</div>
    </div>
    <div class="paint_title jsb ac">
      <span>{{ item.title }}</span>
      <svg-icon
        v-if="isEdit"
        width="2.19vw"
        height="2.19vw"
        class="point ml-16"
        @click="editTitle(item.title)"
        icon-class="PaintingItemEditTitle"
      ></svg-icon>
    </div>
    <div class="cover_box jac" @click="linkInfo">
      <el-image fit="cover" class="cover" :src="item.path"></el-image>
    </div>
    <div v-if="showLookRange" class="look_range_max mt-16">
      <div class="jsb ac">
        <div>Make this visible to the company</div>
        <el-switch v-model="item.lookRange" active-color="#13ce66" @change="updateLookSate"> </el-switch>
      </div>
      <div class="foot_msg">Your creation can be seen Alphabet-wide</div>
    </div>
  </div>
</template>

<script>
import { updateIsView } from '@/apiList/api_v1'
export default {
  name: 'PaintingItem',
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    showLookRange: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    linkInfo() {
      this.$emit('handle', this.item)
    },
    editTitle(title) {
      this.$emit('editTitle', title)
    },
    updateLookSate(e) {
      updateIsView({ id: this.item.greetId, companyIsView: e ? '1' : '0' })
    }
  }
}
</script>

<style lang="scss" scoped>
.painting_item_box {
  width: 360px;
  background-color: #f7f9fb;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 12px;
  box-sizing: border-box;
}
.top_info_box {
  .user_name {
    font-size: 12px;
  }
  .pain_time {
    font-size: 12px;
    color: #313131;
    padding: 6px 12px;
    font-weight: bold;
    border-radius: 16px;
    box-sizing: border-box;
    border: 1px solid #d1d6a2;
  }
}
.paint_title {
  margin: 8px 0;
  font-size: 20px;
  font-weight: bold;
}
.cover_box {
  width: 320px;
  height: 180px;
  border-radius: 10px;
  overflow: hidden;
  .cover {
    max-width: 100%;
    max-height: 100%;
    transition: 0.3s;
    &:hover {
      transition: 0.3s;
      transform: scale(1.1);
    }
  }
}
.look_range_max {
  .foot_msg {
    font-size: 12px;
    color: #8d8d8d;
  }
}
</style>
