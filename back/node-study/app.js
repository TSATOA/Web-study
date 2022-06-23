//express도구 
const { application } = require('express');
const express = require('express');
const helmet = require('helmet');
const app = express();
const ejs = require('ejs');
const db = require('./model/db');
const json2xls = require('json2xls');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/public',express.static(__dirname + '/public'));

// app.use(helmet()); //보안
app.use(express.json());
app.use(express.urlencoded());
app.use(json2xls.middleware);

const mainRouter = require('./router/mainRouter')
app.use('/',mainRouter)

//3000번방 서버를 켜준다
app.listen(3000,function(req,res){
    //false를 하면 db를 항상 보고 업데이트를 해준다. true는 초기화시킴
    db.sequelize.sync({force:false})
    console.log("서버 실행중!")
})