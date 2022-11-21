const logos = require("../../svgLogos/logos");

const internalErrorRes = (res) => {
  return res.status(500).render("error", {
    errorMsg: "Ha ocurrido un error interno en el servidor",
    errorLogo: logos.LogoInternalError,
  });
};

module.exports = internalErrorRes;
