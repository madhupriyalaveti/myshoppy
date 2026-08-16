import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../types/Navigation";
import { useCart } from "../context/CartContext";
import { Ionicons } from "@expo/vector-icons";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Cart"
>;

export default function CartScreen() {
  const navigation = useNavigation<NavigationProp>();

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getTotalPrice,
  } = useCart();

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons
          name="cart-outline"
          size={75}
          color="#2E7D32"
        />

        <Text style={styles.emptyTitle}>
          Your Cart is Empty
        </Text>

        <Text style={styles.emptySubtitle}>
          Add products to start shopping.
        </Text>

        <TouchableOpacity
          style={styles.shopButton}
          onPress={() => navigation.navigate("Main")}
        >
          <Text style={styles.shopButtonText}>
            Continue Shopping
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.product.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const price = Math.round(item.product.price * 85);
          const subtotal = price * item.quantity;

          return (
            <View style={styles.card}>
              <Image
                source={{ uri: item.product.thumbnail }}
                style={styles.image}
              />

              <View style={styles.info}>
                <Text
                  numberOfLines={2}
                  style={styles.name}
                >
                  {item.product.title}
                </Text>

                <Text style={styles.price}>
                  ₹{new Intl.NumberFormat("en-IN").format(price)}
                </Text>

                <Text style={styles.subtotal}>
                  Subtotal : ₹
                  {new Intl.NumberFormat("en-IN").format(subtotal)}
                </Text>

                <View style={styles.quantityRow}>
                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() =>
                      decreaseQuantity(item.product.id)
                    }
                  >
                    <Text style={styles.qtyText}>−</Text>
                  </TouchableOpacity>

                  <Text style={styles.quantity}>
                    {item.quantity}
                  </Text>

                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() =>
                      increaseQuantity(item.product.id)
                    }
                  >
                    <Text style={styles.qtyText}>+</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() =>
                    removeFromCart(item.product.id)
                  }
                >
                  <View style={styles.removeRow}>
                    <Text style={styles.removeIcon}>
                      🗑️
                    </Text>

                    <Text style={styles.remove}>
                      Remove Item
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      <View style={styles.footer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>
            Items Total
          </Text>

          <Text style={styles.summaryValue}>
            ₹
            {new Intl.NumberFormat("en-IN").format(
              getTotalPrice()
            )}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>
            Delivery
          </Text>

          <Text style={styles.freeDelivery}>
            FREE
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>
            Order Total
          </Text>

          <Text style={styles.total}>
            ₹
            {new Intl.NumberFormat("en-IN").format(
              getTotalPrice()
            )}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() =>
            navigation.navigate("Checkout")
          }
        >
          <Text style={styles.checkoutText}>
            Proceed to Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  list: {
    padding: 15,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  emptyIcon: {
    fontSize: 70,
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
  },

  emptySubtitle: {
    fontSize: 16,
    color: "#777",
    marginTop: 8,
    marginBottom: 30,
    textAlign: "center",
  },

  shopButton: {
    backgroundColor: "#2E7D32",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },

  shopButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 15,

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
    width: 95,
    height: 95,
    borderRadius: 10,
    resizeMode: "contain",
  },

  info: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "space-between",
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },

  price: {
    color: "#2E7D32",
    fontWeight: "bold",
    fontSize: 20,
  },

  subtotal: {
    color: "#666",
    marginTop: 3,
  },

  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  qtyButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#2E7D32",
    justifyContent: "center",
    alignItems: "center",
  },

  qtyText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  quantity: {
    marginHorizontal: 15,
    fontWeight: "bold",
    fontSize: 18,
  },

  remove: {
    color: "#E53935",
    fontWeight: "bold",
    marginTop: 12,
  },

  footer: {
    backgroundColor: "#fff",
    padding: 20,

    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    elevation: 10,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: -2,
    },
  },

  total: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2E7D32",
  },

  checkoutButton: {
    backgroundColor: "#2E7D32",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },

  checkoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  summaryLabel: {
    fontSize: 16,
    color: "#666",
  },

  summaryValue: {
    fontSize: 16,
    fontWeight: "600",
  },

  freeDelivery: {
    color: "#2E7D32",
    fontWeight: "bold",
  },

  totalLabel: {
    fontSize: 20,
    fontWeight: "bold",
  },
  removeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  removeIcon: {
    marginRight: 6,
    fontSize: 15,
  },
});