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
  labelEmptyCart: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 20,
    fontFamily: "OpenSans_500Medium",
  },
  itemCart: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: 150,
  },
  itemName: {
    fontSize: 21,
    textAlign: "center",
    minWidth: "70%",
    width: "80%",
    fontFamily: "OpenSans_500Medium",
  },
  quantItems: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  quantityValue: {
    fontSize: 24,
    fontFamily: "OpenSans_500Medium",
  },
  iconTrash: {
    // position: "relative",
    // bottom: 5,
    marginBottom: 5,
  },
  buttonGradient: {
    borderRadius: 100,
    marginBottom: 20,
  },
  buttonSimulate: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    textAlign: "center",
  },
  iconCalculator: {
    marginRight: 20,
    color: "#000",
  },
  textButton: {
    color: "#000",
    fontSize: 18,
    fontFamily: "OpenSans_500Medium",
  },
});

export default styles;
