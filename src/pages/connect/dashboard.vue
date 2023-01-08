<template>
  <div class="container">
    <el-row>
      <el-col :span="14">
        <div class="title">Connect Analytics</div>
        <div class="count_max jsb ac">
          <div v-for="(item, index) in countList" :key="index" class="count_item_box fdc jac">
            <img class="icon mb-16" :src="item.icon" />
            <div>{{ item.count }} {{ item.title }}</div>
          </div>
        </div>
        <div class="title">Past Connect</div>
        <ScrollCoverList :list="coverList" :current.sync="activeIndex" valueKey="path" />
      </el-col>
      <el-col :span="8" :offset="2">
        <div class="title">Connect Setting</div>
        <el-form label-width="150px">
          <el-form-item label="Pause for this week:">
            <el-switch v-model="connectConfig.pause"></el-switch>
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
import ScrollCoverList from '@/components/ScrollCoverList.vue'
import { listData } from '@/utils/mock'
import { preferenceList } from '@/config/preference'
export default {
  components: {
    ScrollCoverList
  },
  data() {
    return {
      preferenceList,
      frequencyList: [{ label: 'Once a week', value: 7 }],
      activeIndex: 0,
      coverList: [],
      countList: [
        { title: 'connects', count: 33, icon: require('@/assets/connect/1.png') },
        { title: 'follow up coffee chats', count: 21, icon: require('@/assets/connect/2.png') },
        { title: 'departments', count: 5, icon: require('@/assets/connect/3.png') }
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
  methods: {}
}
</script>

<style lang="scss" scoped>
.count_max {
  .count_item_box {
    .icon {
      max-width: 100px;
    }
  }
}
</style>
