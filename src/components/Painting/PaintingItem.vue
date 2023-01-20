<template>
  <div class="painting_item_box" @click="linkInfo">
    <div class="top_info_box jsb ac">
      <div class="ac">
        <el-avatar :size="30" :src="item.photo"></el-avatar>
        <div class="user_name ml-16">{{ item.officeName }}</div>
      </div>
      <div v-if="item.createDate" class="pain_time jac">{{ item.createDate | enDate }}</div>
    </div>
    <div class="paint_title">{{ item.title }}</div>
    <div class="cover_box jac">
      <el-image class="cover" :src="item.path"></el-image>
    </div>
    <div v-if="showLookRange" class="look_range_max mt-16">
      <div class="jsb ac">
        <div>Make this visible to the company</div>
        <el-switch v-model="item.lookRange" active-color="#13ce66"> </el-switch>
      </div>
      <div class="foot_msg">Your creation can be seen Alphabet-wide</div>
    </div>
  </div>
</template>

<script>
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
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    linkInfo() {
      this.$emit('handle', this.item)
    }
  }
}
</script>

<style lang="scss" scoped>
.painting_item_box {
  width: 350px;
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
  margin: 12px 0;
  font-size: 20px;
  font-weight: bold;
}
.cover_box {
  height: 130px;
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
