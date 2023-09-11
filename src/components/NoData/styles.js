import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 50,
  },
  image: {
    width: "100%",
    height: "70%",
    position: "relative",
    left: "3%",
  },
  message: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "OpenSans_500Medium",
    fontStyle: "italic",
    paddingHorizontal: 15,
  },
  buttonRefresh: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    borderRadius: 100,
    backgroundColor: "#79AF96",
    borderColor: "#79AF96",
  },
});

export default styles;
