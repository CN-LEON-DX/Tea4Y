module.exports.getSortOption = (sortSelection) => {
    if (sortSelection) {
      const [sortField, sortOrder] = sortSelection.split("-");
      return { [sortField]: sortOrder === "asc" ? 1 : -1 };
    } else {
      return { position: -1 }; 
    }
  };