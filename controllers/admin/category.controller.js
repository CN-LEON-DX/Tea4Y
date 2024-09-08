// [GET] /admin/category

module.exports.index = (req, res)=> {
    res.render("admin/pages/category/index", {
        pageTitle: "Category",
    });
}