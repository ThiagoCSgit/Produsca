import { View, ScrollView} from 'react-native';
import styles from './styles';
import CollapseProductsList from "../../components/CollapseProductsList";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function PurchasesHistoric(){

  const [historic, setHistoric] = useState(null)

  useEffect(() => {
    getHistoric()
  },[])

  async function getHistoric(){
    let productKeys = await AsyncStorage.getAllKeys()
    let filteredKeys = productKeys.filter(key => {
        if(key.includes("carrinho-")){
            return key
        }
    })
    let shopping = await AsyncStorage.multiGet(filteredKeys)

    let newList = shopping.map(item => {
      let id = item[0]
      let produtos = JSON.parse(item[1]).produtos
      let supermercado = JSON.parse(item[1]).supermercado

      return {id: id, produtos: produtos, supermercado:supermercado}
    })
    setHistoric(newList)
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{justifyContent: "center", paddingHorizontal: 10}}>
        {historic != null && 
          <CollapseProductsList
            state={historic}
          />
        }
      </ScrollView>
    </View>
  )
}