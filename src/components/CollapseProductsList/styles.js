import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  p15: {
    paddingVertical: 15
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingTop: 15,
    width: "100%",
    marginVertical: 15,
    elevation: 8, // Adiciona sombra no Android
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  buttonOpenCollapse:{
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginHorizontal: 10
  },
  listCollapse:{
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  startShoppingButton: {
    backgroundColor: "#93be00",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  textButton: {
    color: "#fff",
    fontSize: 18,
    marginRight: 10,
    fontFamily: "OpenSans_500Medium"
  }
});


export default styles;