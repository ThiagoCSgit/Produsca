import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
    height: "100%",
    width: "100%",
  },
  nameProduct: {
    fontSize: 20,
    fontFamily: "OpenSans_500Medium",
  },
  selectDays: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  buttonShare: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1E90FF",
    borderRadius: 100,
    width: 355,
  },
  shareText: {
    fontFamily: "OpenSans_500Medium",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    paddingLeft: "20%",
    color: "#000",
  },
  shareIcon: {
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E90FF",
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
  message: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "OpenSans_500Medium",
    fontStyle: "italic",
  },
});

export default styles;
