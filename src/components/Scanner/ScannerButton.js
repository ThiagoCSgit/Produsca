import { Text, View, Pressable, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from './styles';

export default function ScannerButton({navigation}){
  return (
    <TouchableOpacity style={styles.buttonScanner} onPress={() => navigation.navigate("Scanner")}>
      {/* <View style={styles.iconCamera}> */}
        <Icon style={styles.iconCamera} name="camera" size={25}/>
      {/* </View> */}
      <Text style={styles.textButton}>QR Code</Text>
    </TouchableOpacity>
  )
}