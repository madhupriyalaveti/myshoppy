import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Product } from "../types/Product";
import { RootStackParamList } from "../types/Navigation";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Main"
>;

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const navigation = useNavigation<NavigationProp>();

  const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    getQuantity,
  } = useCart();

  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  const quantity = getQuantity(product.id);

  const favourite = isInWishlist(product.id);

  const price = Math.round(product.price * 85);
  const oldPrice = Math.round(price * 1.2);

  const formattedPrice = new Intl.NumberFormat(
    "en-IN"
  ).format(price);

  const formattedOldPrice =
    new Intl.NumberFormat("en-IN").format(
      oldPrice
    );

  // Rating
  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating - fullStars >= 0.5;

  const stars =
    "★".repeat(fullStars) +
    (hasHalfStar ? "☆" : "") +
    "☆".repeat(
      5 - fullStars - (hasHalfStar ? 1 : 0)
    );

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() =>
        navigation.navigate("Product", {
          product,
        })
      }
    >
      {/* Discount */}

      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>
          {Math.round(product.discountPercentage)}%
          OFF
        </Text>
      </View>

      {/* Wishlist */}

      <TouchableOpacity
        style={styles.wishlistButton}
        onPress={() => toggleWishlist(product)}
      >
        <Text style={styles.wishlistIcon}>
          {favourite ? "❤️" : "🤍"}
        </Text>
      </TouchableOpacity>

      {/* Image */}

      <Image
        source={{ uri: product.thumbnail }}
        style={styles.image}
      />

      {/* Title */}

      <Text
        numberOfLines={2}
        style={styles.title}
      >
        {product.title}
      </Text>

      {/* Category */}

      <Text style={styles.category}>
        {product.category}
      </Text>

      {/* Rating */}

      <Text style={styles.rating}>
        {stars} {product.rating.toFixed(1)}
      </Text>

      {/* Stock */}

      <Text style={styles.stock}>
        {product.stock === 0
          ? "❌ Out of Stock"
          : product.stock <= 20
          ? `🔥 Only ${product.stock} left`
          : "✔ In Stock"}
      </Text>

      {/* Price */}

      <View style={styles.priceRow}>
        <Text style={styles.price}>
          ₹{formattedPrice}
        </Text>

        <Text style={styles.oldPrice}>
          ₹{formattedOldPrice}
        </Text>
      </View>

      {/* Cart */}

      {quantity === 0 ? (
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => addToCart(product)}
        >
          <Text style={styles.cartButtonText}>
            Add To Cart
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() =>
              decreaseQuantity(product.id)
            }
          >
            <Text style={styles.qtyText}>−</Text>
          </TouchableOpacity>

          <Text style={styles.quantity}>
            {quantity}
          </Text>

          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() =>
              increaseQuantity(product.id)
            }
          >
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 14,
    marginBottom: 18,
    elevation: 6,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    position: "relative",
  },

  discountBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#E53935",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    zIndex: 2,
  },

  discountText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 11,
  },

  wishlistButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    zIndex: 3,
  },

  wishlistIcon: {
    fontSize: 20,
  },

  image: {
    width: "100%",
    height: 170,
    resizeMode: "contain",
    marginTop: 20,
    marginBottom: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    minHeight: 44,
  },

  category: {
    color: "#777",
    fontSize: 13,
    marginTop: 4,
    marginBottom: 6,
    textTransform: "capitalize",
  },

  rating: {
    color: "#FF9800",
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 4,
  },

  stock: {
    color: "#2E7D32",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E7D32",
  },

  oldPrice: {
    marginLeft: 8,
    fontSize: 14,
    color: "#999",
    textDecorationLine: "line-through",
  },

  cartButton: {
    backgroundColor: "#2E7D32",
    borderRadius: 12,
    paddingVertical: 11,
    alignItems: "center",
  },

  cartButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },

  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  qtyButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#2E7D32",
    justifyContent: "center",
    alignItems: "center",
  },

  qtyText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22,
  },

  quantity: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
});