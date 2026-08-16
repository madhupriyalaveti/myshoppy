import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { RootStackParamList } from "../types/Navigation";
import { useCart } from "../context/CartContext";

type CheckoutNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Checkout"
>;

export default function CheckoutScreen() {
  const navigation =
    useNavigation<CheckoutNavigationProp>();

  const {
    cart,
    getTotalPrice,
    clearCart,
  } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [street, setStreet] =
    useState("");

  const [city, setCity] =
    useState("");

  const [state, setState] =
    useState("");

  const [pincode, setPincode] =
    useState("");

  const [payment, setPayment] =
    useState("Cash on Delivery");

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const orderId =
    "ORD" +
    Math.floor(
      100000 + Math.random() * 900000
    );

  function placeOrder() {
    if (
      !name.trim() ||
      !phone.trim() ||
      !street.trim() ||
      !city.trim() ||
      !state.trim() ||
      !pincode.trim()
    ) {
      Alert.alert(
        "Missing Details",
        "Please fill all the fields."
      );
      return;
    }

    if (phone.length !== 10) {
      Alert.alert(
        "Invalid Phone Number",
        "Please enter a valid 10-digit phone number."
      );
      return;
    }

    if (pincode.length !== 6) {
      Alert.alert(
        "Invalid Pincode",
        "Please enter a valid 6-digit pincode."
      );
      return;
    }

    clearCart();

    navigation.navigate("Success");
  }

  return (
  <ScrollView
    style={styles.container}
    contentContainerStyle={styles.content}
    showsVerticalScrollIndicator={false}
  >
    <Text style={styles.heading}>
      Secure Checkout
    </Text>

    {/* Customer Details */}

    <View style={styles.card}>
      <Text style={styles.sectionTitle}>
        Customer Details
      </Text>

      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Phone Number"
        keyboardType="phone-pad"
        maxLength={10}
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
      />

      <TextInput
        placeholder="Street Address"
        value={street}
        onChangeText={setStreet}
        style={styles.input}
      />

      <TextInput
        placeholder="City"
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />

      <TextInput
        placeholder="State"
        value={state}
        onChangeText={setState}
        style={styles.input}
      />

      <TextInput
        placeholder="Pincode"
        keyboardType="number-pad"
        maxLength={6}
        value={pincode}
        onChangeText={setPincode}
        style={styles.input}
      />
    </View>

    {/* Payment */}

    <View style={styles.card}>
      <Text style={styles.sectionTitle}>
        Payment Method
      </Text>

      {[
        {
          title: "Cash on Delivery",
          icon: "cash-outline",
        },
        {
          title: "UPI",
          icon: "phone-portrait-outline",
        },
        {
          title: "Credit / Debit Card",
          icon: "card-outline",
        },
      ].map((item) => (
        <TouchableOpacity
          key={item.title}
          style={[
            styles.paymentButton,
            payment === item.title &&
              styles.selectedPayment,
          ]}
          onPress={() =>
            setPayment(item.title)
          }
        >
          <View style={styles.paymentRow}>
            <Ionicons
              name={item.icon as any}
              size={22}
              color={
                payment === item.title
                  ? "#fff"
                  : "#2E7D32"
              }
            />

            <Text
              style={[
                styles.paymentText,
                payment === item.title &&
                  styles.selectedPaymentText,
              ]}
            >
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>

    {/* Order Summary */}

    <View style={styles.card}>
      <Text style={styles.sectionTitle}>
        Order Summary
      </Text>

      <View style={styles.row}>
        <Text>Total Items</Text>
        <Text>{totalItems}</Text>
      </View>

      <View style={styles.row}>
        <Text>Delivery</Text>
        <Text style={styles.free}>
          FREE
        </Text>
      </View>

      <View style={styles.row}>
        <Text>Payment</Text>
        <Text>{payment}</Text>
      </View>

      <View style={styles.row}>
        <Text>Estimated Delivery</Text>
        <Text>2 - 4 Business Days</Text>
      </View>

      <View style={styles.row}>
        <Text>Order ID</Text>
        <Text>{orderId}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.totalLabel}>
          Grand Total
        </Text>

        <Text style={styles.totalPrice}>
          ₹
          {new Intl.NumberFormat(
            "en-IN"
          ).format(getTotalPrice())}
        </Text>
      </View>
    </View>

    <TouchableOpacity
      style={styles.placeOrderButton}
      onPress={placeOrder}
    >
      <Text style={styles.placeOrderText}>
        Confirm Order
      </Text>
    </TouchableOpacity>
  </ScrollView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,

    elevation: 4,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
    marginBottom: 18,
  },

  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 14,
    fontSize: 16,
    color: "#222",
  },

  paymentButton: {
    borderWidth: 1.2,
    borderColor: "#2E7D32",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  selectedPayment: {
    backgroundColor: "#2E7D32",
    borderColor: "#2E7D32",
  },

  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  paymentText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#2E7D32",
  },

  selectedPaymentText: {
    color: "#FFFFFF",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },

  divider: {
    borderTopWidth: 1,
    borderColor: "#E5E5E5",
    marginVertical: 16,
  },

  totalLabel: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },

  totalPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32",
  },

  free: {
    color: "#2E7D32",
    fontWeight: "700",
  },

  placeOrderButton: {
    backgroundColor: "#2E7D32",
    borderRadius: 14,
    paddingVertical: 18,
    justifyContent: "center",
    alignItems: "center",

    elevation: 4,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  placeOrderText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});