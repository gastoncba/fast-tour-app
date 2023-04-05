export const StorageService = (() => {
  const saveCart = (cart: any) => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  };
  const getCart = () => {
    const cart = sessionStorage.getItem("cart");
    if (cart) {
      return JSON.parse(cart);
    }
  };

  const delCart = () => {
    sessionStorage.removeItem("cart");
  };

  const hasCart = () => {
    if (sessionStorage.getItem("cart")) return true;
    return false;
  };

  return { saveCart, getCart, delCart, hasCart };
})();
