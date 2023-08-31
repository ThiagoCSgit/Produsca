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
    // justifyContent: "center",
    marginLeft: 15,
  },
  productIcon: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 100,
  },
  nameProduct: {
    // fontSize: 16,
    // fontFamily: "OpenSans_500Medium",
    // alignItems: "center",
    width: Dimensions.get("window").width - 180,
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
    color: "#253D4E",
    textAlign: "left",
  },
  quantItems: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    marginVertical: 10,
  },
  quantityValue: {
    fontSize: 20,
    fontFamily: "OpenSans_500Medium",
    color: "#253D4E",
  },
});

export default styles;
