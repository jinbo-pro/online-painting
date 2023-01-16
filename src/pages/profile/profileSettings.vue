<template>
  <div>
    <div class="md_title">PROFILE SETTINGS</div>
    <div class="xs_title">
      <span class="mr-24">My complated drawings are visible to the company</span>
      <el-switch v-model="isPublic" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
    </div>
    <div class="xs_title">Language Preference (V2)</div>
    <SelectLang />
    <div class="xs_title">Update Passwords</div>
    <div>
      <div class="item_input">
        <el-input v-model="formData.currentPassword" placeholder="Current passwords"></el-input>
      </div>
      <div class="item_input">
        <el-input v-model="formData.newPasswords" placeholder="New passwords"></el-input>
      </div>
      <div class="item_input">
        <el-input v-model="formData.confirmNewPasswords" placeholder="Confirm new passwords"></el-input>
      </div>
    </div>
    <div class="mt-32">
      <el-button class="save" @click="saveChange" type="success">Save changes</el-button>
    </div>
  </div>
</template>

<script>
import SelectLang from '@/components/SelectLang.vue'
export default {
  components: {
    SelectLang
  },
  data() {
    return {
      isPublic: false,
      formData: {
        currentPassword: '',
        newPasswords: '',
        confirmNewPasswords: ''
      }
    }
  },
  created() {},
  methods: {
    saveChange() {
      console.log(this.formData, this.isPublic, '-->>> 678')
    }
  }
}
</script>

<style lang="scss" scoped>
.item_input {
  width: 30%;
  margin-bottom: 16px;
}
.save {
  padding: 12px 36px;
  border-radius: 32px;
}
</style>
