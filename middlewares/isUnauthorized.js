const isUnauthorized = (req, res, next) => {
  if (!req.session.isAuthenticated) {
    req.flash("msg", "Necesitas autenticarte primero");
    return res.redirect("/");
  }

  next();
};

module.exports = isUnauthorized;