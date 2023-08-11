import { StyleSheet, Dimensions } from "react-native";

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
    iconCamera: {
      width: 50,
      height: 50,
      borderWidth: 2,
      borderRadius: 100,
      padding: 10,
      marginBottom: 5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    listCategorys:{
      flex: 1,
    },
    categoryItem: {
      margin: 10,
      alignItems: 'center',
      width: Dimensions.get('window').width/4,
    },
    categoryIcon: {
      width: Dimensions.get('window').width/6,
      height: Dimensions.get('window').width/6,
    },
    categoryName: {
      fontSize: 18,
      textAlign: 'center',
      fontFamily: "OpenSans_500Medium"
    }
  });


export default styles;