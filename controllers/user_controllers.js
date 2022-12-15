const config = require("../config/config.js");
const kahve = require("../models/kahve.js");
const kategori = require("../models/kategori.js");

const anasayfa_get=async function(req, res) {
    try {
        return res.render("user/index.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}
const about_get=async function(req, res) {
    try {
        return res.render("user/about.ejs", {
        });
    }
    catch(err) {
        console.log(err);
    }
}
const menu_details = async function(req, res) {
    const slug = req.params.slug;
    try {
        const kahveAra = await kahve.findOne({
            where: {
                kahve_id: slug
            }
        });

        if(kahveAra) {
            return res.render("user/kahve-detay", {
                title: kahveAra.kahveAdi,
                kahve: kahveAra
            });
        }
        res.redirect("/menu");
    }
    catch(err) {
        console.log(err);
    }
}

const menu_list=async function(req, res) {
    const slug = req.params.slug;
    console.log(slug);
    try {
        const kahveAra = await kahve.findAll({
            where: {
                kategori_id: slug
            }
        });

        console.log(kahveAra);
        console.log(typeof(kahveAra));
        // const { rows, count } = await kahve.findAndCountAll({ 
        //     raw: true,
        //     include: slug ? { model: kategori, where: { url: slug } } : null,
        //     limit: size,
        //     offset: page * size 
        // });

        const kategoriler = await kategori.findAll({ raw: true });

        return res.render("user/menu", {
            kahveAra:kahveAra,
            kategoriler:kategoriler,
            selectedCategory: slug,
        })
    }
    catch(err) {
        console.log(err);
    }
}



const menu_get=async function(req, res) {
    const kategoriler=await kategori.findAll();
    const kahveAra=await kahve.findAll();
    try {
        return res.render("user/menu.ejs", {
            kahveAra:kahveAra,
            kategoriler:kategoriler,
            selectedCategory: null
        });
    }
    catch(err) {
        console.log(err);
    }
}

module.exports={
    anasayfa_get,
    menu_get,
    menu_list,
    menu_details,
    about_get
}