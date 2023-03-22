<template>
  <div class="container jac">
    <div class="fdc jac">
      <div v-if="active == 1" class="content fdc jac">
        <svg-icon width="100px" height="100px" icon-class="firstLoginTopHead"></svg-icon>
        <div class="title mb-30">You've received an invitation to join VIVA AT WORK.</div>
        <p class="mb-30">lnvitation code:</p>
        <div class="pd-16">
          <el-input style="width: 300px" v-model="inviteCode" type="text" placeholder="请输入邀请码"></el-input>
        </div>
        <div class="pd-30">
          <el-button type="success" class="next_btn" @click="nextHandle">Next</el-button>
        </div>
      </div>

      <div v-if="active == 2" class="content fdc">
        <div class="jac">
          <svg-icon width="100px" height="100px" icon-class="firstLoginTopHead"></svg-icon>
        </div>
        <div class="md_title">Set a new password</div>
        <PasswordInput :text.sync="password" />
        <div class="md_title">confirm the password</div>
        <PasswordInput :text.sync="confirmPassword" />
        <div class="jac pd-30">
          <el-button type="success" class="next_btn" @click="nextHandle">Next</el-button>
        </div>
      </div>

      <div v-if="active == 3" class="content user_info_max">
        <div class="jac">
          <el-upload action="*" :show-file-list="false" :on-success="handleAvatarSuccess">
            <el-avatar v-if="imageUrl" :size="100" :src="imageUrl"></el-avatar>
            <svg-icon v-else width="100px" height="100px" icon-class="firstLoginUploadHead"></svg-icon>
          </el-upload>
        </div>
        <div class="fw jsb">
          <div v-for="(item, index) in userInfo" :key="index" class="fdc jac">
            <div class="md_title">{{ item.label }}</div>
            <el-input v-model="item.value" type="text"></el-input>
          </div>
        </div>
        <div class="pd-30 jac">
          <el-button type="success" class="next_btn" @click="nextHandle">Complete</el-button>
        </div>
      </div>

      <div v-if="active == 4" class="content">
        <div class="jac mb-24">
          <el-avatar :size="100" :src="imageUrl"></el-avatar>
          <div class="md_title ml-24">Welcome Chelsea!</div>
        </div>
        <div class="xs_title jac mb-30">Please check your inbox and confirm the verification email.</div>
        <div class="pd-30 jac mt-30">
          <el-button type="success" class="next_btn" @click="signIn">Sign in</el-button>
        </div>
      </div>

      <template v-if="active < 4">
        <div class="step_tips f12">Step {{ active }} / 3</div>
        <div class="step_max box_bod">
          <div class="step_inner" :style="{ width: stepWidth }"></div>
        </div>
      </template>
      <template v-else>
        <div class="step_tips f12">Complete</div>
        <div class="ac">
          <div class="step_max box_bod">
            <div class="step_inner" :style="{ width: stepWidth }"></div>
          </div>
          <svg-icon width="20px" height="20px" icon-class="CompleteIcon"></svg-icon>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { fileParseToReader, guid } from '@/utils/jcore'
import PasswordInput from '@/components/PasswordInput.vue'
import { initUser, initUserAndGroup } from '@/apiList/api_v1'
export default {
  components: {
    PasswordInput
  },
  data() {
    return {
      active: 1,
      imageUrl: '',
      invitationCode: guid(),

      inviteCode: '',
      password: '',
      confirmPassword: '',

      userInfo: [
        { label: 'First Name', key: 'firstName', value: '' },
        { label: 'Last Name', key: 'lastName', value: '' },
        { label: 'Department', key: 'department', value: '' },
        { label: 'Team', key: 'Team', value: '' }
      ]
    }
  },
  computed: {
    stepWidth() {
      return 200 * this.active + 'px'
    }
  },
  created() {},
  methods: {
    async nextHandle() {
      if (this.active == 4) return
      // 输入邀请码
      if (this.active == 1) {
        if (!this.inviteCode) return this.$message.error('Please input a invite code')
        console.log(this.inviteCode)
      } else if (this.active == 2) {
        // 修改密码
        if (!this.password) return this.$message.error('Please input a password')
        if (!this.confirmPassword) return this.$message.error('Please confirm the password')
        await initUser({ inviteCode: this.inviteCode, password: this.password })
      } else if (this.active == 3) {
        const userInfo = this.userInfo.reduce((p, c) => {
          p[c.key] = c.value
          return p
        }, {})
        // 修改用户信息
        if (!userInfo.lastName) return this.$message.error('Please input a lastName')
        if (!this.imageUrl) return this.$message.error('Please upload your avatar')
        await initUserAndGroup({
          inviteCode: this.inviteCode,
          password: this.password,
          firstName: userInfo.firstName,
          lastName: userInfo.firstName,
          photo: this.imageUrl
        })
      }
      this.active++
    },
    handleAvatarSuccess(file) {
      fileParseToReader(file.raw).then((res) => {
        this.imageUrl = res
      })
    },
    signIn() {
      this.$router.replace('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: 430px;
}
.step_tips {
  width: 600px;
  text-align: left;
  margin-bottom: 4px;
}
.step_max {
  width: 600px;
  height: 20px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  .step_inner {
    height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    transition: 0.3s;
    background-color: #7da453;
  }
}
.head_img_box {
  .el-icon-user-solid {
    font-size: 36px;
    color: #999;
  }
}
.user_info_max {
  width: 430px;
}
.next_btn {
  border-radius: 30px;
  padding: 12px 36px;
}
</style>
