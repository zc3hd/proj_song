<template>
  <div class="cpt_admin">
    <div class="box">


      <!-- ******************************************班级信息 -->
      <div class="banji">

        <!-- 顶部栏 -->
        <div class="top">
          <!-- 输入框 -->
          <el-input v-model="bj_name" size="small" placeholder="新增班级"></el-input>
          <!-- 按钮 -->
          <i class="el-icon-circle-plus" @click="bj_add"></i>
        </div>



        <!-- 班级列表 -->
        <div class="list">

          <div class="item" 
            v-for="(item,index) in bj_arr"
            :key="item._id"
            :class="bj_ac_index==index?'ac':''" >
            <!-- 切换 -->
            <span class="info" @click="bj_change(index)">{{item.bj}}期</span>
            <!-- 删除 -->
            <i class="el-icon-circle-close" @click="bj_del(item._id)"></i>
          </div>


        </div>


      </div>






      <!-- ***********************************************学生信息 -->
      <div class="st">
        <div class="item" v-for="item in st_arr" :key="item._id">
          <span class="name">{{item.name}}</span>
          <span class="song">{{item.song}}</span>
          <i class="el-icon-circle-close" @click="st_del(item._id)"></i>
        </div>
      </div>



    </div>
  </div>
</template>


<script>
  export default {

    // 
    data:function () { 
      return {
        // -----------------------
        // 新增班级的名称
        bj_name:"",
        // 班级数据
        bj_arr:[],
        // 当前点击班级的下标
        bj_ac_index:0,

        // -----------------------
        // 学生列表
        st_arr:[]
        
      }
    },

    computed:{
    },

    methods:{
      // ---------------------------------------------班级数据
      // 班级列表获取
      bj_list:function (ck) { 
        var me = this;
        this.$http
          .post('/api/bj/list.do')
          .then(function (res) {  
            console.log(res);
            
            // 
            me.bj_arr = res;

            ck&&ck();
          });
      },
      // 点击列表切换
      bj_change:function (index) { 
        var me = this;
        this.bj_ac_index = index;
        // 学生数据
        me.st_list();
      },
      // 班级新增
      bj_add:function () {
        if (this.bj_name=="") {
          return;
        }
        var me = this;
        this.$http
          .post('/api/bj/add.do', {
            bj: this.bj_name,
          })
          .then(function (data) {  
            me.bj_name = "";
            me.bj_list();
          });


      },
      // 班级删除
      bj_del:function (_id) { 
        var me = this;
        // 删除数据
        this.$http
          .post('/api/bj/del.do', {
            _id: _id,
          })
          .then(function (data) {  

            // 默认回到第一个班级
            me.bj_ac_index=0;
            
            // 班级列表
            me.bj_list(function () { 
              // 学生列表
              me.st_list();
            });

            
          });
      },

      // ---------------------------------------------学生信息
      st_list:function () {
        var me = this;
        // 没有数据
        if (me.bj_arr.length==0) {
          return;
        }
        
        this.$http
          .post('/api/st/list.do',{
            bj_id:me.bj_arr[me.bj_ac_index]._id +""
          })
          .then(function (res) {  
            // 
            me.st_arr = res;
          });
      },
      // 删除学生
      st_del:function (_id) { 
        var me = this;
        this.$http
          .post('/api/st/del.do',{
            _id:_id
          })
          .then(function (res) {  
            // 学生列表重新加载
            me.st_list();
          });
      },



    },
    // 
    mounted:function () {  
      var me = this;
      // 加班班级列表
      this.bj_list(function () {  
        me.st_list();
      });
    }
  }
</script>



<style lang="less" scoped>
  // 
  @bgc:rgba(0,0,0,0.8);


  .cpt_admin {
    width: 100%;
    height: 100%;
    
    .box {
      width: 800px;
      height: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      box-shadow: 0 0 10px #fff;


      // 班级
      .banji {
        width: 250px;
        background-color: @bgc;
        display: flex;
        flex-direction: column;

        // 顶部栏
        .top {
          height: 40px;
          box-sizing: border-box;
          padding: 5px;
          display: flex;
          
          // 输入框
          .el-input {
            flex: 1;
          }
          i {
            width: 30px;
            text-align: center;
            line-height: 30px;
            cursor: pointer;
            color: #fff;
          }
        }

        // 列表
        .list {
          flex: 1;
          box-sizing: border-box;
          margin: 5px;
          border: 1px solid #222;
          color: #fff;
          overflow-y: auto;
          .item {
            height: 26px;
            display: flex;
            background-color: rgba(0,0,0,0.8);
            margin-bottom: 5px;
            span {
              flex: 1;
              line-height: 26px;
              padding: 0 8px;
              font-size: 14px;
            }
            i {
              width: 30px;
              text-align: center;
              line-height: 26px;
              cursor: pointer;
            }
          }
          .ac {
            background-color: rgba(0,0,128,0.8);
          }
        }
      }



      // st信息
      .st {
        flex: 1;
        margin: 5px;
        background-color: @bgc;
        overflow-y: auto;
        .item {
          height: 26px;
          display: flex;
          background-color: rgba(0,0,0,0.3);
          margin-bottom: 5px;
          color: #fff;
          span {
            flex: 1;
            line-height: 26px;
            padding: 0 8px;
            font-size: 14px;

          }
          .name {
            flex: 1;
          }
          .song {
            flex: 2;
          }
          i {
            width: 30px;
            text-align: center;
            line-height: 26px;
            cursor: pointer;
          }
        }
      }
    }
    
    


  }
</style>
