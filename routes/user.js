const express = require("express");
const router = express.Router();

const userControllers=require("../controllers/user_controllers.js");



router.get("/menu/:slug", userControllers.menu_list);

router.get("/kahve/:slug", userControllers.menu_details);

router.get("/about",userControllers.about_get);

router.get("/menu",userControllers.menu_get);

router.get("/",userControllers.anasayfa_get);


module.exports = router;