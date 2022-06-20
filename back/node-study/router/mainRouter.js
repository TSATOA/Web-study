const express = require('express')
const router = express.Router()
const db = require('../model/db')

//주소만들어주고
router.get("/", function(req,res){
    //그림파일 전달할 때. 항상 views 폴더를 바라보고 있다.
    res.render('index',{title:"EJS메인페이지"});
})

router.get("/about", function(req,res){
    res.send('About Page');
})

router.post("/postapi",function(req,res){
    let body = req.body;
    console.log(body);
    res.send('Post API');
})

//Create, Read, Update, Delete
router.get("/data/create", function(req,res){
    let user_id = parseInt(Math.random() * 10000)
    db.users.create({user_id:user_id}).then(function(result){
        res.send({success:200})
    })
})

router.get("/data/read",function(req,res){
    db.users.findAll().then(function(result){
        res.send({success:200, data:result})
    })
})

router.post("/data/update", function(req,res){
    let target_id = req.body.target_id;
    db.users.update({user_id:9999},{where:{user_id:target_id}}).then(function(result){
      res.send({success:200})
    })
  })

router.post("/data/delete",function(req,res){
    let target_id = req.body.target_id;
    db.users.destroy({where:{user_id:target_id}}).then(function(result){
        res.send({success:200})
    })
})



//app.js에서 사용하기 위해 변수로 선언된 router를 내보내준다.
module.exports = router;

