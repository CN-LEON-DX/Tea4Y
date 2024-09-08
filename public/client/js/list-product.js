// iterate all image and title product add click event and direct to detail page
const productImgItems = document.querySelectorAll("[imageProduct]");
if (productImgItems) {
  for (const productItem of productImgItems) {
    productItem.addEventListener("click", () => {
      const productSLug = productItem.getAttribute("data-slug");
      window.location.href = `/products/${productSLug}`;
    });
  }
}
const productTitleItems = document.querySelectorAll("[titleProduct]");
if (productTitleItems) {
  for (const productItem of productTitleItems) {
    productItem.addEventListener("click", () => {
      const productSlug = productItem.getAttribute("data-slug");
      window.location.href = `/products/${productSlug}`;
    });
  }
}
