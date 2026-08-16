import { Product } from "../types/Product";

const BASE_URL = "https://dummyjson.com";

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${BASE_URL}/products?limit=200`);
    const data = await response.json();

    return data.products;
  } catch (error) {
    console.log("Error fetching products:", error);
    return [];
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${BASE_URL}/products/category-list`);
    const data = await response.json();

    return ["All", ...data];
  } catch (error) {
    console.log("Error fetching categories:", error);
    return ["All"];
  }
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  if (category === "All") {
    return getProducts();
  }

  try {
    const response = await fetch(
      `${BASE_URL}/products/category/${category}`
    );

    const data = await response.json();

    return data.products;
  } catch (error) {
    console.log(error);
    return [];
  }
}