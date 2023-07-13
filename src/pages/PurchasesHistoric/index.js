import { View, Text} from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

export default function PurchasesHistoric(){

  useEffect(() => {
    getHistoric()
  },[])

  async function getHistoric(){
    let historic = await AsyncStorage.getItem("carrinho-1-EPA")
    console.warn(historic)
  }

  return (
    <View>
      <Text>Histórico de Compras</Text>
    </View>
  )
}