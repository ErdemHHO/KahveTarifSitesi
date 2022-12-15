const express = require("express");
const router = express.Router();

const authControllers=require("../controllers/auth_controllers.js");

//giris
router.get("/login",authControllers.login_get);
router.post("/login",authControllers.login_post);

router.get("/logout",authControllers.logout_get);


// router.get("/loading",authControllers.loading_get);

module.exports=router;