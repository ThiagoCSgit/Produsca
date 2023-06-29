import { SafeAreaView, Dimensions, Text, Image, FlatList, Pressable, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import React, { useEffect, useState } from "react"
import styles from './styles';
import { useIsFocused } from "@react-navigation/native";
import { LineChart } from "react-native-chart-kit";
import api from '../../service/api';

export default function Products({ route, navigation }) {
  const [historicoPrecos, setHistoricoPrecos] = useState([])
  // const isFocused = useIsFocused();


  // useEffect(() => {
  //   getCheckProducts()
  // }, [isFocused])

  useEffect(() => {
    // debugger
    console.log('route.params?.nameProduct.toLowerCase():', route.params?.nameProduct.toLowerCase())
    console.log('route.params?.nameProduct:', route.params?.nameProduct)
    console.log('url:', `/consultas/HistoricoPrecoGeral?nomeproduto=${route.params?.nameProduct.toLowerCase()}`)
    api.get(`/consultas/HistoricoPrecoGeral?nomeproduto=${route.params?.nameProduct.toLowerCase()}`).then(response => {
      console.warn("response:", response)
      setHistoricoPrecos(response.data)
    })
  }, [])

  // async function getCheckProducts() {
  //   try {
  //     // await AsyncStorage.clear()
  //     let productKeys = await AsyncStorage.getAllKeys()
  //     let productsListCheked = await AsyncStorage.multiGet(productKeys)
  //     let newList = [...products]
  //     newList.forEach(item => {
  //       item.inCart = false
  //     })
  //     newList.forEach(item => {
  //       productsListCheked.forEach(itemChecked => {
  //         if (item.id == itemChecked[0]) {
  //           item.inCart = true
  //         }
  //       })
  //     })
  //     setProducts(newList)
  //   } catch (e) {
  //     console.warn('error', e)
  //   }
  // }


  // async function addOrRemoveToShopCart(value, id, supermarket) {
  //   let newList = [...products]
  //   setProducts(newList.map(item => {
  //     if (item.id == id) {
  //       item.inCart = value
  //     }
  //     return item
  //   }))


  //   if (value) {
  //     let itemToAdd = products.find(item => item.id == id)
  //     itemToAdd.quantityItems = 1
  //     itemToAdd.supermarket = supermarket
  //     try {
  //       await AsyncStorage.setItem(id, JSON.stringify(itemToAdd))
  //     } catch (e) {
  //       console.warn('error:', e)
  //     }
  //   }
  //   else {
  //     try {
  //       await AsyncStorage.removeItem(id)
  //     } catch (e) {
  //       console.warn('error:', e)
  //     }
  //   }
  // }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titlePage}>
        Tela de produto
      </Text>
      <Text>{route.params?.nameProduct}</Text>
      <View>
        {/* <LineChart

        /> */}
      </View>
    </SafeAreaView>
  );
}
