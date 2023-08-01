import { SafeAreaView, Text, Image, FlatList, Pressable, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import React, { useEffect, useState } from "react"
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import api from "../../service/api"

export default function Products({ route, navigation }) {
  const {categoryName, supermarketName} = route.params
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "Bacon",
      image: require("../../images/foodImage.png"),
      inCart: false,
      mark: "Cofril",
      price: "10,90",
      minPrice: "1,23",
      maxPrice: "72,23",
    },
    {
      id: "2",
      name: "Sobrecoxa de Frango",
      image: require("../../images/foodImage.png"),
      inCart: false,
      mark: "Perdigão",
      price: "15,90",
      minPrice: "1,23",
      maxPrice: "72,23",
    },
    {
      id: "3",
      name: "Filé Mingnon",
      image: require("../../images/foodImage.png"),
      inCart: false,
      mark: "Montana",
      price: "22,90",
      minPrice: "1,23",
      maxPrice: "72,23",
    },
    {
      id: "4",
      name: "Banana Ouro",
      image: require("../../images/foodImage.png"),
      inCart: false,
      mark: "",
      price: "9,75",
      minPrice: "1,23",
      maxPrice: "72,23",
    },
    {
      id: "5",
      name: "Manga Tommy Atkins",
      image: require("../../images/foodImage.png"),
      inCart: false,
      mark: "",
      price: "4,73",
      minPrice: "1,23",
      maxPrice: "72,23",
    },
    {
      id: "6",
      name: "Tomate Orgânico",
      image: require("../../images/foodImage.png"),
      inCart: false,
      mark: "Viver",
      price: "10,80",
      minPrice: "1,23",
      maxPrice: "72,23",
    },
  ])
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log('oi:',supermarketName)
    if(supermarketName){
      api.get(`/consultas/ProdutosCategoriaSupermercados?categoria=${categoryName}&supermercado=${supermarketName}`).then(response => {
        console.warn('response:',response.data)
        let listProd = response.data
        if(listProd != null && listProd.length > 0){
          setProducts(listProd.map((item, index) => {
            return {
              id: index + 1,
              name: item.nome,
              image: require("../../images/foodImage.png"),
              inCart: false,
              mark: "Viver",
              price: "10,80",
              minPrice: "1,23",
              maxPrice: "72,23",
            }
          }))

          api.get(`/consultas/PrecosProdutosSupermercado?super=EPA`).then(response => {
            console.warn('response:',response.data)
            // setCatProducts(response.data)
            setIsLoading(false)
          })
        }
        else{
          setProducts([])
        }
        setIsLoading(false)
      })
    }
    else{
      api.get(`/consultas/ProdutosCategoria?categoria=${categoryName}&supermercado=qualquer`).then(response => {
        console.warn('response:',response.data)
        let listProd = response.data
        if(listProd != null && listProd.length > 0){
          setProducts(listProd.map((item, index) => {
            return {
              id: index + 1,
              name: item.nome,
              image: require("../../images/foodImage.png"),
              inCart: false,
              mark: "Viver",
              price: "10,80",
              minPrice: "1,23",
              maxPrice: "72,23",
            }
          }))
        }
        else{
          setProducts([])
        }
        setIsLoading(false)
      })
    }
  }, [])

  useEffect(() => {
    getCheckProducts()
  }, [isFocused])

  async function getCheckProducts() {
    try {
      // await AsyncStorage.clear()
      let productKeys = await AsyncStorage.getAllKeys()
      // console.warn('productKeys:',productKeys)
      let newList = [...products]
      newList.forEach(item => {
        item.inCart = false
      })
  
      let productChecked = null

      for(let i=0; i < newList.length; i++){
        item = newList[i]
        if(supermarketName){
          productChecked = await AsyncStorage.getItem(`produto-lista-${supermarketName}-${item.id}`)
        }
        else{
          productChecked = await AsyncStorage.getItem(`produto-lista-${item.id}`)
        }

        if(productChecked != null){
          productChecked = JSON.parse(productChecked)
          if(item.id == productChecked.id){
            newList[i] = productChecked
          }
        }
      }
      // console.warn('newList:',newList)
      setProducts(newList)
    } 
    catch (e) {
      console.warn('error', e)
    }
  }


  async function addOrRemoveToShopCart(value, id, supermarket = '') {
    let newList = [...products]
    setProducts(newList.map(item => {
      if (item.id == id) {
        item.inCart = value
      }
      return item
    }))
    
    if (value) {
      let itemToAdd = products.find(item => item.id == id)
      itemToAdd.quantityItems = 1
      itemToAdd.supermarket = supermarket
      id = supermarket ? `produto-lista-${supermarket}-${id}` : `produto-lista-${id}`
      try {
        await AsyncStorage.setItem(id, JSON.stringify(itemToAdd))
      } catch (e) {
        console.warn('error:', e)
      }
    }
    else {
      try {
        id = supermarket ? `produto-lista-${supermarket}-${id}` : `produto-lista-${id}`
        await AsyncStorage.removeItem(id)
      } catch (e) {
        console.warn('error:', e)
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titlePage}>
        {`${supermarketName ? categoryName + ' - ' + supermarketName : categoryName}`}
      </Text>
      <FlatList
        style={styles.listProducts}
        data={products}
        numColumns={1}
        key={'_'}
        renderItem={({ item }) => {
          return (
            <View>
              <Pressable style={styles.productItem} onPress={() => supermarketName 
              ? navigation.navigate("Detalhes do Produto", {
                supermarket: supermarketName,
                nameProduct: item.name,
                idProduct: item.id,
                funcAddRemoveCart: addOrRemoveToShopCart
              })
              : navigation.navigate("Produto", { 
                nameProduct: item.name, 
                idProduct: item.id, 
                funcAddRemoveCart: addOrRemoveToShopCart 
              })}>
                <Image style={styles.productIcon} source={item.image} />
                <View style={styles.productInfos}>
                  <Text style={styles.nameProduct}>{item.mark ? item.name + ' - ' + item.mark : item.name}</Text>
                  <Text style={styles.nameProduct}>R$ {`${supermarketName ? item.price : item.minPrice + ' - ' + item.maxPrice}`}</Text>
                </View>
              </Pressable>
              <Pressable style={styles.checkBoxArea} onPress={() => addOrRemoveToShopCart(!item.inCart, item.id, supermarketName)}>
                <Checkbox
                  value={item.inCart}
                />
                <Text style={styles.labelCheckBox}>Adicionar ao carrinho</Text>
              </Pressable>
            </View>
          )
        }}
      />
    </SafeAreaView>
  );
}
