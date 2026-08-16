import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";

interface Props {
  title: string;
  selected: boolean;
  onPress: () => void;
}

export default function CategoryCard({
  title,
  selected,
  onPress,
}: Props) {
  const getCategoryImage = () => {
    switch (title.toLowerCase()) {
      case "electronics":
        return require("../assets/images/categories/electronics.jpg");

      case "kitchen":
        return require("../assets/images/categories/kitchen.jpg");

      case "clothing":
        return require("../assets/images/categories/fashion.jpg");

      case "beauty":
        return require("../assets/images/categories/beauty.jpg");

      case "shoes":
        return require("../assets/images/categories/shoes.jpg");

      case "groceries":
        return require("../assets/images/categories/groceries.jpg");

      case "bags":
        return require("../assets/images/categories/bags.jpg");

      case "all":
      default:
        return require("../assets/images/logo/logo.png");
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.card,
        selected && styles.selectedCard,
      ]}
    >
      <Image
        source={getCategoryImage()}
        style={styles.image}
      />

      <Text
        style={[
          styles.title,
          selected && styles.selectedTitle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 95,
    height: 120,
    backgroundColor: "#fff",
    borderRadius: 18,
    marginRight: 14,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  selectedCard: {
    borderWidth: 3,
    borderColor: "#2E7D32",
    backgroundColor: "#F1FFF3",
  },

  image: {
    width: 58,
    height: 58,
    borderRadius: 30,
    marginBottom: 12,
  },

  title: {
    fontSize: 13,
    fontWeight: "700",
    color: "#444",
    textAlign: "center",
  },

  selectedTitle: {
    color: "#2E7D32",
  },
});
