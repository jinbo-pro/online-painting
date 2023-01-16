<template>
  <div>
    <div>
      <div class="mb-24">
        <el-row>
          <el-col :span="12" class="ac">
            <span class="mr-24">{{ $t('drawingSearch.Search') }}</span>
            <el-input v-model="searchKeyWord" placeholder="prompt, theme, keywords..." style="width: 78%" clearable>
            </el-input>
          </el-col>
          <el-col :span="12" class="jend">
            <!-- <el-select v-model="searchType" clearable>
              <el-option
                v-for="(item, index) in searchTypeList"
                :key="index"
                :label="$t(`drawingSearch.searchSelect.${item.label}`)"
                :value="item.value"
              >
              </el-option>
            </el-select> -->
          </el-col>
        </el-row>
      </div>
      <div class="search_result_max">
        <DrawingGroup :list="serachList" @handle="linkInfo" />
      </div>
      <div class="line_se"></div>
    </div>
    <PreviewDialog :show.sync="showPreview" :item="selectDraw" />
  </div>
</template>

<script>
import PreviewDialog from './components/PreviewDialog.vue'
import DrawingGroup from '@/components/drawing/DrawingGroup.vue'
import { getGalleryList } from '@/apiList/api_work'
export default {
  components: {
    DrawingGroup,
    PreviewDialog
  },
  data() {
    return {
      searchType: '',
      searchTypeList: [
        { key: 'department', label: 'Department', value: 1 },
        { key: 'team', label: 'Team', value: 2 },
        { key: 'prompt', label: 'Prompt', value: 3 }
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
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getGalleryList({ keyword: this.searchKeyWord }).then((res) => {
        if (!Array.isArray(res)) return
        this.serachList = res.map((e) => {
          return {
            ...e,
            title: e.name,
            path: e.coverPath
          }
        })
      })
    },
    linkInfo(item) {
      Object.assign(this.selectDraw, item)
      this.showPreview = true
    }
  }
}
</script>

<style lang="scss" scoped></style>
