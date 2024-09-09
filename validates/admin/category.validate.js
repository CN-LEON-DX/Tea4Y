module.exports.createCategory = async (req, res, next) => {
    if (!req.body.name) {
      req.flash("error", "Please enter a name");
      res.redirect("back");
      return;
    }
    next();
  };
  