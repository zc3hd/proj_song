var mongoose = require('mongoose');
// 集合标示
var model_key = 'st';

// 文档模型
var doc_model = new mongoose.Schema({
  // 学生的名称
  name: String,
  // 点歌
  song: String,
  // 关联的班级
  bj_id: String
});

// 模型
module.exports = mongoose.model(model_key, doc_model, model_key);