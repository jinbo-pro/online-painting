<template>
  <div>
    <div class="container">
      <div class="mb-24">
        <el-row>
          <el-col :span="12" class="ac">
            <span class="mr-24">{{ $t('drawingSearch.Search') }}</span>
            <el-input v-model="searchKeyWord" placeholder="prompt, theme, keywords..." style="width: 78%" clearable>
            </el-input>
          </el-col>
          <el-col :span="12" class="jend">
            <el-select v-model="searchType" clearable>
              <el-option
                v-for="(item, index) in searchTypeList"
                :key="index"
                :label="$t(`drawingSearch.searchSelect.${item.label}`)"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div class="search_result_max">
        <div v-for="(item, index) in showDataList" :key="index">
          <p>{{ item.title }}</p>
          <el-divider></el-divider>
          <DrawingGroup :list="item.data" @handle="linkInfo" />
        </div>
      </div>
    </div>
    <PreviewDialog :show.sync="showPreview" :item="selectDraw" />
  </div>
</template>

<script>
import PreviewDialog from './components/PreviewDialog.vue'
import DrawingGroup from '@/components/drawing/DrawingGroup.vue'
import { listData } from '@/utils/mock'
export default {
  components: {
    DrawingGroup,
    PreviewDialog
  },
  data() {
    return {
      searchType: '',
      searchTypeList: [
        { label: 'Department', value: 1 },
        { label: 'Team', value: 2 },
        { label: 'Prompt', value: 3 },
        { label: 'Time', value: 4 }
      ],
      serachList: [],
      showPreview: false,
      searchKeyWord: '',
      selectDraw: {
        cover: '',
        userName: '',
        userImg: '',
        content: '',
        createTime: ''
      }
    }
  },
  computed: {
    showDataList() {
      if (this.searchType) {
        return this.serachList.filter((e) => e.type == this.searchType)
      } else {
        return this.serachList
      }
    }
  },
  created() {
    this.serachList = this.searchTypeList.map((e) => {
      return {
        title: e.label,
        type: e.value,
        data: listData('3-10')
      }
    })
  },
  methods: {
    linkInfo(item) {
      Object.assign(this.selectDraw, item)
      this.showPreview = true
    }
  }
}
</script>

<style lang="scss" scoped></style>
