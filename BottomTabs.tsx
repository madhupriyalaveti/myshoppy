import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import WishlistScreen from "../screens/WishlistScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";

import { useCart } from "../context/CartContext";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { getCartCount } = useCart();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: "#2E7D32",
        tabBarInactiveTintColor: "#999",

        tabBarStyle: {
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          backgroundColor: "#fff",

          elevation: 10,

          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 8,
          shadowOffset: {
            width: 0,
            height: -2,
          },
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },

        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap =
            "home";

          switch (route.name) {
            case "Home":
              iconName = focused
                ? "home"
                : "home-outline";
              break;

            case "Wishlist":
              iconName = focused
                ? "heart"
                : "heart-outline";
              break;

            case "Cart":
              iconName = focused
                ? "cart"
                : "cart-outline";
              break;

            case "Profile":
              iconName = focused
                ? "person"
                : "person-outline";
              break;
          }

          return (
            <View style={styles.iconContainer}>
              <Ionicons
                name={iconName}
                size={focused ? 28 : 24}
                color={color}
              />

              {route.name === "Cart" &&
                getCartCount() > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {getCartCount()}
                    </Text>
                  </View>
                )}
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },

  badge: {
    position: "absolute",

    top: -2,
    right: -8,

    minWidth: 18,
    height: 18,

    borderRadius: 9,

    backgroundColor: "#E53935",

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 4,
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});