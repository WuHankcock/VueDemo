var express = require('express');
var app = express();
var mysqlhelper = require('./mysqldemo');

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/', function (req, res) {
    const sql = `select * from city where name='Xian' LIMIT 15`;
    mysqlhelper.eval(sql).then(reslt => {
        console.log(reslt);
        res.send(reslt);
    }).catch(err => {
        res.send(err);
    });

});

app.get('/delete', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    let sql = 'delete from city where ';
    let where = '';
    let arr = Object.keys(req.query)
    for (let i = 0, len = arr.length; i < len; i++) {
        arr[i] = `${arr[i]} = '${req.query[arr[i]]}' `
    }
    where = arr.join(' and ');
    sql = `${sql} ${where}`;
    mysqlhelper.eval(sql).then(result => {
        res.send(result);
    }).catch(err => {
        res.send(err);
    });
});

app.get('/add', function (req, res) {
    let sql = '';
    let arr = Object.keys(req.query);
    let fields = [];
    let values = [];
    for (let i = 0, len = arr.length; i < len; i++) {
        fields.push(arr[i]);
        values.push(`'${req.query[arr[i]]}'`);
    }
    sql = `insert into city (${fields.join(',')}) values(${values.join(',')})`;
    mysqlhelper.eval(sql).then(result => {
        res.send('add!');
    }).catch(err => {
        res.send(err);
    });
});

app.get('/update', function (req, res) {
    let sql = '';
    let arrNew = Object.keys(JSON.parse(req.query.new));
    let arrOld = Object.keys(JSON.parse(req.query.old));
    for (let i = 0, len = arrNew.length; i < len; i++) {
        arrNew[i] = `${arrNew[i]} = '${JSON.parse(req.query.new)[arrNew[i]]}'`;
        arrOld[i] = `${arrOld[i]} = '${JSON.parse(req.query.old)[arrOld[i]]}'`;
    }
    sql = `update city set ${arrNew.join(',')} where ${arrOld.join(' and ')}`;
    mysqlhelper.eval(sql).then(result => {
        res.send('add!');
    }).catch(err => {
        res.send(err);
    });
});

app.get('/login', function (req, res) {
    let username = req.query.username;
    let password = req.query.password;
    let sql = `select password from user where username = '${username}'`;
    mysqlhelper.eval(sql).then(result => {
        if (result.data && result.data.length > 0) {
            let tbPWd = result.data[0].password;
            if (tbPWd === password) {
                res.send('login!');
            } else {
                res.send('fail!')
            }
        } else {
            res.send('fail!')
        }
        //console.dir(result);
    }).catch(err => {
        res.send(err.toString());
    });
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port;
    console.log('服务启动在：' + host + port);
});