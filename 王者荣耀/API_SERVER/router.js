const express = require('express');
const router = express.Router();


// const mysql = require('mysql');
// const conn = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: 'root',
//     database: 'mysql_001'
// }

//导入自己的业务处理模块

const ctrl = require('./controller.js')


router.get('/getErr',ctrl.getErr)

//对外暴露getAllhero接口
router.get('/getallhero', ctrl.getallhero)
//--------------------添加--------------------
router.post('/addhero', ctrl.addhero)

//--------------------获取 英雄信息-----------------
router.get('/gethero/:id', ctrl.gethero)


//-----------根据英雄id 更新英雄数据
router.post('/updatahero/:id', ctrl.updatahero)


//软删除
router.get('/datethero/:id', ctrl.datethero)



module.exports = router;