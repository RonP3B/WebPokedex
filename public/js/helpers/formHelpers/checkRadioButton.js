export const checkRadioButton = (container) => {
  if ($(`.${container} input[name="value"]:checked`).length !== 1) {
    return false;
  }

  return true;
};
