document.addEventListener("DOMContentLoaded", function() {
    const submenus = document.querySelectorAll('.dropdown-submenu > a');
  
    submenus.forEach(function(submenu) {
      submenu.addEventListener("click", function(e) {
        e.preventDefault();
        const dropdownMenu = this.nextElementSibling;
        if (dropdownMenu) {
          dropdownMenu.classList.toggle('hidden');
        }
      });
    });
  });
  