<template>
  <div>
    <NavBar />
    <div class="container">
      <Breadcrumb />
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
export default {
  components: {
    NavBar,
    Breadcrumb
  },
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped></style>
