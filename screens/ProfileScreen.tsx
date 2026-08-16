import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function ProfileScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Image
          source={require("../assets/images/logo/logo.png")}
          style={styles.logo}
        />

        <Text style={styles.name}>
          MyShoppy User
        </Text>

        <Text style={styles.subtitle}>
          Happy Shopping!
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Account
        </Text>

        <View style={styles.item}>
          <Text style={styles.icon}>👤</Text>
          <Text style={styles.itemText}>
            My Profile
          </Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.icon}>📦</Text>
          <Text style={styles.itemText}>
            My Orders
          </Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.icon}>❤️</Text>
          <Text style={styles.itemText}>
            Wishlist
          </Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.icon}>🛒</Text>
          <Text style={styles.itemText}>
            Cart
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Support
        </Text>

        <View style={styles.item}>
          <Text style={styles.icon}>☎️</Text>
          <Text style={styles.itemText}>
            Contact Us
          </Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.icon}>❓</Text>
          <Text style={styles.itemText}>
            Help Center
          </Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.icon}>⭐</Text>
          <Text style={styles.itemText}>
            Rate MyShoppy
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>

      <Text style={styles.version}>
        MyShoppy v1.0
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    alignItems: "center",
    marginBottom: 25,
  },

  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },

  name: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 15,
    color: "#222",
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 6,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#222",
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },

  icon: {
    fontSize: 22,
    width: 35,
  },

  itemText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },

  logoutButton: {
    backgroundColor: "#E53935",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },

  version: {
    textAlign: "center",
    marginTop: 20,
    color: "#777",
    fontSize: 14,
  },
});
