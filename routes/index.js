var express = require('express');
var router = express.Router();

/* GET home page. */
var db = 'mongodb+srv://Chungbui:chungkk123@cluster0.hq9zz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
router.get('/', async function (req, res, next) {
    console.log("vao trang chu")

    // lay danh sach
    var sinhviens = await SV.find({});

    res.render('index', {data: sinhviens});
});
router.get('/xoa' , async function(req, res, next){
    console.log("xoa")
    await SV.deleteOne({_id:req.query.id})
    // quay về trang chủ
    res.redirect('/');

})
router.get('/',  function(req, res, next) {
  res.render('index', { title: 'Express' });
});
const mongoose = require('mongoose');
const {Schema} = mongoose ;
mongoose.connect(db).catch(error=>{
    if (error)
    {
        console.log("co loi xay ra" +error.message)
    }
}) ;
const Student = new Schema({
    email: String,
    firstNam: String ,
    LastName : String ,
    Password: String
})
const  SV = mongoose.model('Student' , Student)

router.get('/car', function(req, res, next) {
 console.log('vao trang ôt')
  var data = 'xin chao vào trang oto'
  var mang = [1,5,3,6,3,2,6]
  var SinhVien = {name:'HuyNguyen',tuoi:33}

  res.render('car', { title: 'Express',dulieu:data,array:mang,studen:SinhVien });
});
router.get('/covid', function(req, res, next) {


    res.render('covid', );
});
router.post('/covid', function (req , res,next ) {
    var hoten = req.body.hoten;
    var quequan = req.body.quequan;
    var sdt = req.body.sdt;
    //var data = email + '- '+firstNam+'-'+LastName+"-"+Password

    var data = hoten + '-' +quequan+'-'+sdt
    res.render('HienThi',{data12:data})

})

router.get('/sua' , async  function(req , res ,next){
    var id = req.query.id  ;

    res . render('sua' , {id: id})
});
router.post('/updataSV' , async  function (req, res ){
    var  id = req.body.id ;
    console.log('AAAAA'+ id )
    var email = req.body.email ;
    var firstNam = req.body.firstNam ;
    var lastname = req.body.LastNam ;
    var password = req.body.Password ;

    var sinhvienMoi = {
        email : email ,
        firstNam : firstNam ,
        lastmane : lastname ,
        Password: password

    }
    await SV.findOneAndUpdate({_id: id } , sinhvienMoi , function (error){
        res.redirect('')
    })

})
router.post('/insertUser',function (req,res) {

  console.log("insert User")
  // <input name="email" placeholder="Nhập Email của bạn">
  var email = req.body.email;

  //     <input name="firstNam" placeholder="Nhập First name của bạn">
  var firstNam = req.body.firstNam;
  //     <input name="LastName" placeholder="Nhập Last Name của bạn">
  var LastName= req.body.LastName;
  //     <input name="Password" placeholder="Nhập Pass của bạn">
  var Password = req.body.Password;
  console.log(email + '- '+firstNam+'-'+LastName+"-"+Password)
  var data = email + '- '+firstNam+'-'+LastName+"-"+Password
    // viết câu lệnh thêm
    //b1 định nghĩa khung của model - sinh vien (id , mame , email ) schema
    // b2 mở kết nối với collection
    //b3 gọi câu lệnh insert với dữ liệu của mình
    const SinhVienMoi = new SV({
        email:email ,
        firstNam:firstNam,
        LastName:LastName ,
        Password:Password
    })
  //res.render('index',{data})
    SinhVienMoi.save(function (error){
        if (error){
            res.render('index', {message: "thêm không thành công "+error.message})
        }else {
            res.render('index' , {message:"thêm thành công"})
        }
    })
})

module.exports = router;
