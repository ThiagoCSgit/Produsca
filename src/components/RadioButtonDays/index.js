import { View, Pressable, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import IconFA from 'react-native-vector-icons/FontAwesome';
import styles from './styles'

export default function RadioButtonDays({quantDays, setQuantDays}){
  let radioValues = [7, 15, 30]

  return (
    radioValues.map((item, index) => 
      <Pressable onPress={() => setQuantDays(item)} key={index} style={styles.selectButton}>
        <View>
          <IconFA name="calendar-o" size={70} color={quantDays == item ? "#1E90FF" : "#ddd"}/>
          <Text style={[styles.textDays, {color: quantDays == item ? "#1E90FF" : "#ddd"}]}> {item} {'\n'} dias</Text>
        </View>
        <View style={{paddingLeft: 14}}>
          <RadioButton
            value={item}
            status={ quantDays === item ? 'checked' : 'unchecked' }
            color="#1E90FF"
            uncheckedColor="#ddd"
            background="transparent"
            onPress={() => setQuantDays(item)}
          />
        </View>
      </Pressable>
    )
  )
}