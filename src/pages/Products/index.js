import { SafeAreaView, Text, Image, FlatList, Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import React, { useState } from "react"
import styles from './styles';

export default function Products({route}) {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Bacon",
      image: require("../../images/foodImage.png")
    },
    {
      id: 2,
      name: "Sobrecoxa",
      image: require("../../images/foodImage.png")
    },
    {
      id: 3,
      name: "Filé Mingnon",
      image: require("../../images/foodImage.png")
    },
    {
      id: 4,
      name: "Banana",
      image: require("../../images/foodImage.png")
    },
    {
      id: 5,
      name: "Manga",
      image: require("../../images/foodImage.png")
    },
    {
      id: 6,
      name: "Tomate",
      image: require("../../images/foodImage.png")
    },
  ])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleIcon}>
        <Text style={styles.titlePage}>
          {`${route.params?.supermarketName ? route.params.categoryName + ' - ' + route.params.supermarketName : route.params.categoryName}`}
        </Text>
        <Icon style={[styles.iconCart, !route.params?.supermarketName && styles.modifyPositionIcon]} name="shoppingcart" size={25}/>
      </View>
      <FlatList
        contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
        style={styles.listProducts}
        data={products}
        numColumns={3}
        key={'_'}
        renderItem={({item}) => {
          return (
            <Pressable style={styles.productItem}>
              <Image style={styles.productIcon} source={item.image}/>
              <Text style={styles.productName}>{item.name}</Text>
            </Pressable>
          )
        }}
      />
    </SafeAreaView>
  );
}
