<template>
  <div class="login">
    <div class="login-weaper">
      <div class="login-right">
        <div class="login-main">
          <h4 class="login-title">VIVA B2B</h4>
          <el-form class="el-form login-form" ref="loginForm" :model="loginForm" :rules="loginRules">
            <el-form-item style="margin-left: 0px" prop="username">
              <el-input
                type="text"
                placeholder="username"
                prefix-icon="el-icon-user"
                v-model="loginForm.username"
                clearable
                autocomplete="off"
              >
              </el-input>
            </el-form-item>
            <el-form-item style="margin-left: 0px" prop="password">
              <el-input
                type="password"
                placeholder="password"
                prefix-icon="el-icon-lock"
                v-model="loginForm.password"
                autocomplete="off"
                :show-password="true"
                @keyup.enter.native="handleLogin"
              >
              </el-input>
            </el-form-item>
            <el-form-item style="margin: 40px 0px 0">
              <el-button type="primary" class="login-submit" @click="handleLogin" :loading="isSubmit">
                <span>Login</span>
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="vue-particles"></div>
  </div>
</template>
<script>
import { userLogin } from '@/apiList/api_work'
import { local } from '@/utils/storage'
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter user'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('Please input a password'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      isSubmit: false
    }
  },
  methods: {
    // 登录提交
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (!valid) return
        this.isSubmit = true
        userLogin({
          user: this.loginForm.username,
          password: this.loginForm.password
        })
          .then((res) => {
            this.isSubmit = false
            local.get('userName', this.loginForm.username)
            local.set('token', res.auth)
            local.set('userInfo', res.user)
            this.$router.push({ path: '/' })
          })
          .catch(() => {
            this.isSubmit = false
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  position: relative;
  box-sizing: border-box;
  .vue-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at top left, rgba(105, 155, 200, 1) 0%, rgba(181, 197, 216, 1) 57%);
  }
  .login-weaper {
    margin: auto;
    height: 450px;
    display: flex;
    box-sizing: border-box;
    position: relative;
    z-index: 1;
    border: none;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    .login-right {
      width: 480px;
      padding: 20px;
      position: relative;
      align-items: center;
      display: flex;
      background-color: #ffffff;
      border-radius: 8px;
      .login-main {
        margin: 0 auto;
        width: 70%;
        .login-title {
          color: #303133;
          margin-bottom: 40px;
          font-weight: 500;
          font-size: 22px;
          text-align: center;
          letter-spacing: 4px;
        }
        .login-form {
          margin: 10px 0;
          i {
            color: #303133;
          }
          .el-form-item {
            margin-bottom: 20px !important;
            .login-submit {
              width: 100%;
              letter-spacing: 2px;
            }
          }
        }
        .login-menu {
          margin-top: 30px;
          width: 100%;
          text-align: left;
          a {
            color: #909399;
            font-size: 12px;
            margin: 0 8px;
            text-decoration: none;
            &:hover {
              color: #409eff;
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
}
</style>
