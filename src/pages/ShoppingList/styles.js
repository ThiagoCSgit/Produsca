import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: "100%",
    width: "100%",
  },
  emptyCartImage: {
    width: 300,
    height: 300,
  },
  screenList: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  listProducts: {
    flex: 1,
    // width: "100%",
    // backgroundColor: "red",
  },
  labelEmptyCart: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 20,
    color: "#253D4E",
    fontFamily: "OpenSans_500Medium",
  },
  itemCart: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#D4EEE2",
    borderRadius: 10,
    paddingTop: 10,
    minHeight: 130,
  },
  itemName: {
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
    color: "#253D4E",
    textAlign: "left",
    marginBottom: 10,
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
  buttonSimulate: {
    borderRadius: 100,
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    textAlign: "center",
    backgroundColor: "#D4EEE2",
  },
  iconCalculator: {
    marginRight: 15,
    color: "#253D4E",
  },
  textButton: {
    color: "#253D4E",
    fontSize: 18,
    fontFamily: "OpenSans_500Medium",
  },
});

export default styles;
