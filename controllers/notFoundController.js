const logos = require("../util/svgLogos/logos");

exports.getNotFound = (req, res, next) => {
  res
    .status(404)
    .render("error", {
      errorMsg: "Página no encontrada",
      errorLogo: logos.Logo404,
    });
};
