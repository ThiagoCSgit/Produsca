import { SafeAreaView, Text, Image, FlatList, Pressable, View } from 'react-native';
import React, { useState, useEffect } from "react";
import styles from './styles';
import api from '../../service/api';
import ScannerButton from '../../components/Scanner/ScannerButton';

import Loading from '../../components/Loading';


export default function CategoryProducts({ navigation }) {

  const [isLoading, setIsLoading] = useState(true)
  
  const [catProducts, setCatProducts] = useState([
    {
      id: 1,
      name: "Alimentação",
      image: require("../../images/foodImage.png")
    },
    {
      id: 2,
      name: "Limpeza",
      image: require("../../images/foodImage.png")
    },
    {
      id: 3,
      name: "Cama e banho",
      image: require("../../images/foodImage.png")
    },
    {
      id: 4,
      name: "Alimentação",
      image: require("../../images/foodImage.png")
    },
    {
      id: 5,
      name: "Limpeza",
      image: require("../../images/foodImage.png")
    },
    {
      id: 6,
      name: "Cama e banho",
      image: require("../../images/foodImage.png")
    },
    {
      id: 7,
      name: "Alimentação",
      image: require("../../images/foodImage.png")
    },
    {
      id: 8,
      name: "Limpeza",
      image: require("../../images/foodImage.png")
    },
    {
      id: 9,
      name: "Cama e banho",
      image: require("../../images/foodImage.png")
    },
    {
      id: 10,
      name: "Alimentação",
      image: require("../../images/foodImage.png")
    },
    {
      id: 11,
      name: "Limpeza",
      image: require("../../images/foodImage.png")
    },
    {
      id: 12,
      name: "Cama e banho",
      image: require("../../images/foodImage.png")
    },
    {
      id: 13,
      name: "Alimentação",
      image: require("../../images/foodImage.png")
    },
    {
      id: 14,
      name: "Limpeza",
      image: require("../../images/foodImage.png")
    },
    {
      id: 15,
      name: "Cama e banho",
      image: require("../../images/foodImage.png")
    },
    {
      id: 16,
      name: "Alimentação",
      image: require("../../images/foodImage.png")
    },
    {
      id: 17,
      name: "Limpeza",
      image: require("../../images/foodImage.png")
    },
    {
      id: 18,
      name: "Cama e banho",
      image: require("../../images/foodImage.png")
    },
  ])

  useEffect(() => {
    api.get("/consultas/CategoriasProdutos").then(response => {
      let listCategorys = response.data
      console.log('listCategorys:',listCategorys)
      if(listCategorys != null && listCategorys.length > 0){
        setCatProducts(listCategorys.map((item, index) => {
          return {
            name: capitalizeWords(item.nome),
            id: index + 1,
            image: require("../../images/foodImage.png")
          }
        }))
      }
      else{
        setCatProducts([])
      }
      setIsLoading(false)
    })
  }, [])

  function capitalizeWords(text) {
    return text.replace(/\b\w{3,}/g, (match) => match.charAt(0).toUpperCase() + match.slice(1));
  }

  return ( isLoading ?
    <Loading/> :
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
        style={styles.listCategorys}
        data={catProducts}
        numColumns={3}
        key={'_'}
        renderItem={({ item }) => {
          return (
            <Pressable style={styles.categoryItem} onPress={() => navigation.navigate("Produtos", {
              categoryName: item.name,
              supermarketName: null
            })}>
              <Image style={styles.categoryIcon} source={item.image}/>
              <Text style={[styles.categoryName, styles.customFonts]}>{item.name}</Text>
            </Pressable>
          )
        }}
      />
      <View style={{width: "80%"}}>
        <ScannerButton navigation={navigation} />
      </View>
    </SafeAreaView>
  )
}