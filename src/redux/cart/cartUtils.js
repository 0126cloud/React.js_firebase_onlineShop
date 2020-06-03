export const addItemToCart = (cartItems, itemToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === itemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === itemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...itemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, removedItem) => {
  const removedTarget = cartItems.find(
    cartItem => cartItem.id === removedItem.id
  );

  if (removedTarget.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== removedItem.id);
  }

  return cartItems.map(cartItem =>
    cartItem.id === removedItem.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

