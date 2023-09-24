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
    fontSize: 22,
    position: "relative",
    left: 10,
    fontFamily: "OpenSans_500Medium",
    textAlign: "center",
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
    marginLeft: 15,
    width: "100%",
  },
  productIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 100,
  },
  nameProduct: {
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
    color: "#253D4E",
    textAlign: "left",
    width: "75%",
    flexWrap: "wrap",
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
