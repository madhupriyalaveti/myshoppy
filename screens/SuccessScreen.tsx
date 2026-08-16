import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../types/Navigation";

type SuccessNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Success"
>;

export default function SuccessScreen() {
  const navigation =
    useNavigation<SuccessNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>✓</Text>
        </View>

        <Text style={styles.title}>
          Order Placed Successfully!
        </Text>

        <Text style={styles.message}>
          Thank you for shopping with MyShoppy.
        </Text>

        <Text style={styles.orderText}>
          Your order has been confirmed and will be
          delivered within 2-3 business days.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>
            Estimated Delivery
          </Text>

          <Text style={styles.infoValue}>
            2 - 3 Days
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Main")
          }
        >
          <Text style={styles.buttonText}>
            Continue Shopping
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
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    elevation: 6,
  },

  iconCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  icon: {
    fontSize: 60,
    color: "#2E7D32",
    fontWeight: "bold",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
  },

  message: {
    fontSize: 18,
    color: "#555",
    marginTop: 12,
    textAlign: "center",
  },

  orderText: {
    fontSize: 15,
    color: "#777",
    textAlign: "center",
    marginTop: 15,
    lineHeight: 24,
  },

  infoBox: {
    width: "100%",
    backgroundColor: "#F7F7F7",
    borderRadius: 12,
    padding: 15,
    marginTop: 25,
    alignItems: "center",
  },

  infoTitle: {
    fontSize: 15,
    color: "#666",
  },

  infoValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E7D32",
    marginTop: 5,
  },

  button: {
    marginTop: 30,
    backgroundColor: "#2E7D32",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
