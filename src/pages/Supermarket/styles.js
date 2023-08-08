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
      gap: 15
    },
    supermarketName: {
      fontSize: 30,
      textAlign: 'center',
      fontFamily: "OpenSans_500Medium"
    },
    supermarketInfo: {
      fontSize: 21,
      textAlign: 'center',
      fontFamily: "OpenSans_500Medium"
    },
    buttonCall:{
      width: 50, 
      marginLeft: 20,
      marginTop: 5
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
      fontSize: 17,
      textAlign: 'center',
      fontFamily: "OpenSans_500Medium"
    }
  });


export default styles;