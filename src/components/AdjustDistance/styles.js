import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  buttonRange: {
    borderRadius: 100,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#D4EEE2",
  },
  iconGPS: {
    marginRight: 15,
    color: "#253D4E",
  },
  textButtonRange: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "OpenSans_500Medium",
    color: "#253D4E",
  },
  containerModal: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    backgroundColor: "#fff",
    padding: 45,
    position: "relative",
    top: Dimensions.get("window").height / 3,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 20,
    zIndex: 10,
  },
  rangeLabel: {
    fontSize: 20,
    fontFamily: "OpenSans_500Medium",
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 10,
  },
});

export default styles;
