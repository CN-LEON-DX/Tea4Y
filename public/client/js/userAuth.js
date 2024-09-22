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

const togglePasswordButton = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.getElementById("eyeIcon");

  togglePasswordButton.addEventListener("click", function () {
    // Toggle the input type
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    
    // Toggle the eye icon classes
    eyeIcon.classList.toggle("fa-eye");
    eyeIcon.classList.toggle("fa-eye-slash");
  });