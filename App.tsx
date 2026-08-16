import React from "react";

import AppNavigator from "./navigation/AppNavigator";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

export default function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <AppNavigator />
      </CartProvider>
    </WishlistProvider>
  );
}