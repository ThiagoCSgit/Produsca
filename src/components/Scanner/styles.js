import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  buttonGradient: {
    borderRadius: 100,
  },
  buttonScanner:{
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: "center",
  },
  textButton: {
    color: '#000',
    fontSize: 18,
    fontFamily: "OpenSans_500Medium",
  },
  iconCamera:{
    color: '#000',
    marginRight: 10
  }
})

export default styles;