import { Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';

export default function ScannerButton({navigation}){
  return (
    <Pressable onPress={() => navigation.navigate("Scanner")}>
      <View style={styles.iconCamera}>
        <Icon name="camerao" size={25}/>
      </View>
      <Text>QR Code</Text>
    </Pressable>
  )
}