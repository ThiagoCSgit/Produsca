import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
    height: "100%",
    width: "100%",
  },
  titlePage: {
    marginBottom: 15,
    fontSize: 25,
    position: "relative",
    left: 10,
    fontFamily: "OpenSans_500Medium",
  },
  listProducts: {
    flex: 1,
    width: "100%",
  },
  productItem: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  productInfos: {
    justifyContent: "center",
  },
  productIcon: {
    width: 70,
    height: 100,
    marginRight: 10,
  },
  nameProduct: {
    fontSize: 16,
    fontFamily: "OpenSans_500Medium",
    width: Dimensions.get("window").width - 140,
  },
  quantItems: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityValue: {
    fontSize: 24,
    fontFamily: "OpenSans_500Medium",
  },
});

export default styles;
