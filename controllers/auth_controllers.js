const path = require('path');
const fs = require("fs");
const bcrypt=require("bcrypt");
const config = require("../config/config.js");
const kahve = require("../models/kahve.js");
const kategori = require("../models/kategori.js");
const kullanici = require("../models/kullanici.js");
const fileUpload = require("../helpers/file-upload");

const login_get=async function(req, res) {
    try {
        res.render("login/login.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}
const login_post=async function(req, res){
    console.log("girdi");
    const mail=req.body.mail;
    console.log(mail);
    const sifre=req.body.parola;
    console.log(sifre);
    try{
        const user=await kullanici.findOne({
        where:{
            kullaniciMail:mail
        }  
      });
      console.log(user);
      if(!user){
        console.log("user");
        console.log("mail yanlış");
        return res.render("login/login.ejs",{
            message:"Kullanıcı Mail Hatalı!",
            renk:"danger"
        })    
      }
      
      //parola kontrolü
      const match=await bcrypt.compare(sifre, user.kullaniciParola);
      
      if(match){
        console.log("sifre doğru");
        req.session.isAuth=true;
        req.session.kullaniciAd=user.kullaniciAd;
        req.session.kullaniciSoyad=user.kullaniciSoyad;
        req.session.kullaniciMail=user.kullaniciMail;
        return res.redirect("/admin/kahveekle");
      }
      else{console.log("sifre yanlış");
        return res.render("login/login.ejs",{
            message:"Şifre Hatalı!" ,
            renk:"danger"
    });   
        
      }  
    }
    catch(err){
        console.log(err)
    }
}
const logout_get=async function(req, res) {
    try {
        await req.session.destroy();
        return res.redirect("/giris/login");
    }
    catch(err) {
        console.log(err);
    }
}
// const loading_get=async function(req, res) {
//     try {
//         setTimeout(function(){     
//             return res.redirect("/admin/kahveekle");
//             }, 1000);
//     }
//     catch(err) {
//         console.log(err);
//     }
// }

module.exports={
    login_get,login_post,logout_get,
}