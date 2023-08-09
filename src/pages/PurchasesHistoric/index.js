import { View, ScrollView ,Image, Text } from 'react-native';
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
    console.warn("key:",filteredKeys)
    let shopping = await AsyncStorage.multiGet(filteredKeys)
    console.warn("shopping:",shopping)
    let newList = shopping.map(item => {
      let id = item[0]
      let produtos = JSON.parse(item[1]).produtos
      let supermercado = JSON.parse(item[1]).supermercado

      return {id: id, produtos: produtos, supermercado:supermercado}
    })
    console.warn('newList historic:',newList)
    setHistoric(newList)
  }

  return (
    <View style={styles.container}>
      {historic != null && historic.length > 0 ? 
        <ScrollView contentContainerStyle={{justifyContent: "center", paddingHorizontal: 10}}>
          <CollapseProductsList
            state={historic}
          />
        </ScrollView>
        :
        <View style={styles.emptyHistoric}>
            <Image style={styles.image} source={require("../../images/folha-vazia.png")}/>
            <Text style={styles.text}>Seu histórico de compras está vazio</Text>
        </View>
      }
    </View>
  )
}