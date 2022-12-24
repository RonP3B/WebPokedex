export const highlightFields = (container) => {
  $(`.${container} .required-field`).each(function () {
    if ($(this).val().isEmpty()) $(this).addClass("is-invalid");
    else $(this).removeClass("is-invalid");
  });
};
