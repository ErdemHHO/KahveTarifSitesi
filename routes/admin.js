const express = require("express");
const router = express.Router();
const fileUpload = require("../helpers/file-upload");

const adminControllers=require("../controllers/admin_controllers.js");

const isAuth=require("../middlewares/auth");

router.get("/kullanicisil",isAuth,adminControllers.adminKullaniciSil_get);
router.post("/kullanicisil",adminControllers.adminKullaniciSil_post);

router.get("/kullaniciguncelle",isAuth,adminControllers.adminKullaniciGuncelle_get);
router.post("/kullaniciguncelle",adminControllers.adminKullaniciGuncelle_post);

router.get("/kullaniciekle",isAuth,adminControllers.adminKullaniciEkle_get);
router.post("/kullaniciekle",adminControllers.adminKullaniciEkle_post);

router.get("/kahveekle",isAuth,adminControllers.kahveEkle_get);
router.post("/kahveekle",fileUpload.upload.single("kahveFoto"),adminControllers.kahveEkle_post);

router.get("/kahvesil",isAuth,adminControllers.kahveSil_get);
router.post("/kahvesil",adminControllers.kahveSil_post);

router.get("/kahveguncelle",isAuth,adminControllers.kahveGuncelle_get);
router.post("/kahveguncelle",fileUpload.upload.single("kahveFoto"),adminControllers.kahveGuncelle_post);

router.get("/kahvetablosu",isAuth,adminControllers.kahveTablosu_get);

module.exports = router;