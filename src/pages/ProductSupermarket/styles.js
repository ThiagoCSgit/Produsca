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
  nameProduct: {
    fontSize: 24,
    fontFamily: "OpenSans_500Medium"
  },
  buttonsArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginBottom: 15,
    marginTop: 30
  },
  labelCheckBox: {
    marginLeft: 10,
    fontSize: 19,
    fontFamily: "OpenSans_500Medium"
  }
});


export default styles;