var mongoose = require('mongoose');
// 集合标示
var model_key = 'bj';

// 文档模型
var doc_model = new mongoose.Schema({
  // 班级的名称
  bj: String,
});

// 模型
module.exports = mongoose.model(model_key, doc_model, model_key);