const btnIncrease = document.querySelectorAll("[data-action='increase']");
const btnDecrease = document.querySelectorAll("[data-action='decrease']");

btnDecrease.forEach((button) => {
  button.addEventListener("click", () => {
    const index = button.getAttribute("data-index");
    const inputQuantity = document.querySelector(
      `input[data-quantity="${index}"]`
    );
    let currentQuantity = parseInt(inputQuantity.value, 10);
    if (currentQuantity > 1) {
      // Prevent going below 1
      inputQuantity.value = currentQuantity - 1;
    }
  });
});

btnIncrease.forEach((button) => {
  button.addEventListener("click", () => {
    const index = button.getAttribute("data-index");
    const inputQuantity = document.querySelector(
      `input[data-quantity="${index}"]`
    );
    let currentQuantity = parseInt(inputQuantity.value, 10);
    inputQuantity.value = currentQuantity + 1;
  });
});

const btnUpdateQuantity = document.querySelector("[btnUpdateQuantity]");
if (btnUpdateQuantity) {
  btnUpdateQuantity.addEventListener("click", (event) => {
    event.preventDefault();

    const mapProducts = [];
    const arrayQuantity = document.querySelectorAll("[data-quantity]");

    arrayQuantity.forEach((item) => {
      const productID = item.getAttribute("product-id");
      const quantity = parseInt(item.value);
      mapProducts.push({ productID: productID, quantity: quantity });
    });

    fetch("/cart/update-quantities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products: mapProducts }),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
}

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

const btnBackForward = document.querySelector("[btnBackForward]");
if (btnBackForward) {
  btnBackForward.addEventListener("click", () => {
    history.back();
  });
}
