<template>
  <div class="cpt_song">
    <h1>{{mode?"课堂 点歌 大转盘":"幸运 点名 找到你"}}</h1>
    <!--  -->
    <div class="show">

      <!-- 转盘相关 -->
      <div class="pan">

        <!-- 转盘 -->
        <div class="bar" :style="{'height':h+'px','transform':'translateY(-50%) rotate('+init_deg+'deg)'}">
          <div class="one" 
            v-for="(item,index) in st"
            :key="item.id"
            :style="{'height':h+'px','lineHeight':h+'px','transform':'rotate('+ 360/st.length*index +'deg)','fontSize':Math.floor(h>14?14:h)+'px'}">
            {{mode?item.song:item.name}}
          </div>
        </div>

        <!-- 箭头 -->
        <i class="el-icon-back jt"></i>

      </div>


      <!-- 切换按钮 -->
      <div class="btn_change">
        <el-button type="danger" @click="change">模式切换</el-button>
      </div>

      <!-- 启动按钮 -->
      <div class="btn_start">
        <el-button type="primary" @click="start">启动</el-button>
      </div>

      



    </div>
  </div>
</template>

<style lang="less" scoped>
  @keyframes jt_move {
    0% {
      right: -55px;
    }
    100% {
      right: -80px;
    }
  }
  .cpt_song {
    // position: absolute;
    // left: 50%;
    // transform: translateX(-50%);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    h1 {
      box-sizing: border-box;
      text-align: center;
      font-size: 40px;
      color: #fff;
      padding: 8px;
    }
    .show {
      flex: 1;
      position: relative;
      overflow: hidden;
      // 转盘相关
      .pan {
        position: absolute;
        top: 50%;
        left: -1600px;
        transform: translateY(-50%);
        width: 2600px;
        height: 2600px;
          // 转盘
          .bar {
            width: 50%;
            height: 30px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform-origin: 0 50%;
            transform: translateY(-50%) rotate(0);
            transition: all 3s ease-out;
            .one {
              width: 100%;
              height: 100%;
              background-color: rgba(0,0,0,0.8);
              color: #fff;
              box-shadow: 0 0 5px #fff;
              position: absolute;
              top: 0;
              left: 0;
              transform-origin: 0 50%;
              text-align: right;
              box-sizing: border-box;
              padding-right: 20px;
              transition: all 0.3s;
              cursor: pointer;
            }
            .one:hover {
              padding-right: 40px;
            }
          }
          // 指针
          .jt {
            position: absolute;
            top: 50%;
            right: -55px;
            transform: translateY(-50%);
            font-size: 80px;
            color: #fff;
            animation: jt_move 0.3s infinite alternate;
          }
      }

      // 切换按钮
      .btn_change {
        position: absolute;
        top: 10px;
        right: 10px;
      }

      // 启动按钮 
      .btn_start {
        position: absolute;
        top: 60px;
        right: 10px;
      }


    }
   
  } 
</style>

<script>
  export default {
    data:function () { 
      return {
        // 班级号
        bj:'',

        // 学生数据列表
        st: [],
        // 模式切换 true：点歌
        mode:true,
        // 初始化度数
        init_deg:0,
      }
    },
    computed:{
      // 单个盒子的高度
      h:function () { 
        return this.st.length ? 2600 * 3.1415/this.st.length : 30;
      },
      // 单个盒子的角度
      deg:function () { 
        return this.st.length ? 360/this.st.length : 0;
      }
    },
    methods:{
      // 切换
      change:function () { 
        this.mode = !this.mode;
      },
      // 点击启动旋转
      start:function () { 
        this.init_deg += Math.floor(Math.random()*this.st.length/2)*this.deg;
      },
      // 加载班级数据
      load:function () { 
        var me = this;
        this.$http
          .post('/api/st/by_bj.do',{
            bj:this.bj
          })
          .then(function (res) {  
            // 
            me.st = res;
          });
       }

    },
    // 
    mounted:function (e) { 
      this.bj = this.$route.params.bj;

      this.load();
    }
  }
</script>



