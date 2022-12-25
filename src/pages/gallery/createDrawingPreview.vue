<template>
  <div class="container">
    <div class="title">{{ $t(`createDrawingPreview['Create a company gallery']`) }}</div>
    <div class="jsb ac">
      <el-tabs :value="activeName + ''" :before-leave="() => navCheck" @tab-click="navCheck = false">
        <el-tab-pane :label="'1.' + $t(`createDrawingPreview['Select drawings']`)" name="1"></el-tab-pane>
        <el-tab-pane :label="'2.' + $t(`createDrawingPreview['Set up the gallery']`)" name="2"></el-tab-pane>
        <el-tab-pane :label="'3.' + $t(`createDrawingPreview['complete']`)" name="3"></el-tab-pane>
      </el-tabs>
      <el-button type="primary" @click="nextHandle" :disabled="nextIsDisabled">
        {{ activeName == 3 ? 'Finish' : $t('app.Next') }}
      </el-button>
    </div>
    <div v-if="activeName == 1">
      <div class="ac mb-24">
        <span class="mr-24">{{ $t('app.Search') }}</span>
        <el-input v-model="keyword" clearable placeholder="prompt, theme, keywords..." style="width: 40%"> </el-input>
        <div class="ml-24">10 {{ $t(`createDrawingPreview['results']`) }}</div>
      </div>
      <div class="jsb ac mt-16 mb-16">
        <div>{{ checkList.length }} {{ $t(`createDrawingPreview['selected']`) }}</div>
        <el-checkbox v-model="isCheckedAll" @change="searchSelectAll">
          {{ $t(`createDrawingPreview['select all']`) }}
        </el-checkbox>
      </div>
      <DrawingGroup :list="galleryList" select :checkList.sync="checkList" />
    </div>
    <div v-else-if="activeName == 2">
      <el-row>
        <el-col :span="13">
          <div class="md_title">{{ $t(`createDrawingPreview['Gallery Name']`) }}</div>
          <el-input v-model="galleryName" clearable style="width: 50%"> </el-input>
          <div class="md_title">{{ $t('app.Description') }}</div>
          <el-input v-model="description" type="textarea"> </el-input>
        </el-col>
        <el-col :span="10" :offset="1">
          <div class="md_title">{{ $t(`createDrawingPreview['Who can view?']`) }}</div>
          <div v-for="(item, index) in galleryConfig" :key="index" class="jsb ac mb-24">
            <div>{{ $t(`createDrawingPreview['${item.label}']`) }}</div>
            <el-switch v-model="item.open"></el-switch>
          </div>
        </el-col>
      </el-row>
      <div class="md_title">{{ selectList.length }} {{ $t(`createDrawingPreview['Drawings selected']`) }}</div>
    </div>
    <div v-else>
      <el-row>
        <el-col :span="13">
          <div class="md_title">{{ $t(`createDrawingPreview['Gallery Name']`) }}</div>
          <p>{{ galleryName }}</p>
          <div class="md_title">{{ $t('app.Description') }}</div>
          <p>{{ description }}</p>
        </el-col>
        <el-col :span="10" :offset="1">
          <div class="md_title">Drawings</div>
          <div class="drawing_list_max">
            <div v-for="(item, index) in selectList.slice(0, 3)" :key="index" class="draw_item_box">
              <img :src="item.cover" />
            </div>
            <div>...</div>
          </div>
        </el-col>
      </el-row>
      <div class="preview_message_max jac pb-24">
        <div class="inner_content">
          <div class="md_title">{{ $t(`createDrawingPreview['Who can view?']`) }}</div>
          <div v-for="(item, index) in galleryConfig" :key="index" class="jsb ac mb-24">
            <div>{{ $t(`createDrawingPreview['${item.label}']`) }}</div>
            <el-switch v-model="item.open"></el-switch>
          </div>
          <div class="link pd-24 mb-24">{{ shareLink }}</div>
          <div class="foot_icon jsb ac">
            <i class="iconfont icon-fuzhi" @click="copyLink"></i>
            <i class="iconfont icon-fenxiangfangshi" @click="share"></i>
            <i class="iconfont icon-gonggao" @click="showNotice = true"></i>
          </div>
        </div>
      </div>
      <div class="pd-30"></div>
      <SendNotice :show.sync="showNotice" @send="sendNoticeConfirm" />
    </div>
  </div>
</template>

<script>
import { copyText } from '@/utils/jcore'
import SendNotice from './components/SendNotice.vue'
import DrawingGroup from '@/components/drawing/DrawingGroup.vue'
import { addGallery, getMyDrawList, sendMessage } from '@/apiList/api_work'
export default {
  components: {
    SendNotice,
    DrawingGroup
  },
  data() {
    return {
      navCheck: false,
      isCheckedAll: false,
      keyword: '',
      activeName: 1,
      checkList: [],
      galleryList: [],

      galleryName: '',
      description: '',
      galleryConfig: [
        { key: 'team', label: 'Team', open: true },
        { key: 'allCommpany', label: 'All Company', open: true },
        { key: 'pub', label: 'Public', open: true }
      ],

      showNotice: false,
      shareLink: 'https://whimsical.com/b2b-X8PjEo6EcWSDBEEv4A9oyd'
    }
  },
  computed: {
    nextIsDisabled() {
      if (this.activeName == 1) return !this.checkList.length
      if (this.activeName == 2) return !this.galleryName
      return true
    },
    selectList() {
      return this.galleryList.filter((e) => this.checkList.includes(e.id))
    }
  },
  created() {
    this.getDrawList()
  },
  methods: {
    getDrawList() {
      getMyDrawList({ keyword: this.keyword }).then((res) => {
        if (!Array.isArray(res)) return
        this.galleryList = res.map((e) => {
          return {
            ...e,
            checked: false
          }
        })
      })
    },

    searchSelectAll() {
      this.checkList = this.isCheckedAll ? this.galleryList.map((e) => e.id) : []
    },
    nextHandle() {
      this.navCheck = true
      this.activeName++
      if (this.activeName == 3) {
        const lookObj = this.galleryConfig.reduce((p, c) => {
          p[c.key] = c.open ? '1' : ''
          return p
        }, {})
        addGallery({
          ...lookObj,
          galleryName: this.galleryName,
          description: this.description,
          drawIds: this.checkList.toString()
        }).then((res) => {
          this.$message.success('画廊新建成功')
        })
      }
      this.$nextTick(() => {
        this.navCheck = false
      })
    },
    copyLink() {
      copyText(this.shareLink)
      this.$message.success('复制成功')
    },
    share() {
      console.log('[x] 待开发')
    },
    sendNoticeConfirm(data) {
      sendMessage({ content: data.message, userIds: data.recipient }).then((res) => {
        this.showNotice = false
        this.$message.success('发送成功')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.select_all {
  cursor: pointer;
}
.drawing_list_max {
  display: grid;
  grid-row-gap: 8px;
  grid-column-gap: 8px;
  grid-template-columns: auto auto;
  .draw_item_box {
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
.preview_message_max {
  border: 1px solid #e1e1e1;
  .inner_content {
    width: 50%;
  }
  .link {
    word-break: break-all;
    color: #65b1ff;
    padding: 6px 10px;
    border: 1px solid #e1e1e1;
  }
  .foot_icon {
    .iconfont {
      font-size: 36px;
    }
  }
}
</style>
