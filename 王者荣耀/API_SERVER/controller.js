const conn = require('./bd.js')

module.exports = {
    getErr:  (req, res) => {
        res.send('这是后端数据链接');
    },
    getallhero: (req, res) => {
        const mysql1 = "select * from heros";
        conn.query(mysql1, (err, result) => {
            if (err) return res.end.send({ status: 500, msg: err.message, data: null })
            res.send({ status: 200, msg: "ok", data: result });
        })
    },
    addhero:  (req, res) => {
        const hero = req.body
        const dt = new Date()
        const y = dt.getFullYear()
        const m = (dt.getMonth() + 1).toString().padStart(2, "0");
        const d = dt.getDate().toString().padStart(2, "0");
    
        const hh = dt.getHours().toString().padStart(2, "0");
        const mm = dt.getMinutes().toString().padStart(2, "0");
        const ss = dt.getSeconds().toString().padStart(2, "0");
        //补全添加的时间
        hero.ctime = y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
        // console.log(hero)
        // res.send("ok")
        const myq = 'insert into heros set ?'
        conn.query(myq, hero, (err, result) => {
            if (err) return res.send({ status: 500, msg: err.message, data: null })
            res.send({ status: 200, msg: "ok", data: result });
            console.log(result);
        })
    },
    gethero:  (req, res) => {
        const id = req.params.id;
        // console.log(id)
        const myq1 = "select * from heros where id=2";
        // console.log(myq1);
        conn.query(myq1, id, (err, result) => {
            if (err) return res.send({ status: 500, msg: err.message, data: null })
            res.send({ status: 200, msg: "ok", data: result });
        })
    },
    updatahero: (req, res) => {
        const id = req.params.id;
        // console.log(id)
        const newInFo = req.body;
        const myq1 = "update heros set? where id=?";
        // console.log(myq1);
        conn.query(myq1, [newInFo, id], (err, result) => {
            if (err) return res.send({ status: 500, msg: err.message, data: null })
            res.send({ status: 200, msg: "ok", data: result });
        })
    },
    datethero: (req, res) => {
        const id = req.params.id;
       
        const myq8 = "update heros set isdel=1 where id=?";
        conn.query(myq8, id, (err, result) => {
            if (err) return res.send({ status: 500, msg: err.message, data: null })
            res.send({ status: 200, msg: "ok", data: result });
        })
    }
}