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
    titleIcon: {
      flexDirection: 'row',
      alignItems: 'baseline',
      paddingBottom: 10
    },
    titlePage: {
      marginBottom: 20,
      marginHorizontal: 25,
      fontSize: 25,
    },
    supermarketInfo: {
      textAlign: 'left'
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