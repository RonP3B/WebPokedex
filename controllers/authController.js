const internalErrorRes = require("../util/helpers/res/internalErrorRes");
const emailRegex = require("../util/emailRegex");
const transporter = require("../util/transporter");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

exports.getLogin = (req, res, next) => res.render("auth/login");

exports.getSignup = (req, res, next) => res.render("auth/signup");

exports.getFindUser = (req, res, next) => {
  res.render("auth/forgotPassword", { findUser: true })
}

exports.getConfirmCode = (req, res, next) => {
  if (!req.session.userRecovery) {
    req.flash("msg", "No tienes acceso a este sección");
    return res.redirect("back");
  }

  res.render("auth/forgotPassword", { confirmCode: true })
}

exports.getResetPassword = (req, res, next) => {
  if (!req.session.userRecovery) {
    req.flash("msg", "No tienes acceso a este sección");
    return res.redirect("back");
  }

  res.render("auth/forgotPassword", { resetPass: true });
}

exports.getLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) console.log(`Session destroy error: ${err}`);
    else res.redirect("/");
  });
};

exports.postFindUser = async (req, res, next) => {
  try {
    const username = req.body.username;

    if (!username) return res.redirect("back");

    const user = await User.findOne({ where: { username: username.toLowerCase() } });

    if (!user) {
      req.flash("msg", "No existe una cuenta con ese usuario");
      return res.redirect("back");
    }

    const confirmCode = crypto.randomBytes(7).toString('hex');

    req.session.confirmCode = confirmCode;
    req.session.userRecovery = user;

    transporter.sendMail(
      {
        from: "Pokedex",
        to: user.email,
        subject: "Confirm code",
        html: `Here is your code: <strong>${confirmCode}<strong>`,
      },
      (err) => {
        if (err) console.log(`Error: ${err}`);
      }
    );

    req.flash("msg", "Recibiste el código en tu correo");
    res.redirect("/forgot-password/confirm-code");
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
}

exports.postConfirmCode = (req, res, next) => {
  if (!req.body.code) return res.redirect("back")

  if (req.session.confirmCode !== req.body.code) {
    req.flash("msg", "El código ingresado es invalido");
    return res.redirect("back");
  }

  delete req.session.confirmCode;
  res.redirect("/forgot-password/reset-password")
}

exports.postResetPassword = async (req, res, next) => {
  try {
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      req.flash("msg", "Las contraseñas son diferentes");
      return res.redirect("back");
    }

    const user = await User.findByPk(req.session.userRecovery.id);
    const securedPassword = await bcrypt.hash(password, 12);

    await user.update({ password: securedPassword });

    req.flash("msg", "Tu contraseña fue cambiada con exito");
    delete req.session.userRecovery;
    res.redirect("/");
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
}

exports.postLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) return res.redirect("/");

    const user = await User.findOne({ where: { username: username.toLowerCase() } });

    if (!user) {
      req.flash("msg", "Nombre de usuario invalido");
      return res.redirect("/");
    }

    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) {
      req.flash("msg", "Contraseña incorrecta");
      console.log("INCORREWCT PASS")
      return res.redirect("/");
    }

    req.session.isAuthenticated = true;
    req.session.user = username;

    req.session.save((err) => {
      if (err) console.log(`session save error: ${err}`);
      req.flash("msg", `Hola ${user.username}, bienvenido a la pokedex =)`);
      return res.redirect("/pokemon");
    });

  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
}

exports.postSignup = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.redirect("/sign-up");
    }

    if (!emailRegex.test(email)) {
      req.flash("msg", "Correo electronico invalido");
      return res.redirect("/sign-up");
    }

    if (password.length < 6) {
      req.flash("msg", "La contraseña debe tener mas de 6 caracteres");
      return res.redirect("/sign-up");
    }

    if (password !== confirmPassword) {
      req.flash("msg", "Las contraseñas son diferentes");
      return res.redirect("/sign-up");
    }

    const objUser = await User.findOne({ where: { username } });

    if (objUser) {
      req.flash("msg", "El nombre de usuario dado ya existe");
      return res.redirect("/sign-up");
    }

    const securedPassword = await bcrypt.hash(password, 12);

    await User.create({
      id: crypto.randomUUID(),
      username: username.toLowerCase(),
      email,
      password: securedPassword
    });

    req.flash("msg", "Cuenta creada con exito");
    res.redirect("/");
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
}