import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      padding: 15,
      height: "100%",
      width: "100%"
    },
    supermarketInfos: {
      gap: 20,
      marginTop: 10,
      paddingBottom: 5,
    },
    supermarketName: {
      fontSize: 24,
      textAlign: 'center',
      fontFamily: "OpenSans_500Medium"
    },
    callNumber: {
      flexDirection: 'row', 
      textAlign: 'center', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      borderWidth: 1,
      borderColor: "#00da28",
      borderRadius: 100,
    },
    phone:{
      paddingLeft: 20,
      paddingRight: 10,
      color: "#000",
      justifyContent: 'center',
    },
    supermarketInfo: {
      fontSize: 18,
      textAlign: 'center',
      fontFamily: "OpenSans_500Medium"
    },
    buttonCall:{
      paddingVertical: 15,
      paddingLeft: 15,
      paddingRight: 18,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#69ba12",
      borderTopRightRadius: 100,
      borderBottomRightRadius: 100
    },
    listSupermarketCategorys:{
      flex: 1,
      marginTop: 10
    },
    supermarketCategoryItem: {
      margin: 10,
      alignItems: 'center',
      width: Dimensions.get('window').width/4,
    },
    supermarketCategoryIcon: {
      width: Dimensions.get('window').width/6,
      height: Dimensions.get('window').width/6,
    },
    supermarketCategoryName: {
      fontSize: 18,
      textAlign: 'center',
      fontFamily: "OpenSans_500Medium"
    }
  });


export default styles;