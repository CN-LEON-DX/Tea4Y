const tablePermissions = document.querySelector("[table-permission]");

console.log(tablePermissions);
if (tablePermissions) {
  const btnSubmit = document.querySelector("[btn-submit]");

  btnSubmit.addEventListener("click", () => {
    const permissions = [];
    const rows = tablePermissions.querySelectorAll("[data-name]");

    rows.forEach((row) => {
      const name = row.getAttribute("data-name");
      const inputs = row.querySelectorAll("input");

      if (name === "id") {
        // Tạo đối tượng cho mỗi id và thêm vào permissions
        inputs.forEach((input) => {
          const id = input.value;
          permissions.push({
            id: id,
            permissions: [],
          });
        });
      } else {
        inputs.forEach((input, index) => {
          const checked = input.checked;
          if (checked) {
            permissions[index].permissions.push(name);
          }
        });
      }
    });
    if (permissions.length > 0) {
      const formPermissions = document.getElementById("form-change-permission");
      console.log(formPermissions);
      const inputPermissions = document.getElementById(
        "input-change-persmission"
      );

      inputPermissions.value = JSON.stringify(permissions);
      formPermissions.submit();
    }
  });
}

// display the permission of each role
const dataRecords = document.querySelector("[data-records]");

if (dataRecords) {
  const records = JSON.parse(dataRecords.getAttribute("data-records"));

  const tablePermissions = document.querySelector("[table-permission]");
  
  records.forEach((record, index) => {
    const permission = record.permissions;
    permission.forEach((per) => {
      const row = tablePermissions.querySelector(`[data-name="${per}"]`);
      const input = row.querySelectorAll("input")[index];
      input.checked = true;
    });  const rows = tablePermissions.querySelectorAll("[data-name]");

  });
}