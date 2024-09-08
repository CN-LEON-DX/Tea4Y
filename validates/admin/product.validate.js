module.exports.createProduct = async (req, res, next) => {
  if (!req.body.name) {
    req.flash("error", "Please enter a name");
    res.redirect("back");
    return;
  }

  if (req.body.price <= 0) {
    req.flash("error", "Please enter a price");
    res.redirect("back");
    return;
  }
  if (req.body.stock <= 0) {
    req.flash("error", "Please enter a stock");
    res.redirect("back");
    return;
  }
  next();
};
