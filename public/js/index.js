"use strict";

import { collapseElement } from "./helpers/collapse.js";
import {
  validateForm,
  checkRequiredFields,
  checkRadioButton,
  validateSignUp,
  validateResetPassword
} from "./helpers/formHelpers/index.js";


$(() => {
  //--------------------------------Protos------------------------------------
  String.prototype.isEmpty = function () {
    return this === null || this === undefined || this.trim().length === 0;
  };

  //--------------------------------Events------------------------------------
  $("#btn-navMenu").click(() => collapseElement("collapseMenu"));

  $("#btn-search").click(() =>
    collapseElement("collapseSearch", "collapseFilter")
  );

  $("#btn-filter").click(() =>
    collapseElement("collapseFilter", "collapseSearch")
  );

  $("#btn-signup").click(() => validateForm(
    "main__card__body__form",
    validateSignUp,
  ));

  $("#btn-reset").click(() => validateForm(
    "main__card__body__form",
    validateResetPassword,
  ));

  $("#btn-submitSearch").click(() =>
    validateForm(
      "main__search",
      checkRequiredFields,
      "Debes ingresar el nombre de un pokemon"
    )
  );

  $("#btn-submitFilter").click(() =>
    validateForm(
      "main__filter",
      checkRadioButton,
      "Debes seleccionar una región"
    )
  );

  $("#btn-save").click(() =>
    validateForm(
      "main__card__body__form",
      checkRequiredFields,
      "Debes completar todos los campos"
    )
  );
});
