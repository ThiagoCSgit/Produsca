import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';

export default function ShopCartButton({navigation}){
  return (
    <Icon style={styles.iconCart} name="shoppingcart" size={30} onPress={() => navigation.navigate("Lista de Compras")}/>
  )
}