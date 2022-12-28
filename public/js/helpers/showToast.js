export const showToast = (toastMsg) => {
  Toastify({
    text: toastMsg,
    duration: 3000,
    style: {
      background: "linear-gradient(to right, black, red)",
      fontSize: "1.05rem"
    },
  }).showToast();
};