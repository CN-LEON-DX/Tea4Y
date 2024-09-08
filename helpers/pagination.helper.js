module.exports.getPagination = (currentPage, totalProducts) => {
    const limitItems = 5;
    currentPage = parseInt(currentPage) || 1;
  
    const totalPages = Math.ceil(totalProducts / limitItems);
  
    currentPage = Math.max(1, Math.min(currentPage, totalPages)); // Ensures currentPage is within valid range
  
    return {
      limitItems,
      currentPage,
      totalPages,
      pages: Array.from({ length: totalPages }, (_, index) => index + 1),
    };
  };