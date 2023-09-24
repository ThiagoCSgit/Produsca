import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: "rgba(122, 118, 114, 0.1)",
  },
  flashButton: {
    padding: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  textInfo: {
    fontFamily: "OpenSans_400Regular",
    textAlign: "center",
    fontSize: 20,
    position: "relative",
    bottom: 10,
    color: "#253D4E",
  },
});

export default styles;
