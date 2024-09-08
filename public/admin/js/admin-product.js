document.addEventListener("DOMContentLoaded", () => {
  const editButtons = document.querySelectorAll(".edit-btn");
  const modal = document.getElementById("editModal");
  const closeModalButtons = document.querySelectorAll(".close-modal-btn");
  const saveChangesBtn = document.getElementById("saveChangesBtn");

  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      const title = button.getAttribute("data-title");
      const price = button.getAttribute("data-price");
      const status = button.getAttribute("data-status");

      document.getElementById("productId").value = id;
      document.getElementById("productTitle").value = title;
      document.getElementById("productPrice").value = price;
      document.getElementById("productStatus").value = status;

      modal.classList.remove("hidden");
    });
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  });

  saveChangesBtn.addEventListener("click", (event) => {
    const id = document.getElementById("productId").value;
    const title = document.getElementById("productTitle").value;
    const price = document.getElementById("productPrice").value;
    const status = document.getElementById("productStatus").value;

    editForm.action = `/admin/products/edit/${encodeURIComponent(
      id
    )}/${encodeURIComponent(title)}/${encodeURIComponent(
      price
    )}/${encodeURIComponent(status)}?_method=PATCH`;

    editForm.submit();
  });
});

const deleteButtons = document.querySelectorAll("[btn-delete]");
if (deleteButtons) {
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();

      const isConfirmed = confirm(
        "Are you sure you want to delete this product?"
      );
      if (isConfirmed) {
        const id = button.getAttribute("data-id");
        const form = document.createElement("form");
        form.method = "POST";
        form.action = `/admin/products/delete/${id}?_method=DELETE`;

        document.body.appendChild(form);
        form.submit();
      }
    });
  });
}

const multiSelectToggle = document.getElementById("multiSelectToggle");
const selectColumns = document.querySelectorAll(".select-column");
const btnDelete = document.getElementById("btn-delete-mul");
const btnChangePosition = document.getElementById("btn-change-position");
const checkboxes = document.querySelectorAll(".select-checkbox");

multiSelectToggle.addEventListener("click", () => {
  selectColumns.forEach((column) => column.classList.toggle("hidden"));
});

btnDelete.addEventListener("click", () => {
  const isConfirmed = confirm("Are you sure you want to delete this product?");
  if (isConfirmed) {
    const selectedProducts = Array.from(checkboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    if (selectedProducts.length === 0) {
      alert("Please select at least one product to delete.");
      return;
    }

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "/admin/products/delete-multiple?_method=DELETE";

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "ids";
    input.value = JSON.stringify(selectedProducts);

    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
  }
});

btnChangePosition.addEventListener("click", () => {
  const selectedProducts = Array.from(
    document.querySelectorAll(".select-checkbox")
  )
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => ({
      id: checkbox.value,
      position: checkbox.closest("tr").querySelector(".position-input").value,
    }));

  for (const product of selectedProducts) {
    const position = product.position;

    // Check if position is a valid non-negative integer
    if (!Number.isInteger(Number(position)) || Number(position) < 0) {
      alert(
        `Invalid position value for product ID ${product.position}. Please enter a non-negative integer.`
      );
      return;
    }
  }

  if (selectedProducts.length === 0) {
    alert("Please select at least one product to change.");
    return;
  }

  const form = document.createElement("form");
  form.method = "POST";
  form.action = "/admin/products/change-position?_method=PATCH";

  const input = document.createElement("input");
  input.type = "hidden";
  input.name = "products";
  input.value = JSON.stringify(selectedProducts);

  form.appendChild(input);
  document.body.appendChild(form);
  form.submit();
});

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
