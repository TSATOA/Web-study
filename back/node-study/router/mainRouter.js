const express = require('express');
const { reviews } = require('../model/db');
const router = express.Router()
const db = require('../model/db')

//크롤링 준비
const cheerio = require("cheerio")
const axios = require("axios")
const iconv = require("iconv-lite")  

const url = "https://finance.naver.com/sise/lastsearch2.naver" //네이버금융

router.get("/excel/down",function(req,res){
    let excel_data = [{"A":1,"B":2,"C":3,"D":4}]
    res.xls('data.xlsx', excel_data);
})


router.get("/crawling",function(req,res){

    axios({url:url, method:"GET",responseType:"arraybuffer"}).then(function(html){  //네이버금융에 접속
        const content = iconv.decode(html.data,"EUC-KR").toString()  //iconv로 한글로 디코딩해서 깨짐 방지
        const $ = cheerio.load(content)  //쉽게 html코드로 접근해서 사용할 수 있게 해주는 도구
        
        const table = $(".type_5 tr td")
        table.each(function(i,tag){
            console.log($(tag).text().trim())  //td에 있는 정보를 공백없이 가져옴
        })
        res.send({success:200})
    })  
    
})

//엑셀 자동화
router.get("/excel", function(req,res){
    res.render("excel")
})


//주소만들어주고
router.get("/", function(req,res){
    //그림파일 전달할 때. 항상 views 폴더를 바라보고 있다.
    res.render('main',{title:"영화리뷰 사이트"});
})

router.post("/review/create", function(req,res){
    let movie_id = req.body.movie_id;
    let review = req.body.review;

    if(movie_id == '' || movie_id ==0){
        res.send({success:400})
    }else{
        db.reviews.create({
            movie_id:movie_id,
            review:review
        }).then(function(result){
            res.send({success:200})
        })
    }  
})

router.get("/review/read",function(req,res){
    let movie_id = req.query.movie_id;
    db.reviews.findAll({where:{movie_id:movie_id}}).then(function(result){
        res.send({success:200, data:result})
    })
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

