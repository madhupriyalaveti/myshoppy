import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import {
  useNavigation,
  useRoute,
  RouteProp,
} from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { RootStackParamList } from "../types/Navigation";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

type ProductRouteProp = RouteProp<
  RootStackParamList,
  "Product"
>;

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export default function ProductScreen() {
  const navigation =
    useNavigation<NavigationProp>();

  const route =
    useRoute<ProductRouteProp>();

  const { product } = route.params;

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

  // Convert USD to INR
  const price = Math.round(product.price * 85);

  // Calculate original price
  const oldPrice = Math.round(
    price /
      (1 -
        product.discountPercentage /
          100)
  );

  // Indian Currency Format
  const formatPrice = (
    value: number
  ) =>
    new Intl.NumberFormat(
      "en-IN"
    ).format(value);

  // Category Mapping
  const getCategoryName = () => {
    switch (product.category) {
      case "smartphones":
      case "laptops":
      case "tablets":
      case "mobile-accessories":
        return "Electronics";

      case "kitchen-accessories":
        return "Kitchen";

      case "mens-shirts":
      case "mens-shoes":
      case "tops":
      case "womens-dresses":
      case "womens-shoes":
      case "womens-bags":
      case "womens-jewellery":
        return "Clothing";

      case "beauty":
      case "fragrances":
      case "skin-care":
        return "Beauty";

      default:
        return product.category;
    }
  };

return (
  <View style={styles.container}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {/* Header */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color="#222"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {product.brand}
        </Text>

        <View style={styles.rightSpacer} />
      </View>

      {/* Product Image */}

      <View style={styles.imageCard}>
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.image}
        />
      </View>

      {/* Product Name */}

      <Text style={styles.title}>
        {product.title}
      </Text>

      {/* Brand */}

      <Text style={styles.brand}>
        {product.brand}
      </Text>

      {/* Rating & Stock */}

      <View style={styles.infoRow}>
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>
            ⭐ {product.rating}
          </Text>
        </View>

        <View style={styles.stockBadge}>
          <Text style={styles.stockText}>
            ✔ In Stock
          </Text>
        </View>
      </View>

      <Text style={styles.stockCount}>
        {product.stock} items available
      </Text>

      {/* Price */}

      <View style={styles.priceContainer}>
        <Text style={styles.price}>
          ₹{formatPrice(price)}
        </Text>

        <Text style={styles.oldPrice}>
          ₹{formatPrice(oldPrice)}
        </Text>

        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>
            {Math.round(
              product.discountPercentage
            )}
            % OFF
          </Text>
        </View>
      </View>

      {/* Category */}

      <Text style={styles.category}>
        Category : {getCategoryName()}
      </Text>

      {/* Description */}

      <Text style={styles.sectionTitle}>
        Description
      </Text>

      <Text style={styles.description}>
        {product.description}
      </Text>

      {/* Bottom Space */}

      <View style={{ height: 120 }} />
    </ScrollView>

    {/* Bottom Action Bar */}

    <View style={styles.bottomBar}>
      <TouchableOpacity
        style={styles.wishlistButton}
        onPress={() =>
          toggleWishlist(product)
        }
      >
        <Ionicons
          name={
            favourite
              ? "heart"
              : "heart-outline"
          }
          size={20}
          color="#E53935"
        />

        <Text
          style={styles.wishlistText}
          numberOfLines={1}
        >
          {favourite
            ? "Saved"
            : "Wishlist"}
        </Text>
      </TouchableOpacity>

      {quantity === 0 ? (
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() =>
            addToCart(product)
          }
        >
          <Ionicons
            name="cart-outline"
            size={20}
            color="#fff"
          />

          <Text
            style={styles.cartText}
            numberOfLines={1}
          >
            Add to Cart
          </Text>
        </TouchableOpacity>
      ) : (
        <View
          style={
            styles.quantityContainer
          }
        >
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() =>
              decreaseQuantity(
                product.id
              )
            }
          >
            <Text
              style={styles.qtyText}
            >
              −
            </Text>
          </TouchableOpacity>

          <Text
            style={styles.quantity}
          >
            {quantity}
          </Text>

          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() =>
              increaseQuantity(
                product.id
              )
            }
          >
            <Text
              style={styles.qtyText}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  </View>
);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  content: {
    padding: 20,
    paddingBottom: 0,
  },

  /* Header */

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",

    elevation: 4,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },

  rightSpacer: {
    width: 44,
  },

  /* Image */

  imageCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    marginBottom: 25,

    elevation: 4,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  image: {
    width: "100%",
    height: 260,
    resizeMode: "contain",
  },

  /* Product */

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
  },

  brand: {
    fontSize: 17,
    color: "#666",
    marginBottom: 18,
  },

  /* Rating & Stock */

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  ratingBadge: {
    backgroundColor: "#FFF3CD",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    marginRight: 12,
  },

  ratingText: {
    color: "#FF9800",
    fontWeight: "bold",
    fontSize: 15,
  },

  stockBadge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  stockText: {
    color: "#2E7D32",
    fontWeight: "bold",
    fontSize: 15,
  },

  stockCount: {
    fontSize: 15,
    color: "#666",
    marginBottom: 20,
  },

  /* Price */

  priceContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 20,
  },

  price: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2E7D32",
    marginRight: 12,
  },

  oldPrice: {
    fontSize: 18,
    color: "#888",
    textDecorationLine: "line-through",
    marginRight: 12,
  },

  discountBadge: {
    backgroundColor: "#E53935",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  discountText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },

  /* Category */

  category: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 12,
  },

  description: {
    fontSize: 16,
    lineHeight: 28,
    color: "#555",
    marginBottom: 10,
  },

  /* Bottom Bar */

  bottomBar: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#fff",

    paddingHorizontal: 15,
    paddingVertical: 15,

    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,

    elevation: 12,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: -2,
    },
  },

  /* Wishlist */

  wishlistButton: {
    flex: 1,
    marginRight: 8,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#FDECEC",

    borderRadius: 12,

    paddingVertical: 15,
  },

  wishlistText: {
    marginLeft: 6,
    color: "#E53935",
    fontWeight: "bold",
    fontSize: 15,
  },

  /* Cart */

  cartButton: {
    flex: 1.6,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#2E7D32",

    borderRadius: 12,

    paddingVertical: 15,
  },

  cartText: {
    marginLeft: 6,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  /* Quantity */

  quantityContainer: {
    flex: 1.6,
    marginLeft: 8,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "#2E7D32",

    borderRadius: 12,

    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  qtyButton: {
    width: 38,
    height: 38,
    borderRadius: 19,

    backgroundColor: "#fff",

    justifyContent: "center",
    alignItems: "center",
  },

  qtyText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32",
  },

  quantity: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
