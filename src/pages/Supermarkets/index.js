import { SafeAreaView, Text, Image, FlatList, Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import React, { useState } from "react";

export default function Supermarkets({navigation}) {

  const [supermarkets, setSupermarkets] = useState([
    {
      id: 1,
      name: "Extrabom",
      image: require("../../images/foodImage.png")
    },
    {
      id: 2,
      name: "Perim",
      image: require("../../images/foodImage.png")
    },
    {
      id: 3,
      name: "Carone",
      image: require("../../images/foodImage.png")
    },
    {
      id: 4,
      name: "Epa",
      image: require("../../images/foodImage.png")
    },
    {
      id: 5,
      name: "Mineirão",
      image: require("../../images/foodImage.png")
    },
    {
      id: 6,
      name: "Atacadão",
      image: require("../../images/foodImage.png")
    },
  ])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleIcon}>
        <View>
          <View style={styles.iconCamera}>
            <Icon name="camerao" size={25}/>
          </View>
          <Text>QR Code</Text>
        </View>
        <Text style={styles.titlePage}>Lista de supermercados</Text>
        <Icon name="shoppingcart" size={25}/>
      </View>
      <FlatList
        contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
        style={styles.listSupermarkets}
        data={supermarkets}
        numColumns={3}
        key={'_'}
        renderItem={({item}) => {
          return (
            <Pressable style={styles.supermarketItem} onPress={() => navigation.navigate("Supermercado", {
              name: item.name
            })}>
              <Image style={styles.supermarketIcon} source={item.image}/>
              <Text style={styles.supermarketName}>{item.name}</Text>
            </Pressable>
          )
        }}
      />
    </SafeAreaView>
  );
}
