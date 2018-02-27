<template>
  <div id="app">
    <a href="#content" id="accessibility-skip-content"><span class="access">Go to main content</span></a>
    <header>
      <p class="main-logo pull-left">
        <a href="javascript:(void);">
          <img class="logo-hk01news" src="static/img/hk01news-logo.png" alt="01新聞 | 香港01">
        </a>
      </p>
      <h2 class="text-muted text-center">打工仔計稅機</h2>
      <p class="text-muted text-center"><small></small></p>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  /* margin-top: 40px; */
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #13547a;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
@import '../node_modules/slick-carousel/slick/slick.css';
@import '../node_modules/vue-directive-tooltip/css/index.css';
@import './style.scss';
</style>
