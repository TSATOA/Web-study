const express = require('express')
const router = express.Router()

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

//app.js에서 사용하기 위해 변수로 선언된 router를 내보내준다.
module.exports = router;

