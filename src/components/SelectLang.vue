<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <span class="el-dropdown-link">
      {{ langTitle }}
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="(item, index) in localeList" :key="index" :command="item.locale">
        {{ item.title }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { local } from '@/utils/storage'
import { localeList } from '@/i18n'
export default {
  name: 'SelectLang',
  data() {
    return {
      localeList
    }
  },
  computed: {
    langTitle() {
      const cur = localeList.find((e) => e.locale === this.$i18n.locale)
      return cur ? cur.title : ''
    }
  },
  created() {},
  methods: {
    handleCommand(e) {
      this.$i18n.locale = e
      local.set('i18n-locale', e)
      this.$emit('change', e)
    }
  }
}
</script>
