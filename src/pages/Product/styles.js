import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    height: "100%",
    width: "100%"
  },
  productName: {
    fontSize: 18,
    fontFamily: "OpenSans_500Medium"
  },
  buttonsArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginBottom: 15,
    marginTop: 25
  },
  nameProduct: {
    fontSize: 24,
    fontFamily: "OpenSans_500Medium"
  },
  selectDays: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  listSupermarktesAvailables: {
    padding: 10,
    marginTop: 15,
  },
  itemSupermarket:{
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ffcfa4",
    borderRadius: 10,
    paddingTop: 10,
  },
  buttonHistoric: {
    textAlign: 'center',
    backgroundColor: "#ffcfa4",
    borderBottomRightRadius: 9,
    borderBottomLeftRadius: 9,
    padding: 10
  },
  buttonHistoricText:{
    textAlign: "center", 
    color: "#623b32",
    fontSize: 16,
    fontFamily: "OpenSans_500Medium"
  },
  labelCheckBox: {
    marginLeft: 10,
    fontSize: 19,
    fontFamily: "OpenSans_500Medium"
  }
});


export default styles;