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
  titlePage: {
    marginBottom: 20,
    fontSize: 25,
    position: 'relative',
    left: 10
  },
  listProducts: {
    flex: 1,
    width: '100%',
  },
  productItem: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  productInfos: {
    justifyContent: 'center'
  },
  productIcon: {
    width: 70,
    height: 70,
    marginRight: 10
  },
  productName: {
    fontSize: 18,
  },
  buttonsArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginBottom: 15,
    marginTop: 30
  },
  nameProduct: {
    fontSize: 24
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
    fontSize: 16
  },
  labelCheckBox: {
    marginLeft: 10,
    fontSize: 19
  }
});


export default styles;