export const highlightFields = (container) => {
  $(`.${container} .required-field`).each(function () {
    if ($(this).val().isEmpty()) $(this).addClass("border-danger");
    else $(this).removeClass("border-danger");
  });
};
