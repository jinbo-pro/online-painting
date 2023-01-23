<template>
  <div class="container dashboard_container">
    <el-row>
      <el-col :span="14">
        <div class="md_title">Connect Analytics</div>
        <div class="count_max jsb ac">
          <div v-for="(item, index) in countList" :key="index" @click="linkCountInfo" class="count_item_box">
            <div class="jsb ac">
              <div class="count_title">{{ item.title }}</div>
              <svg-icon width="30px" height="30px" :icon-class="item.icon"></svg-icon>
            </div>
            <div class="count_num f24">{{ item.count }}</div>
          </div>
        </div>
        <div class="md_title ac">
          <span>Past Connect</span>
          <span class="f16 ml-18 see_more" @click="$router.push('/moreConnect')">See more</span>
        </div>
        <PaintingGroup :list="coverList" :columns="2" @handle="paintHandle" />
      </el-col>
      <el-col :span="8" :offset="2">
        <div class="md_title">Connect Setting</div>
        <div class="jsb ac">
          <div class="xs_title">Pause for next connect</div>
          <el-switch v-model="connectConfig.isWeek" active-color="#13ce66"></el-switch>
        </div>
        <div class="pause_tips mb-24">You will not be matched with connects</div>

        <div class="xs_title">Connect preference:</div>
        <div>
          <p>Departments:</p>
          <el-cascader-multi
            clearable
            v-model="connectConfig.differentOffice"
            :data="differentOfficeList"
            label-key="name"
            value-key="id"
          ></el-cascader-multi>
          <p>language preference:</p>
          <el-select style="width: 100%" v-model="connectConfig.language" multiple placeholder="请选择">
            <el-option v-for="item in languageList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <p>Topic preference:</p>
          <el-select style="width: 100%" v-model="connectConfig.topicPreference" multiple placeholder="请选择">
            <el-option v-for="item in topicList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </div>
        <div class="jac mt-32">
          <el-button class="save" @click="saveSettings" type="success">Save Settings</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PaintingGroup from '@/components/Painting/PaintingGroup.vue'
import {
  getConnectSetting,
  getIndexData,
  getLanguageList,
  getOfficeList,
  getPromptL1,
  getTotail,
  saveConnectSetting
} from '@/apiList/api_v1'
import { findNodeAll, treeFindPath } from '@/utils/tree'
export default {
  components: {
    PaintingGroup
  },
  data() {
    return {
      differentOfficeList: [],
      languageList: [],
      topicList: [],
      activeIndex: 0,
      coverList: [],
      countList: [
        { title: 'Connects', count: '', icon: 'Connection', key: 'connectsCount' },
        { title: 'Department', count: '', icon: 'Department', key: 'deparmentsCount' },
        { title: 'Follow-up chat', count: '', icon: 'Follow-up-chat', key: 'coffeeChatsCount' }
      ],
      connectConfig: {
        isWeek: true, // 是否参与匹配
        differentOffice: [], // 部门
        language: [], // 语言偏好
        topicPreference: [] // 分类
      }
    }
  },
  created() {
    this.getInitData()
  },
  methods: {
    paintHandle(e) {
      this.$router.push({
        path: '/drawDoneDiscuss',
        query: { connectId: e.connectId, connectState: e.state }
      })
    },
    async getInitData() {
      getTotail({}).then((res) => {
        this.countList.forEach((item) => {
          item.count = res[item.key]
        })
      })
      getLanguageList({}).then((res) => {
        this.languageList = res
      })
      getIndexData({}).then((res) => {
        this.coverList = res ? res.list.slice(0, 2) : []
      })
      getPromptL1({ code: 'connect' }).then((res) => {
        if (!res) return
        this.topicList = res.map((e) => {
          return {
            label: e.topic,
            value: e.topic
          }
        })
      })
      await getOfficeList({}).then((res) => {
        this.differentOfficeList = res
      })
      getConnectSetting({}).then((res) => {
        if (!res) return
        const language = res.language.split(',').map((e) => e.split('-')[1])
        this.connectConfig = {
          language,
          isWeek: res.isWeek == 1,
          differentOffice: res.differentOfficeId
            ? res.differentOfficeId
                .split(',')
                .map((id) => treeFindPath(this.differentOfficeList, (node) => node.id == id))
            : [],
          topicPreference: res.topicPreferenceCode ? res.topicPreferenceCode.split(',') : []
        }
      })
    },
    linkCountInfo() {},
    saveSettings() {
      const { isWeek, differentOffice, language, topicPreference } = this.connectConfig

      const officeIds = differentOffice.map((e) => e.slice(-1)[0])
      const selectDifferentOffice = findNodeAll(this.differentOfficeList, (node) => officeIds.includes(node.id))
      console.log(selectDifferentOffice, differentOffice, '-->>> 678')
      const selectLanguage = this.languageList.filter((e) => language.includes(e.value))
      const selectTopic = this.topicList.filter((e) => topicPreference.includes(e.value))
      saveConnectSetting({
        isWeek: isWeek ? '1' : '0',
        differentOfficeName: selectDifferentOffice.map((e) => e.name).toString(),
        differentOfficeId: officeIds.toString(),
        language: selectLanguage.map((e) => `${e.label}-${e.value}`).toString(),
        topicPreferenceCode: selectTopic.map((e) => e.value).toString(),
        topicPreferenceName: selectTopic.map((e) => e.label).toString()
      }).then((res) => {
        this.$message.success('设置成功')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.count_max {
  .count_item_box {
    min-width: 200px;
    height: 112px;
    padding: 16px;
    border-radius: 16px;
    box-sizing: border-box;
    background-color: #f7f9fb;
    .count_title {
      margin-right: 50px;
    }
    .count_num {
      font-weight: bold;
    }
  }
}
.see_more {
  cursor: pointer;
}

.pause_tips {
  font-size: 12px;
  color: #999;
}
.save {
  padding: 12px 36px;
  border-radius: 32px;
}
</style>
