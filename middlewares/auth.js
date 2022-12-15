module.exports = (req, res, next) => {
    if(!req.session.isAuth) {
        return res.redirect("/giris/login?returnUrl=" + req.originalUrl); // => /admin/blogs
    }
    next();
}