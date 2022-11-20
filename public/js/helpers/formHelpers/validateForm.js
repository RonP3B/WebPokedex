import { highlightFields } from "./index.js";

export const validateForm = (form, checkFunction, toastMsg) => {
  if (checkFunction(form)) {
    $(`.${form}`).submit();
  } else {
    highlightFields(form);
    Toastify({
      text: toastMsg,
      duration: 3000,
      style: {
        background: "linear-gradient(to right, black, red)",
      },
    }).showToast();
  }
};
