const alertMessage = document.getElementById("alert-update");
if (alertMessage) {
  const totalTime = 3; // seconds
  setTimeout(() => {
    alertMessage.classList.add("hidden");
  }, totalTime * 1000);

  const btnCloseAlert = document.getElementById("btn-close-alert");
  btnCloseAlert.addEventListener("click", () => {
    alertMessage.classList.add("hidden");
  });
}
