import { SafeAreaView, Text, Image, FlatList, Pressable, View, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import React, { useState, useEffect } from "react";
import styles from './styles';
import api from "../../service/api"

import Loading from '../../components/Loading';

export default function Supermarket({route, navigation}) {
  const supermarketInfos = {
    name: route.params.name,
    phone: route.params.phone,
    publicPlace: route.params.publicPlace,
    city: route.params.city,
    state: route.params.state,
    number: route.params.number
  }
  // const [supermarketInfos, setSupermarketInfos] = useState({address: "Rua da Fantasia, 645", contact: "(27) 33498522", name: route.params.name})
  const [isLoading, setIsLoading] = useState(true)
  const [supermarketProducts, setSupermarketProducts] = useState([
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
    // api.get(`//consultas/PrecosProdutosSupermercado?super=EPA`).then(response => {
    //   console.warn('response:',response.data)
    //   // setCatProducts(response.data)
    //   setIsLoading(false)
    // })
    api.get("/consultas/CategoriasProdutos").then(response => {
      console.warn('response categoria:',response.data)
      let listCategorys = response.data
      if(listCategorys != null && listCategorys.length > 0){
        setSupermarketProducts(listCategorys.map((item, index) => {
          return{
            name: item.nome,
            id: index + 1,
            image: require("../../images/foodImage.png")
          }
        }))
      }
      else{
        setSupermarketProducts([])
      }
      setIsLoading(false)
    })
  }, [])

  function callNumber(phoneNumber){
    Linking.openURL(`tel:${phoneNumber}`);
  }

  return ( 
    isLoading ? 
    <Loading/> :
    <SafeAreaView style={styles.container}>
      <View style={styles.supermarketInfos}>
        <Text style={styles.supermarketName}>{supermarketInfos.name}</Text>
        <View style={styles.callNumber}>
          <Text style={styles.supermarketInfo}>Telefone: {supermarketInfos.phone}</Text> 
          <Pressable style={styles.buttonCall} onPress={() => callNumber(supermarketInfos.phone)}>
            <Icon name="phone" size={22}/>
          </Pressable>
        </View>
        <Text style={styles.supermarketInfo}>
          Endereço: {'\n'} {supermarketInfos.publicPlace} {supermarketInfos.number} {'\n'}
          {supermarketInfos.district} {supermarketInfos.city}, {supermarketInfos.state}
        </Text>
      </View>
      <FlatList
        contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
        style={styles.listSupermarketCategorys}
        data={supermarketProducts}
        numColumns={3}
        key={'_'}
        renderItem={({item}) => {
          return (
            <Pressable style={styles.supermarketCategoryItem} onPress={() => navigation.navigate("Produtos", {
              supermarketName: supermarketInfos.name,
              categoryName: item.name
            })}>
              <Image style={styles.supermarketCategoryIcon} source={item.image}/>
              <Text style={styles.supermarketCategoryName}>{item?.name}</Text>
            </Pressable>
          )
        }}
      />
    </SafeAreaView>
  );
}
