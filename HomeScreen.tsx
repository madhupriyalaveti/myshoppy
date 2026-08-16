import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  RefreshControl,
  Modal,
  Pressable,
  Platform,
  useWindowDimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../types/Navigation";
import { Product } from "../types/Product";

import {
  getProducts,
  getProductsByCategory,
} from "../services/api";

import SearchBar from "../components/SearchBar";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";

import { useCart } from "../context/CartContext";

const BANNER_IMAGE = require("../assets/images/banners/myshoppy_banner.png");

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Main"
>;

type SortOption =
  | "default"
  | "low-high"
  | "high-low"
  | "rating"
  | "discount"
  | "name";

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { getCartCount } = useCart();
  const { width: windowWidth } = useWindowDimensions();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortVisible, setSortVisible] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const [bannerAspectRatio, setBannerAspectRatio] = useState<number>(0.75);

  const isWebOrDesktop = Platform.OS === "web" && windowWidth > 768;

  // Responsive Grid Logic
  const numColumns = useMemo(() => {
    if (windowWidth >= 1024) return 4; // Laptop / Desktop
    if (windowWidth >= 768) return 3;  // Tablet
    return 2;                          // Mobile
  }, [windowWidth]);

  // Updated Categories Array (Added "Bags")
  const categories = [
    "All",
    "Electronics",
    "Kitchen",
    "Clothing",
    "Shoes",
    "Bags",
    "Beauty",
    "Groceries",
  ];

  useEffect(() => {
    loadProducts();
    calculateBannerAspectRatio();
  }, []);

  function calculateBannerAspectRatio() {
    try {
      if (Image.resolveAssetSource) {
        const resolved = Image.resolveAssetSource(BANNER_IMAGE);
        if (resolved && resolved.width && resolved.height) {
          setBannerAspectRatio(resolved.width / resolved.height);
          return;
        }
      }

      Image.getSize(
        BANNER_IMAGE,
        (width, height) => {
          if (width && height) {
            setBannerAspectRatio(width / height);
          }
        },
        () => {}
      );
    } catch (e) {
      console.log("Error calculating banner aspect ratio:", e);
    }
  }

  async function loadProducts() {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function onRefresh() {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  }

  async function selectCategory(category: string) {
    try {
      setSelectedCategory(category);
      setLoading(true);

      if (category === "All") {
        const data = await getProducts();
        setProducts(data);
        return;
      }

      let apiCategories: string[] = [];

      switch (category) {
        case "Electronics":
          apiCategories = [
            "smartphones",
            "laptops",
            "tablets",
            "mobile-accessories",
          ];
          break;

        case "Kitchen":
          apiCategories = ["kitchen-accessories"];
          break;

        case "Clothing":
          apiCategories = [
            "mens-shirts",
            "tops",
            "womens-dresses",
            "womens-jewellery",
          ];
          break;

        case "Shoes":
          apiCategories = [
            "mens-shoes",
            "womens-shoes",
          ];
          break;

        case "Bags":
          apiCategories = [
            "womens-bags",
          ];
          break;

        case "Beauty":
          apiCategories = [
            "beauty",
            "fragrances",
            "skin-care",
          ];
          break;

        case "Groceries":
          apiCategories = ["groceries"];
          break;
      }

      let allProducts: Product[] = [];

      for (const cat of apiCategories) {
        const items = await getProductsByCategory(cat);
        allProducts = [...allProducts, ...items];
      }

      setProducts(allProducts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = useMemo(() => {
    let data = products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );

    const sortedData = [...data];

    switch (sortBy) {
      case "low-high":
        sortedData.sort((a, b) => a.price - b.price);
        break;

      case "high-low":
        sortedData.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        sortedData.sort((a, b) => b.rating - a.rating);
        break;

      case "discount":
        sortedData.sort(
          (a, b) => b.discountPercentage - a.discountPercentage
        );
        break;

      case "name":
        sortedData.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
    }

    return sortedData;
  }, [products, search, sortBy]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text style={styles.loadingText}>Loading Products...</Text>
      </View>
    );
  }

  return (
    <>
      {/* SORT MODAL */}
      <Modal
        visible={sortVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSortVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setSortVisible(false)}
        >
          <View style={styles.sortModal}>
            <Text style={styles.sortTitle}>Sort Products</Text>

            {[
              { label: "Default", value: "default" },
              { label: "Price : Low → High", value: "low-high" },
              { label: "Price : High → Low", value: "high-low" },
              { label: "Highest Rated", value: "rating" },
              { label: "Biggest Discount", value: "discount" },
              { label: "A - Z", value: "name" },
            ].map((item) => (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.sortItem,
                  sortBy === item.value && styles.selectedSort,
                ]}
                onPress={() => {
                  setSortBy(item.value as SortOption);
                  setSortVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.sortItemText,
                    sortBy === item.value && {
                      color: "#2E7D32",
                      fontWeight: "700",
                    },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      <FlatList
        key={numColumns}
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#2E7D32"]}
          />
        }
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <ProductCard product={item} />
          </View>
        )}
        ListHeaderComponent={
          <>
            {/* HERO BANNER */}
            <View
              style={[
                styles.bannerContainer,
                isWebOrDesktop && styles.bannerContainerDesktop,
              ]}
            >
              <Image
                source={BANNER_IMAGE}
                style={[
                  styles.bannerImage,
                  isWebOrDesktop
                    ? styles.bannerImageDesktop
                    : { aspectRatio: bannerAspectRatio },
                ]}
                resizeMode={isWebOrDesktop ? "cover" : "contain"}
              />

              {/* Action Icons top right */}
              <View style={styles.topIcons}>
                <TouchableOpacity
                  style={styles.circleButton}
                  onPress={() => navigation.navigate("Wishlist")}
                >
                  <Ionicons
                    name="heart-outline"
                    size={22}
                    color="#222222"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.circleButton}
                  onPress={() => navigation.navigate("Cart")}
                >
                  <Ionicons
                    name="cart-outline"
                    size={22}
                    color="#222222"
                  />

                  {getCartCount() > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>
                        {getCartCount()}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>

              {/* Floating Search Bar */}
              <View style={styles.searchContainerFloating}>
                <View style={styles.searchContainer}>
                  <SearchBar
                    value={search}
                    onChangeText={setSearch}
                  />
                </View>

                <TouchableOpacity
                  style={styles.sortButton}
                  onPress={() => setSortVisible(true)}
                >
                  <Ionicons
                    name="options-outline"
                    size={22}
                    color="#2E7D32"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Categories */}
            <View style={styles.headingRow}>
              <Text style={styles.heading}>Categories</Text>
              <TouchableOpacity style={styles.viewAllBtn}>
                <Text style={styles.viewAll}>View All</Text>
                <Ionicons name="chevron-forward" size={16} color="#2E7D32" />
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryScroll}
            >
              {categories.map((category) => (
                <CategoryCard
                  key={category}
                  title={category}
                  selected={selectedCategory === category}
                  onPress={() => selectCategory(category)}
                />
              ))}
            </ScrollView>

            {/* Recommended Products */}
            <View style={styles.headingRow}>
              <Text style={styles.heading}>Recommended For You</Text>
              <TouchableOpacity style={styles.viewAllBtn}>
                <Text style={styles.viewAll}>View All</Text>
                <Ionicons name="chevron-forward" size={16} color="#2E7D32" />
              </TouchableOpacity>
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={65} color="#BDBDBD" />
            <Text style={styles.emptyTitle}>No Products Found</Text>
            <Text style={styles.emptySubtitle}>Try another keyword.</Text>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setSearch("")}
            >
              <Text style={styles.clearButtonText}>Clear Search</Text>
            </TouchableOpacity>
          </View>
        }
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.footerText}>Made with ❤️</Text>
            <Text style={styles.footerBrand}>MyShoppy</Text>
          </View>
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    backgroundColor: "#FAFAFA",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#555",
    fontWeight: "600",
  },

  /* Mobile Banner Layout */
  bannerContainer: {
    width: "100%",
    position: "relative",
    marginBottom: 35,
  },

  /* Web/Desktop Banner Container Constraint */
  bannerContainerDesktop: {
    height: 380,
    maxHeight: 400,
    overflow: "visible",
  },

  bannerImage: {
    width: "100%",
    height: undefined,
  },

  bannerImageDesktop: {
    height: "100%",
    width: "100%",
  },

  topIcons: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "row",
    zIndex: 10,
  },

  circleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#2E7D32",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },

  badgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 10,
  },

  /* Floating Search & Sort overlay */
  searchContainerFloating: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: -22,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
  },

  searchContainer: {
    flex: 1,
  },

  sortButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  /* Headings */
  headingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 16,
  },

  heading: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
  },

  viewAllBtn: {
    flexDirection: "row",
    alignItems: "center",
  },

  viewAll: {
    fontSize: 14,
    color: "#2E7D32",
    fontWeight: "600",
    marginRight: 2,
  },

  /* Categories */
  categoryScroll: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  /* Products */
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 14,
    marginBottom: 16,
  },

  productContainer: {
    flex: 1,
    marginHorizontal: 6,
  },

  /* Empty State */
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },

  emptyTitle: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },

  emptySubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#777",
    textAlign: "center",
  },

  clearButton: {
    marginTop: 20,
    backgroundColor: "#2E7D32",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 25,
  },

  clearButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  /* Footer */
  footer: {
    paddingVertical: 24,
    alignItems: "center",
  },

  footerText: {
    fontSize: 14,
    color: "#888",
  },

  footerBrand: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "700",
    color: "#2E7D32",
  },

  /* Sort Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  sortModal: {
    width: "88%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  sortTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: "#222",
    textAlign: "center",
  },

  sortItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 6,
  },

  selectedSort: {
    backgroundColor: "#E8F5E9",
  },

  sortItemText: {
    fontSize: 15,
    color: "#444",
  },
});