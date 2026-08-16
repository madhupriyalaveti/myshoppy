import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import {
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../types/Navigation";

import ProductCard from "../components/ProductCard";
import { useWishlist } from "../context/WishlistContext";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Wishlist"
>;

export default function WishlistScreen() {
  const navigation = useNavigation<NavigationProp>();

  const { wishlist } = useWishlist();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        ❤️ My Wishlist
      </Text>

      {wishlist.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>
            💔
          </Text>

          <Text style={styles.emptyTitle}>
            Your Wishlist is Empty
          </Text>

          <Text style={styles.emptySubtitle}>
            Save your favourite products and
            they will appear here.
          </Text>

          <TouchableOpacity
            style={styles.shopButton}
            onPress={() =>
              navigation.navigate("Main")
            }
          >
            <Text style={styles.shopButtonText}>
              Start Shopping
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) =>
            item.id.toString()
          }
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              <ProductCard product={item} />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    paddingTop: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222",
    marginHorizontal: 16,
    marginBottom: 18,
  },

  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  row: {
    justifyContent: "space-between",
  },

  productContainer: {
    width: "48%",
    marginBottom: 16,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 12,
  },

  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },

  shopButton: {
    marginTop: 30,
    backgroundColor: "#2E7D32",
    paddingHorizontal: 35,
    paddingVertical: 15,
    borderRadius: 12,
  },

  shopButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
