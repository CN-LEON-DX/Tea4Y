const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const imageInput = document.querySelector("[upload-image-input]");
  const imagePreview = document.querySelector("[upload-image-preview]");

  uploadImage.addEventListener("change", (e) => {
    const [file] = imageInput.files;
    if (file) {
      imagePreview.src = URL.createObjectURL(file);
      imagePreview.classList.remove("hidden");
    }
  });
}

// validate form
// alert message
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


