function JS_demo(app) {
  var me = this;

  // 
  me.app = app;
  // 路由
  me.router = require('express').Router();

  // 学生 数据库模型
  me.st_model = require('../collection/st_model.js');

  // 班级 数据库模型
  me.bj_model = require('../collection/bj_model.js');

}
JS_demo.prototype = {
  init: function() {
    var me = this;

    // 新增
    me.router.post('/add.do', function(req, res) {
      // 班级新增
      me._add(req, res);
    });

    // 通过班级id  获取学生列表
    me.router.post('/list.do', function(req, res) {
      me._list_by_id(req, res);
    });

    // 通过班级名称  获取学生列表
    me.router.post('/by_bj.do', function(req, res) {
      me._list_by_name(req, res);
    });




    // 删除
    me.router.post('/del.do', function(req, res) {
      me._del(req, res);
    });


    me.app.use('/api/st', me.router);
  },
  // 
  _del: function(req, res) {
    this.st_model
      .deleteOne(req.body)
      .then(function(data) {
        res.send(data);
      });
  },
  // 获取列表
  _list_by_id: function(req, res) {
    var me = this;
    me.st_model
      .find({ bj_id: req.body.bj_id })
      // 返回
      .then(function(data) {
        res.send(data);
      });
  },
  // 
  _list_by_name: function(req, res) {
    var me = this;
    me.bj_model
      .findOne({ bj: req.body.bj })
      // 返回
      .then(function(data) {

        me.st_model
          .find({ bj_id: data._id })
          // 返回
          .then(function(bak) {
            res.send(bak);
          });
      });
  },

  // 新增一个学生
  _add: function(req, res) {
    var me = this;
    // 创建数据
    me.st_model
      // 查找
      .findOne({ name: req.body.name })
      // 返回
      .then(function(data) {
        // console.log(data);

        // 没有该数据
        if (data == null) {
          me.st_model
            // 创建
            .create(req.body)
            // 返回
            .then(function(back) {
              res.send(back);
            });
        }
        // 更新数据
        else {
          me.st_model
            // 
            .findByIdAndUpdate(data._id, {
              $set: {
                bj_id: req.body.bj_id,
                song: req.body.song
              }
            })
            .then(function(back) {
              res.send(req.body);
            });
        }

      });
  },






};



module.exports = JS_demo;