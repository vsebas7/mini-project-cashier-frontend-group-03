export function getProductFromLocalStorage() {
    const productExists = JSON.parse(localStorage.getItem('products')) || [];
    return productExists;
  }
  