var express = require('express');
var router = express.Router();

// 引入连接数据库模块
const connection = require('./conn');

// 调用连接方法
connection.connect(() => {
  console.log('数据库连接成功!666');  
});

/* 接收添加用户账号的请求 */
router.post('/userAdd', (req, res) => {
  // 接收前端用户账号的数据
  let {username, password, group} = req.body;
  // console.log('接收到的数据:',username, password, group) 这里要测试

  // 构造sql语句
  const sqlStr = `insert into users(username, password, groups) values('${username}', '${password}', '${group}')`;

  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      console.log(data);
      if (data.affectedRows > 0) {
        res.send({"errcode": 1, "msg":"添加成功!"})
      } else {
        res.send({"errcode": 0, "msg":"添加失败!"})
      }
    }
  })
})



module.exports = router;
