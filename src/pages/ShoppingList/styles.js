import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 0,
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
    paddingVertical: 20,
    // backgroundColor: "red",
    // height: "100%",
  },
  itemName: {
    fontSize: 18,
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
  buttonSimulate: {
    borderRadius: 100,
    marginBottom: 40,
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
