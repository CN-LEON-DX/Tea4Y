const imageInput = document.querySelector("[upload-image-input]");
const imagePreview = document.querySelector("[upload-image-preview]");

if (imageInput) {
  imageInput.addEventListener("change", (e) => {
    const [file] = imageInput.files;
    if (file) {
      imagePreview.src = URL.createObjectURL(file);
      imagePreview.style.display = 'block'; // Make sure to show the preview
    }
  });
}
