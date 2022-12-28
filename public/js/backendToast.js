const showBackendToast = (msg) => {
  Toastify({
    text: msg,
    duration: 4500,
    style: {
      background: "linear-gradient(to right, black, red)",
      fontSize: "1.05rem"
    },
  }).showToast();
}