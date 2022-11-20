const hideCollapsed = (...classes) => {
  for (const currClass of classes)
    if (!$(`.${currClass}:hidden`).length) $(`.${currClass}`).hide();
};

const toggleCollapse = (elementClass) => {
  if ($(`.${elementClass}:hidden`).length) $(`.${elementClass}`).slideDown();
  else $(`.${elementClass}`).slideUp();
};

export const collapseElement = (elementToToggle, ...elementsToHide) => {
  hideCollapsed(...elementsToHide);
  toggleCollapse(elementToToggle);
};
