exports.getNotFound = (req, res, next) => {
  res.status(404).render("notFound");
};
