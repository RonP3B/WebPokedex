"use strict";

import { collapseElement } from "./helpers/collapse.js";

import {
  validateForm,
  checkRequiredFields,
  checkRadioButton,
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
