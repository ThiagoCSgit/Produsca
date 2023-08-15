import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start', 
    alignItems: 'center',
    marginBottom: 20
  },
  image: {
    width: "95%", 
    height: "75%"
  },
  message: {
    textAlign: 'center', 
    fontSize: 18, 
    fontFamily: "OpenSans_500Medium", 
    paddingHorizontal: 15
  },
  buttonRefresh: {
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 30,
    borderRadius: 100,
    backgroundColor: "#e96b11",
    borderColor: "#e96b11"
  }
});


export default styles;