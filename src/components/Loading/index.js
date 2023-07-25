import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function Loading(){
  return (
    <View style={styles.loadingScreen}>
      <ActivityIndicator size={100} color="#1E90FF"/>
    </View>
  ) 
}

const styles = StyleSheet.create({
  loadingScreen:{
    backgroundColor: 'rgba(122, 118, 114, 0.4)',
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
})