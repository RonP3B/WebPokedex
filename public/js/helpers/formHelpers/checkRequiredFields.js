export const checkRequiredFields = (container) => {
  let res = true;

  $(`.${container} .required-field`).each(function () {
    if ($(this).val().isEmpty()) {
      res = false;
      return false;
    }
  });

  return res;
};
