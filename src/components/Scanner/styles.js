import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  buttonScanner:{
    // width: "80%",
    // height: 50,
    borderRadius: 100,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: "center",
    // backgroundColor: '#1E90FF'
    backgroundColor: '#f58634',
    background: 'linear-gradient(135deg, #f58634, #e26b13)',
    // backgroundColor: '#9653b7'
    // backgroundColor: '#8257E6'
    // backgroundColor: '#ff7d1a'
    // backgroundColor: '#f499e9'
    // backgroundColor: '#ff75df'
  },
  textButton: {
    color: '#fff',
    fontSize: 18,
    fontFamily: "OpenSans_500Medium",
  },
  iconCamera:{
    color: '#fff',
    marginRight: 10
  }
})

export default styles;