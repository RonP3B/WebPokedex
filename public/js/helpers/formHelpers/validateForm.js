import { showToast } from "../showToast.js";
import { highlightFields } from "./index.js";

export const validateForm = (form, checkFunction, toastMsg = null) => {
  if (checkFunction(form)) {
    $(`.${form}`).submit();
  } else {
    highlightFields(form);
    if (toastMsg) showToast(toastMsg);
  }
};
