<template>
  <div class="cpt_st">
    <h3>随便点</h3>

    <div class="item">
      <span class="info">班级</span>
      <div class="ipt">

        <el-select size="mini" v-model="bj_id" placeholder="请选择班级">

          <el-option
            v-for="item in bj_arr"
            :key="item._id"
            :label="item.bj+'期'"
            :value="item._id">
          </el-option>

        </el-select>
      </div>
    </div>

    <div class="item">
      <span class="info">姓名</span>
      <div class="ipt">
        <el-input  size="mini" placeholder="姓名输入框" v-model="name"></el-input>
      </div>
    </div>
    <div class="item">
      <span class="info">点歌</span>
      <div class="ipt">
        <el-input  size="mini" placeholder="点歌输入框" v-model="song"></el-input>
      </div>
    </div>

    <div class="btn">
      <el-button size='medium' type="success" @click="st_sumbmit">提交</el-button>
    </div>
    
  </div>
</template>

<style lang="less" scoped>
  .cpt_st {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 280px;
    height: 213px;
    background-color: rgba(0,0,0,0.8);
    box-shadow: 0 0 10px #fff;
    transform: translate(-50%,-50%);
    border-radius: 5px;
    h3 {
      margin: 10px 0;
      padding-left: 16px;
      color: #fff;
    }
    .item {
      margin-bottom: 5px;
      height: 36px;
      display: flex;
      font-size: 13px;
      .info {
        width: 60px;
        line-height: 36px;
        text-align: center;
        color: #fff;
      }
      .ipt {
        flex: 1;
        padding: 3px 8px;
        .el-select {
          width: 100%;
        }
      }
    }
    .btn {
      padding: 0 10px;
      .el-button {
        width: 100%;
      }
    }
    
  }
</style>

<script>
  export default {

    // 
    data:function () { 
      return {
        // 班级列表
        bj_arr: [],
        // 默认选中
        bj_id:"",


        // 名称
        name:"",
        // 
        song:""
      }
    },

    computed:{

    },

    methods:{
      // 班级列表获取
      bj_list:function () { 
        var me = this;
        this.$http
          .post('/api/bj/list.do')
          .then(function (res) {              
            // 
            // console.log(res);
            
            me.bj_arr = res;
          });
      },
      // 学生数据新增
      st_sumbmit:function () {
        var me = this;
        if (this.bj_id=="") {
          this.$message.error('请选择班级');
          return;
        }
        if (this.name=="") {
          this.$message.error('请输入姓名');
          return;
        }
        if (this.song=="") {
          this.$message.error('童鞋，歌名呢？');
          return;
        }

        this.$http
          .post('/api/st/add.do',{
            bj_id:this.bj_id,
            name:this.name,
            song:this.song
          })
          .then(function (res) {              
            // 
            // 提交数据成功
            if (res.song==me.song) {
              me.$message({
                message: '点歌成功，可跟换歌名再次点歌！',
                type: 'success'
              });
            }
            
            // me.bj_arr = res;
          });




        
      }
    },
    // 
    mounted:function () {  
      this.bj_list();
    }
  }
</script>



