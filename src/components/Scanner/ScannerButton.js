import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';

export default function ScannerButton({navigation}){
  return (
    <LinearGradient
      colors={['#f09c33', '#f59234', '#f98736', '#fd7b38', '#ff6e3c', '#ff5f41']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.buttonGradient}
    >
      <TouchableOpacity style={styles.buttonScanner} onPress={() => navigation.navigate("Scanner")}>
        <Icon style={styles.iconCamera} name="camera" size={25}/>
        <Text style={styles.textButton}>QR Code</Text>
      </TouchableOpacity>
    </LinearGradient>
  )
}