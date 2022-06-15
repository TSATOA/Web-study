//express도구 
const { application } = require('express');
const express = require('express');
const helmet = require('helmet');
const app = express();
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/public',express.static(__dirname + '/public'));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded());

const mainRouter = require('./router/mainRouter')
app.use('/',mainRouter)

//3000번방 서버를 켜준다
app.listen(3000,function(req,res){
    console.log("서버 실행중!")
})