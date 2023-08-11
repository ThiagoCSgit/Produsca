import { View, Image, TouchableOpacity, Text} from 'react-native';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

export default function NoData({message, executeAction}){
  console.log('message:',message)
  console.log('executeAction:',executeAction)
  return(
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../images/404.png")}/> 
      <Text style={styles.message}>
        {message}
      </Text>
      <TouchableOpacity style={styles.buttonRefresh} onPress={() => executeAction()}>
        <IconMCI name='refresh' size={50} color="#e7dddd"/>
      </TouchableOpacity>
    </View>
  )
}