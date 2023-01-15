import { Text, StyleSheet, Platform } from "react-native";

export default function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    maxWidth: "80%",
    width: 300,
    fontFamily: "open-sans-bold",
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    // borderWidth: Platform.OS === "android" ? 0 : 2,
    borderWidth: Platform.select({ android: 2, ios: 0 }),
    borderColor: "#fff",
    padding: 12,
  },
});
