<template>
  <div>
    <div class="md_title">PROFILE SETTINGS</div>
    <div class="xs_title">
      <span class="mr-24">My complated drawings are visible to the company</span>
      <el-switch v-model="isPublic" active-color="#13ce66"></el-switch>
    </div>
    <div class="xs_title">Language Preference (V2)</div>
    <SelectLang />
    <div class="xs_title">Update Passwords</div>
    <div>
      <div class="item_input">
        <el-input type="password" v-model="currentPassword" placeholder="Current passwords"></el-input>
      </div>
      <div class="item_input">
        <el-input type="password" v-model="newPasswords" placeholder="New passwords"></el-input>
      </div>
      <div class="item_input">
        <el-input type="password" v-model="confirmNewPasswords" placeholder="Confirm new passwords"></el-input>
      </div>
    </div>
    <div class="mt-32">
      <el-button class="save" @click="saveSettings" type="success">Save Settings</el-button>
    </div>
  </div>
</template>

<script>
import SelectLang from '@/components/SelectLang.vue'
import { local } from '@/utils/storage'
import { updatePSW } from '@/apiList/api_v1'
import { userLogout } from '@/apiList/api_work'
export default {
  components: {
    SelectLang
  },
  data() {
    return {
      isPublic: false,

      currentPassword: '',
      newPasswords: '',
      confirmNewPasswords: ''
    }
  },
  created() {},
  methods: {
    async saveSettings() {
      const u = local.get('userInfo')
      if (!this.currentPassword) return this.$message.error('Please enter the original password')
      if (!this.newPasswords) return this.$message.error('Please enter a new password')
      if (this.newPasswords != this.confirmNewPasswords) return this.$message.error('The two inputs are inconsistent')

      await updatePSW({
        userId: u.id,
        oldPassword: this.currentPassword,
        newPassword: this.newPasswords
      })
      await this.$confirm('Password successfully modified, please log in again', 'Tips', {
        type: 'warning',
        showCancelButton: false
      })
      await userLogout({})
      local.clear()
      location.reload()
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
