import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';

export default function ShopCartButton({route, navigation, applyClass}){
  return (
    <Icon style={[applyClass && styles.iconCart, route != null && !route.params?.supermarketName && styles.modifyPositionIcon]} name="shoppingcart" size={30} onPress={() => navigation.navigate("Lista de Compras")}/>
  )
}