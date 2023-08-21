import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  p15: {
    paddingTop: 15,
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
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  buttonGradient: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  supermarketInfos: {
    fontFamily: "OpenSans_400Regular",
    color: "#9D9FA0",
    fontStyle: "italic",
    fontSize: 16,
    marginHorizontal: 20,
  },
  buttonOpenCollapse: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  listCollapse: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 15,
  },
  itemList: {
    fontSize: 16,
    marginVertical: 5,
    fontFamily: "OpenSans_400Regular",
    color: "#5C5A66",
  },
  startShoppingButton: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "#fff",
    fontSize: 18,
    marginRight: 10,
    fontFamily: "OpenSans_500Medium",
  },
});

export default styles;
