import { SafeAreaView, Text, Image, FlatList, Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Checkbox from 'expo-checkbox';
import React, { useEffect, useState } from "react"
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Products({route, navigation}) {
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "Bacon",
      image: require("../../images/foodImage.png"),
      mark: "Cofril",
      price: "10,90",
      minPrice: "1,23",
      maxPrice: "72,23",
      inCart: false,
    },
    {
      id: "2",
      name: "Sobrecoxa de Frango",
      image: require("../../images/foodImage.png"),
      mark: "Perdigão",
      price: "15,90",
      minPrice: "1,23",
      maxPrice: "72,23",
      inCart: false,
    },
    {
      id: "3",
      name: "Filé Mingnon",
      image: require("../../images/foodImage.png"),
      mark: "Montana",
      price: "22,90",
      minPrice: "1,23",
      maxPrice: "72,23",
      inCart: false,
    },
    {
      id: "4",
      name: "Banana Ouro",
      image: require("../../images/foodImage.png"),
      mark: "",
      price: "9,75",
      minPrice: "1,23",
      maxPrice: "72,23",
      inCart: false,
    },
    {
      id: "5",
      name: "Manga Tommy Atkins",
      image: require("../../images/foodImage.png"),
      mark: "",
      price: "4,73",
      minPrice: "1,23",
      maxPrice: "72,23",
      inCart: false,
    },
    {
      id: "6",
      name: "Tomate Orgânico",
      image: require("../../images/foodImage.png"),
      mark: "Viver",
      price: "10,80",
      minPrice: "1,23",
      maxPrice: "72,23",
      inCart: false,
    },
  ])


  useEffect(() => {
    getCheckProducts()
  }, [])

  async function getCheckProducts(){
    try {
      // await AsyncStorage.clear()
    } catch (e) {
      console.warn('error',e)
    }
  }


  async function addOrRemoveToShopCart(value, id, name, mark, supermarket){
    console.warn('supermarket:',supermarket)
    let newList = [...products]
    setProducts(newList.map(item => {
      if(item.id == id){
        item.inCart = value
      }
      return item
    }))

    if(value){
      try {
        await AsyncStorage.setItem(id, mark ? name + ' - ' + mark : name, supermarket)
      } catch (e) {
        console.warn('error:',e)
      }
    }
    else{
      try{
        await AsyncStorage.removeItem(id)
      } catch (e) {
        console.warn('error:',e)
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleIcon}>
        <Text style={styles.titlePage}>
          {`${route.params?.supermarketName ? route.params.categoryName + ' - ' + route.params.supermarketName : route.params.categoryName}`}
        </Text>
        <Icon style={[styles.iconCart, !route.params?.supermarketName && styles.modifyPositionIcon]} name="shoppingcart" size={25} onPress={() => navigation.navigate("Carrinho")}/>
      </View>
      <FlatList
        style={styles.listProducts}
        data={products}
        numColumns={1}
        key={'_'}
        renderItem={({item}) => {
          return (
            <View>
              <Pressable style={styles.productItem}>
                <Image style={styles.productIcon} source={item.image}/>
                <View style={styles.productInfos}>
                  <Text style={styles.productName}>{item.mark ? item.name + ' - ' + item.mark : item.name}</Text>
                  <Text style={styles.productName}>R$ {`${route.params?.supermarketName ? item.price : item.minPrice + ' - ' + item.maxPrice}`}</Text>
                </View>
              </Pressable>
              {route.params?.supermarketName &&
                <View style={styles.checkboxLabel}>
                  <Checkbox
                    value={item.inCart}
                    onValueChange={(newValue) => addOrRemoveToShopCart(newValue, item.id, item.name, item.mark, route.params?.supermarketName)}
                  />
                  <Text style={styles.label}>Adicionar ao carrinho</Text>
                </View>
              }
            </View>
          )
        }}
      />
    </SafeAreaView>
  );
}
