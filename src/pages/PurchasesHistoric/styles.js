import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    width: "100%",
    height: "100%",
    paddingVertical: 10,
    justifyContent: "center"
  },
  emptyHistoric: {
    alignItems: "center", 
    justifyContent: "center", 
    flex: 1,
    paddingHorizontal: 10,
  },
  image: {
    width: "100%", 
    height: 500,
  },
  text:{
    fontFamily: "OpenSans_500Medium",
    fontSize: 20,
    textAlign: "center"
  }
});


export default styles;