<template>
  <div class="app" id="app">
    
    <!-- 视图 -->
    <div class="main">
      <router-view></router-view>
    </div>

    <!-- 粒子 -->
    <canvas id="background"></canvas>
  </div>

</template>

<style lang="less">
  // scoped 
  * {
    padding: 0;
    margin: 0;
    white-space: nowrap;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    font-family: 'Microsoft Yahei';
    border: 0;
  }


  .app {
    width: 100%;
    height: 100%;
    background: url('./imgs/timg.jpg') no-repeat;
    background-size: cover;
    background-position: center center;
    background-color: rgb(1, 1, 3);
    position: relative;
    >.main {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
    #background {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
    }
  }

</style>


<script>
export default {
  data:function () { 
    return {
      nav: null
    }
  },
  mounted: function() {
    // 
    Particles.init({
      selector: '#background',
      maxParticles: 100,
      color: '#ffffff',
      connectParticles: true,
    });

  }
}
</script>






