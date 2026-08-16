import { Product } from "./Product";

export type RootStackParamList = {
  Main: undefined;

  Product: {
    product: Product;
  };

  Wishlist: undefined;

  Cart: undefined;

  Profile: undefined;

  Checkout: undefined;

  Success: undefined;
};
