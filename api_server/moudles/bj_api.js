function JS_demo(app) {
  var me = this;

  // 
  me.app = app;
  // 路由
  me.router = require('express').Router();

  // 班级 数据库模型
  me.bj_model = require('../collection/bj_model.js');

  // 学生 模型
  me.st_model = require('../collection/st_model.js');

}
JS_demo.prototype = {
  init: function() {
    var me = this;

    // 新增
    me.router.post('/add.do', function(req, res) {
      // 班级新增
      me._add(req, res);
    });

    // 列表
    me.router.post('/list.do', function(req, res) {
      // 班级新增
      me._list(req, res);
    });

    // 删除：要删除学生信息
    me.router.post('/del.do', function(req, res) {
      // 班级新增
      me._del(req, res);
    });


    me.app.use('/api/bj', me.router);
  },
  // 删除 班级 
  _del: function(req, res) {
    var me = this;
    // 1.查询班级学生-删除
    me.st_model
      .deleteMany({
        bj_id: req.body._id
      })
      .then(function(res) {
        // 2.删除班级数据
        return me.bj_model.deleteOne(req.body)
      })
      .then(function(data) {
        res.send(data);
      });

    // 
    //   
  },
  // 新增一个班级
  _add: function(req, res) {
    var me = this;
    // 创建数据
    me.bj_model
      // 创建
      .create(req.body)
      // 返回
      .then(function(data) {
        res.send(data);
      });
  },
  // 获取班级列表
  _list: function(req, res) {
    var me = this;
    // 创建数据
    me.bj_model
      .find({})
      .sort({ _id: 1 })
      // 返回
      .then(function(data) {
        // console.log(data);

        res.send(data);
      });
  }


};



module.exports = JS_demo;