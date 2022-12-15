const path = require('path');
const fs = require("fs");
const bcrypt=require("bcrypt");
const config = require("../config/config.js");
const kahve = require("../models/kahve.js");
const kategori = require("../models/kategori.js");
const kullanici = require("../models/kullanici.js");
const fileUpload = require("../helpers/file-upload");



const adminKullaniciEkle_get=async function(req, res) {
    try {
        return res.render("admin/kullaniciekle.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}
const adminKullaniciEkle_post=async function(req, res) {
    const kullaniciAd = req.body.kullaniciAd;
    const kullaniciSoyad=req.body.kullaniciSoyad;
    const kullaniciParola=req.body.kullaniciParola;
    const hashedPassword=await bcrypt.hash(kullaniciParola,10);
    const kullaniciMail=req.body.kullaniciMail;
    const kullanciAra=await kullanici.findOne({
        where:{
            kullaniciMail: kullaniciMail
        }
    })
    try {
        if(kullanciAra){
            return res.render("admin/kullaniciekle.ejs", {
                message:"Bu maille kayıtlı, başka bir kullanıcı var.",
                renk:"danger"
            });
        }
        await kullanici.create({kullaniciAd:kullaniciAd,kullaniciSoyad:kullaniciSoyad,kullaniciParola:hashedPassword,kullaniciMail:kullaniciMail})  
        return res.render("admin/kullaniciekle.ejs", {
            message:"Kullanıcı başarıyla kaydedildi",
            renk:"success"
        });
    }
    catch(err) {
        console.log(err);
    }
}

const adminKullaniciSil_get=async function(req, res) {
    try {
        return res.render("admin/kullanicisil.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}

const adminKullaniciSil_post=async function(req, res) {
    const kullaniciMail=req.body.kullaniciMail;
    const kullaniciAra=await kullanici.findOne({
        where:{
            kullaniciMail: kullaniciMail
        }
    })
    if(kullaniciAra){
        await kullaniciAra.destroy({
           where:{
                kullaniciMail:kullaniciMail
            }
        })
        return res.render("admin/kullanicisil.ejs", {
            message:"Kullanıcı silindi",
            renk:"success"
        });
    };
    try {
        return res.render("admin/kullanicisil.ejs", {
            message:"Kullanıcı kaydı yok",
            renk:"danger"
        });
    }
    catch(err) {
        console.log(err);
    }
}

const adminKullaniciGuncelle_get=async function(req, res) {
    try {
        return res.render("admin/kullaniciguncelle.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}
const adminKullaniciGuncelle_post=async function(req, res) {
    const kullaniciAd = req.body.kullaniciAd;
    const kullaniciSoyad=req.body.kullaniciSoyad;
    const kullaniciParola=req.body.kullaniciParola;
    const hashedPassword=await bcrypt.hash(kullaniciParola,10);
    const kullaniciMail=req.body.kullaniciMail;
    const kullanciAra=await kullanici.findOne({
        where:{
            kullaniciMail: kullaniciMail
        }
    })
    try {
        if(!kullanciAra){
            return res.render("admin/kullaniciekle.ejs", {
                message:"Böyle bir kullanıcı yok",
                renk:"danger"
            });
        }
        kullanciAra.kullaniciAd=kullaniciAd;
        kullanciAra.kullaniciSoyad=kullaniciSoyad;
        kullanciAra.hashedPassword=hashedPassword;
        kullanciAra.kullaniciMail=kullaniciMail;
        await kullanciAra.save();
        return res.render("admin/kullaniciguncelle.ejs", {
            message:"Kullanıcı güncellendi.",
            renk:"success"
        });
    }
    catch(err) {
        console.log(err);
    }
}


const kahveEkle_get=async function(req, res) {
    const kategoriAra=await kategori.findAll();
    try {
        return res.render("admin/kahveekle.ejs", {
            kategoriler:kategoriAra
        });
    }
    catch(err) {
        console.log(err);
    }
}
const kahveEkle_post=async function(req, res) {
    const kategoriAra=await kategori.findAll();
    let dosya = req.body.kahveFoto;
    const kategoriNo=req.body.kategoriNo;
    console.log(kategoriNo);
    const kahveAdi=req.body.kahveAdi;
    const kahveTarif=req.body.kahveTarif;
    if(req.file){
        dosya = req.file.filename;
        fs.unlink("./public/file/" + req.body.kahveFoto, err => {
            console.log(err);
        })
    }
    try {
        const kahveara=await kahve.findOne({
            where:{
                kahveAdi: kahveAdi
            }
        })
        if(kahveara){
            return res.render("admin/kahveekle.ejs", {
                kategoriler:kategoriAra,
                message: "Bu kahve zaten var",
                renk:"danger",
            });
        }
        await kahve.create({kategori_id:kategoriNo,kahveAdi:kahveAdi,kahveTarif:kahveTarif,kahveFoto:dosya})  
        return res.render("admin/kahveekle.ejs", {
            kategoriler:kategoriAra,
            message: "Kahve başarıyla eklendi",
            renk:"success",
        });
    }
    catch(err) {
        console.log(err);
    }
}

const kahveGuncelle_get=async function(req, res) {
    try {
        return res.render("admin/kahveguncelle.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}
const kahveGuncelle_post=async function(req, res) {
    let dosya = req.body.kahveFoto;
    const kategoriNo=req.body.kategoriNo;
    const kahveAdi=req.body.kahveAdi;
    const kahveTarif=req.body.kahveTarif;
    if(req.file){
        dosya = req.file.filename;
        fs.unlink("./public/file/" + req.body.kahveFoto, err => {
            console.log(err);
        })
    }
    try {
        const kahveara=await kahve.findOne({
            where:{
                kahveAdi: kahveAdi
            }
        })
        if(kahveara){
            kahveara.kahveAdi = kahveAdi;
            kahveara.kahveTarif = kahveTarif;
            kahveara.kategoriNo = kategoriNo;
            kahveara.kahveFoto=dosya;
            await kahveara.save();
            return res.render("admin/kahveguncelle.ejs", {
                message:"Kahve Guncellendi",
                renk:"success",
            });
        }
        return res.render("admin/kahveguncelle.ejs", {
            message:"Kahve Bulunamadı",
            renk:"danger"
        });
    }
    catch(err) {
        console.log(err);
    }
}

const kahveSil_get=async function(req, res) {
    try {
        return res.render("admin/kahvesil.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}
const kahveSil_post=async function(req, res) {
    const kahveAdiSil=req.body.kahveAdi;
    const kahveAra=await kahve.findOne({
        where:{
            kahveAdi: kahveAdiSil
        }
    })
    try {
        if(kahveAra){
            await kahveAra.destroy({
                where:{
                    kahveAdi:kahveAdiSil
                }
            });
            return res.render("admin/kahvesil.ejs", {
                message:"Kahve Silindi",
                renk:"success"
            });
        }
        return res.render("admin/kahvesil.ejs", {
            message:"Kahve Bulunamadı",
            renk:"danger"
        });
    }
    catch(err) {
        console.log(err);
    }
}
const kahveTablosu_get=async function(req, res) {
    const kahveler=await kahve.findAll();
    try {
        return res.render("admin/kahvetablosu.ejs", {
            kahveler:kahveler
        });
    }
    catch(err) {
        console.log(err);
    }
}


module.exports={
    adminKullaniciEkle_get,adminKullaniciEkle_post,
    adminKullaniciSil_get,adminKullaniciSil_post,
    adminKullaniciGuncelle_get,adminKullaniciGuncelle_post,
    kahveSil_get,kahveSil_post,
    kahveGuncelle_get,kahveGuncelle_post,
    kahveEkle_get,kahveEkle_post,
    kahveTablosu_get
}