import { SafeAreaView, Text, Image, FlatList, Pressable, View } from 'react-native';
import styles from './styles';
import React, { useState } from "react";
import ScannerButton from '../../components/Scanner/ScannerButton';

export default function Supermarkets({navigation}) {

  const [supermarkets, setSupermarkets] = useState([
    {
      id: 1,
      name: "Extrabom",
      image: require("../../images/foodImage.png"),
      address: "Rua da Fantasia",
      city: "Vila Velha"
    },
    {
      id: 2,
      name: "Perim",
      image: require("../../images/foodImage.png"),
      address: "Rua da Fantasia 2",
      city: "Vitória"
    },
    {
      id: 3,
      name: "Carone",
      image: require("../../images/foodImage.png"),
      address: "Rua da Fantasia 3",
      city: "Vitória"
    },
    {
      id: 4,
      name: "Epa",
      image: require("../../images/foodImage.png"),
      address: "Rua da Fantasia 4",
      city: "Serra"
    },
    {
      id: 5,
      name: "Mineirão",
      image: require("../../images/foodImage.png"),
      address: "Rua da Fantasia 5",
      city: "Vila Velha"
    },
    {
      id: 6,
      name: "Atacadão",
      image: require("../../images/foodImage.png"),
      address: "Rua da Fantasia 6",
      city: "Vila Velha"
    },
  ])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.listSupermarkets}
        data={supermarkets}
        numColumns={1}
        key={'_'}
        renderItem={({item}) => {
          return (
            <Pressable style={styles.supermarketItem} onPress={() => navigation.navigate("Supermercado", {
              name: item.name
            })}>
              <Image style={styles.supermarketIcon} source={item.image}/>
              <View>
                <Text style={styles.supermarketName}>{item.name} - {item.city}</Text>
                <Text style={styles.supermarketName}>{item.address}</Text>
              </View>
            </Pressable>
          )
        }}
      />
      <ScannerButton navigation={navigation}/>
    </SafeAreaView>
  );
}
