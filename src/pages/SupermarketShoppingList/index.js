import { View, Text } from 'react-native';
import styles from './styles';

export default function SupermaketShoppingList({route}){
  console.warn(route.params.list)
  return (
    <View style={styles.container}>
      <Text>Lista de compras no supermercado</Text>
      {route.params.list.map(item => {
        return (
          <View>
            <Text>{item.product.name}</Text>
          </View>
        )
      })}
      {/* <Text>{route}</Text> */}
    </View>
  )
}