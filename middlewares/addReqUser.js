const User = require("../models/User");
const internalErrorRes = require("../util/helpers/res/internalErrorRes");;

const addReqUser = async (req, res, next) => {
  if (req.session) {
    try {
      const username = req.session.user;

      const userObj = username
        ? await User.findOne({ where: { username } })
        : null;

      req.user = userObj ? userObj.dataValues : null;
    } catch (error) {
      console.log(`\n*****Error*****\n${error}\n`);
      internalErrorRes(res);
    }
  }

  next();
};

module.exports = addReqUser;