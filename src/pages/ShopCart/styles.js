import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingTop: 30,
    height: "100%",
    width: "100%",
  },
  emptyCartImage: {
    width: 300,
    height: 300,
  },
  labelEmptyCart: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 20,
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
  },
  itemName: {
    fontSize: 18,
    fontFamily: "OpenSans_400Regular",
    color: "#253D4E",
    textAlign: "start",
  },
  actionIcons: {
    gap: 30,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  quantItems: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  quantityValue: {
    fontSize: 20,
    fontFamily: "OpenSans_500Medium",
    color: "#253D4E",
  },
  bought: {
    textDecorationLine: "line-through",
  },
  totalValue: {
    textAlign: "center",
    fontSize: 22,
    marginBottom: 10,
    fontFamily: "OpenSans_500Medium",
    color: "#253D4E",
  },
  buttonCheckout: {
    borderRadius: 100,
    width: "60%",
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    textAlign: "center",
    backgroundColor: "#D4EEE2",
  },
  textButton: {
    color: "#253D4E",
    fontSize: 18,
    fontFamily: "OpenSans_500Medium",
  },
});

export default styles;
