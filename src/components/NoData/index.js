import { View, Image, TouchableOpacity, Text} from 'react-native';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

export default function NoData({message, getNearbySupermarkets}){
  return(
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../images/404.png")}/> 
      <Text style={styles.message}>
        {message}
      </Text>
      <TouchableOpacity style={styles.buttonRefresh} onPress={() => getNearbySupermarkets()}>
        <IconMCI name='refresh' size={70} color="#e7dddd"/>
      </TouchableOpacity>
    </View>
  )
}