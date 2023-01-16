<template>
  <div class="container dashboard_container">
    <el-row>
      <el-col :span="14">
        <div class="md_title">Connect Analytics</div>
        <div class="count_max jsb ac">
          <div
            v-for="(item, index) in countList"
            :key="index"
            class="count_item_box"
            @click="linkCountInfo"
            :style="`background-color: ${item.bgc};`"
          >
            <div class="jsb ac">
              <div>{{ item.title }}</div>
              <svg-icon width="30px" height="30px" :icon-class="item.icon"></svg-icon>
            </div>
            <div class="count_num f24">{{ item.count }}</div>
          </div>
        </div>
        <div class="md_title ac">
          <span>Past Connect</span>
          <span class="f16 ml-18 see_more" @click="$router.push('/moreConnect')">See more</span>
        </div>
        <PaintingGroup :list="coverList" />
      </el-col>
      <el-col :span="8" :offset="2">
        <div class="md_title">Connect Setting</div>
        <el-form label-width="150px">
          <el-form-item label="Pause for this week:">
            <el-switch v-model="connectConfig.pause" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
          <el-form-item label="Frequency:">
            <el-select v-model="connectConfig.frequency" placeholder="请选择">
              <el-option v-for="item in frequencyList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Connect preference:">
            <el-select v-model="connectConfig.connectPreference" multiple placeholder="请选择">
              <el-option v-for="item in preferenceList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Topic preference:">
            <el-select v-model="connectConfig.topicPreference" multiple placeholder="请选择">
              <el-option v-for="item in preferenceList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { listData } from '@/utils/mock'
import { preferenceList } from '@/config/preference'
import PaintingGroup from '@/components/Painting/PaintingGroup.vue'
export default {
  components: {
    PaintingGroup
  },
  data() {
    return {
      preferenceList,
      frequencyList: [{ label: 'Once a week', value: 7 }],
      activeIndex: 0,
      coverList: [],
      countList: [
        { title: 'Connects', count: 33, icon: 'Connection', bgc: '#F7F9FB' },
        { title: 'Department', count: 21, icon: 'Department', bgc: '#FAFBEE' },
        { title: 'Follow-up chat', count: 5, icon: 'Follow-up-chat', bgc: '#F7F9FB' }
      ],
      connectConfig: {
        pause: '',
        frequency: '', // 周期
        connectPreference: '', // 语言偏好
        topicPreference: '' // 语言偏好
      }
    }
  },
  created() {
    this.coverList = listData(10)
  },
  methods: {
    linkCountInfo() {
      this.$router.push({
        path: '/newConnect',
        query: { id: 1 }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard_container {
  overflow: hidden;
}
.count_max {
  .count_item_box {
    width: 202px;
    height: 112px;
    padding: 16px;
    border-radius: 16px;
    box-sizing: border-box;
    .count_num {
      font-weight: bold;
    }
  }
}
.see_more {
  cursor: pointer;
}
</style>
