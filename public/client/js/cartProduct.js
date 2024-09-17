const btnIncrease = document.querySelectorAll("[data-action='increase']");
const btnDecrease = document.querySelectorAll("[data-action='decrease']");

btnDecrease.forEach((button) => {
  button.addEventListener("click", () => {
    const index = button.getAttribute("data-index");
    const spanQuantity = document.querySelector(
      `span[data-quantity="${index}"]`
    );
    let currentQuantity = parseInt(spanQuantity.innerHTML, 10);
    if (currentQuantity > 1) {
      // Prevent going below 1
      spanQuantity.innerHTML = currentQuantity - 1;
    }
  });
});

btnIncrease.forEach((button) => {
  button.addEventListener("click", () => {
    const index = button.getAttribute("data-index");
    const spanQuantity = document.querySelector(
      `span[data-quantity="${index}"]`
    );
    let currentQuantity = parseInt(spanQuantity.innerHTML, 10);
    spanQuantity.innerHTML = currentQuantity + 1;
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
      const quantity = parseInt(item.innerHTML);
      mapProducts.push({ productID: productID, quantity: quantity });
    });
    console.log(mapProducts);
    
    const form = document.createElement('form');
    form.action = '/cart/update-quantities';
    form.method = 'POST';
    form.body = mapProducts;
    form.submit();


    fetch('/cart/update-quantities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mapProducts), 
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      window.location.reload(); 
    })
    .catch((error) => {
      console.error('Error:', error);
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
