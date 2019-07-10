const express = require('express');
const bodyParser = require('body-parser');

const app = express();
//在 API 服务器端  启用CORS 跨域资源共享
const cors = require('cors');
app.use(cors());
// Headers('Access-Control-Allow-Origin:http://127.0.0.1:5001')
// response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5001");


//注册body-parser 中间件，来解析post提交过来的表单数据
app.use(bodyParser.urlencoded({ extended: false }))

const router = require('./router.js')
app.use(router);

app.listen(5001, () => {
    console.log('server running  at http://127.0.0.1:5001');
})