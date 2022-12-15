module.exports =async function(req, res, next) {
    res.locals.isAuth = req.session.isAuth;
    res.locals.kullaniciAd=req.session.kullaniciAd;
    res.locals.kullaniciSoyad=req.session.kullaniciSoyad;
    res.locals.kullaniciMail=req.session.kullaniciMail;
    await next();
}  