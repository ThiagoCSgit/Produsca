import { SafeAreaView, Text, Image, FlatList, Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import React, { useState } from "react";
import styles from './styles';
import ShopCartButton from '../../components/Cart/ShopCartButton';

export default function Supermarket({route, navigation}) {
  const [supermarketInfos, setSupermarketInfos] = useState({address: "Rua da Fantasia, 645", contact: "(27) 33498522", name: route.params.name})
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


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.supermarketInfos}>
        <View style={{flexDirection: 'row', textAlign: 'center'}}>
          <Text style={styles.supermarketInfo}>Telefone: {supermarketInfos.contact}</Text> 
          <Icon style={styles.iconPhone} name="phone" size={18}/>
        </View>
        <Text style={styles.supermarketInfo}>Endereço: {supermarketInfos.address}</Text>
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
