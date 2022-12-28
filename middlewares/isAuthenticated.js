const isAuthenticated = (req, res, next) => {
  if (req.session.isAuthenticated) {
    req.flash("msg", "Ya estas autenticado");
    return res.redirect("/pokemon");
  }

  next();
};

module.exports = isAuthenticated;