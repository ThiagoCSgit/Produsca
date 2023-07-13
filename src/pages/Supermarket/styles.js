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
    supermarketInfos: {
      gap: 10
    },
    supermarketInfo: {
      fontSize: 22,
      textAlign: 'center',
    },
    buttonCall:{
      height: 50, 
      width: 50, 
      marginLeft: 20,
      marginTop: 5
    },
    listSupermarketCategorys:{
      flex: 1,
    },
    supermarketCategoryItem: {
      margin: 15,
      alignItems: 'center',
    },
    supermarketCategoryIcon: {
      width: 70,
      height: 70
    },
    supermarketCategoryName: {
      fontSize: 18,
      textAlign: 'center'
    }
  });


export default styles;