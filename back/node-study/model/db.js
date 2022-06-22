var Sequelize = require("sequelize");
var sequelize;

sequelize = new Sequelize("class101", "root", "8591", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    timezone: '+09:00', //한국 시간 셋팅
    define: {
     //sequelize는 기본적으로 영어 복수이름으로 테이블을 만드는데
     //그 기능을 끄는 옵션입니다.
     freezeTableName: true,
     charset: "utf8",
     collate: "utf8_general_ci",
     timestamps: true,
    }
   });

//app.js에서 DB사용하기 위해 내보내기 과정 필요
var db = {};
//우리가 만든 table(users.js 함수)는 sequelize.import로 가져와야한다.
db.users = sequelize.import(__dirname + "/users.js");
db.reviews = sequelize.import(__dirname + "/reviews.js");

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;