<template>
  <div class="error_page_max">
    <div class="error-404">
      <div class="error-in">
        <div class="errorin-top">
          <img src="./404-1.png" />
        </div>
        <div class="errorin-middle">
          <span>{{ $t('notFound.foundTitle') }}</span>
          <img src="./404-2.png" />
        </div>
        <div class="errorin-info">
          {{ $t('notFound.foundMsg') }}
          <div class="errorin-do">
            <a href="/" class="btn btn-info">{{ $t('notFound.foundBtn') }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404',
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.error_page_max {
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #f1f5f9;
}
.btn {
  min-width: 60px;
  margin-right: 20px;
  display: inline-block;
  border-radius: 50px;
  padding: 11px 16px;
  font-size: 13px;
  color: #609ee9;
  text-decoration: none;
  text-align: center;
  transition: all 200ms linear;
}
.btn.btn-info {
  border: 1px #609ee9 solid;
  background-color: #609ee9;
  color: #fff;
}
.btn.btn-info.outline {
  border: 1px #609ee9 solid;
  background-color: transparent;
  color: #609ee9;
}
.btn.btn-info:hover {
  border-color: #478be1;
  background-color: #478be1;
  color: #fff;
}

/*404*/
.error-404 {
  position: absolute;
  top: 50%;
  left: 80px;
  right: 0;
  margin-top: -260px;
}
.error-404 img {
  border: 0;
  vertical-align: middle;
}
.error-404 .error-in {
  text-align: center;
}
.error-404 .errorin-top {
  width: 500px;
  margin: 0 auto 30px auto;
  text-align: left;
}
.error-404 .errorin-top img {
  text-align: left;
}
.error-404 .errorin-middle {
  width: 500px;
  margin: 0 auto;
  text-align: left;
  font-size: 36px;
  color: #4a4a4a;
}
.error-404 .errorin-middle img {
  position: relative;
  margin-left: -20px;
  top: -75px;
  right: 0;
  animation: balloon 4s ease-in-out infinite;
}
.error-404 .errorin-info {
  width: 500px;
  font-size: 16px;
  margin: -60px auto 30px auto;
  color: #aaa;
  text-align: left;
}
.error-404 .errorin-do {
  text-align: left;
  padding-top: 18px;
}

/*移动端适配*/
@media screen and (max-width: 768px) {
  /*404*/
  .error-404 {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    margin-top: -200px;
  }
  .error-404 .error-in {
    text-align: center;
  }
  .error-404 .errorin-top {
    display: none;
  }
  .error-404 .errorin-middle {
    position: relative;
    width: 100%;
    margin: 0 auto;
    padding-top: 240px;
    text-align: center;
    font-size: 18px;
    color: #666;
  }
  .error-404 .errorin-middle img {
    position: absolute;
    left: 50%;
    margin-left: -60px;
    top: 30px;
    width: 120px;
    animation: balloon2 4s ease-in-out infinite;
  }
  .error-404 .errorin-info {
    width: 100%;
    font-size: 14px;
    margin: 12px auto;
    color: #aaa;
    text-align: center;
  }
  .error-404 .errorin-bottom {
    width: 100%;
    position: relative;
    top: -190px;
    text-align: center;
  }
  .error-404 .errorin-bottom img {
    width: 100px;
    height: auto;
    text-align: center;
  }
  .error-404 .errorin-do {
    text-align: center;
    padding-top: 18px;
  }
  .error-404 .errorin-do .btn {
    display: block;
    width: 250px;
    padding: 14px 0;
    font-size: 16px;
    margin: 0 auto;
    margin-bottom: 12px;
  }
}

@keyframes balloon {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}
</style>
