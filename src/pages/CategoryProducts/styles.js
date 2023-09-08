import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
    height: "100%",
    width: "100%",
  },
  titleIcon: {
    flexDirection: "row",
    alignItems: "baseline",
    paddingBottom: 10,
  },
  titlePage: {
    marginBottom: 20,
    marginHorizontal: 25,
    fontSize: 25,
  },
  iconCamera: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 100,
    padding: 10,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  listCategories: {
    flex: 1,
  },
  categoryItem: {
    margin: 10,
    alignItems: "center",
    width: Dimensions.get("window").width / 4,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 100,
  },
  categoryName: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "OpenSans_500Medium",
  },
  containerModal: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    backgroundColor: "#fff",
    height: 200,
    position: "relative",
    top: Dimensions.get("window").height / 3,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 20,
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 10,
  },
  modalText: {
    color: "#253D4E",
    fontSize: 18,
    fontFamily: "OpenSans_500Medium",
  },
  modalButtons: {
    flexDirection: "row",
    position: "relative",
    top: 30,
    justifyContent: "space-around",
    width: "100%",
  },
  buttonModal: {
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "OpenSans_500Medium",
  },
});

export default styles;
