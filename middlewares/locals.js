const locals = (req, res, next) => {
  const messages = req.flash("msg");

  res.locals.messages = messages;
  res.locals.hasMessages = messages.length > 0;

  next();
};

module.exports = locals;