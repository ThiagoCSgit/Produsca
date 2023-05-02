import { SafeAreaView, Text, Image, FlatList, Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Checkbox from 'expo-checkbox';
import React, { useState } from "react"
import styles from './styles';

export default function Products({route}) {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Bacon",
      image: require("../../images/foodImage.png"),
      mark: "Cofril",
      price: "10,90",
      minPrice: "1,23",
      maxPrice: "72,23",
    },
    {
      id: 2,
      name: "Sobrecoxa de Frango",
      image: require("../../images/foodImage.png"),
      mark: "Perdigão",
      price: "15,90",
      minPrice: "1,23",
      maxPrice: "72,23",
    },
    {
      id: 3,
      name: "Filé Mingnon",
      image: require("../../images/foodImage.png"),
      mark: "Montana",
      price: "22,90",
      minPrice: "1,23",
      maxPrice: "72,23",
    },
    {
      id: 4,
      name: "Banana Ouro",
      image: require("../../images/foodImage.png"),
      mark: "",
      price: "9,75",
      minPrice: "1,23",
      maxPrice: "72,23",
    },
    {
      id: 5,
      name: "Manga Tommy Atkins",
      image: require("../../images/foodImage.png"),
      mark: "",
      price: "4,73",
      minPrice: "1,23",
      maxPrice: "72,23",
    },
    {
      id: 6,
      name: "Tomate Orgânico",
      image: require("../../images/foodImage.png"),
      mark: "Viver",
      price: "10,80",
      minPrice: "1,23",
      maxPrice: "72,23",
    },
  ])

  const [productsSelecteds, setProdutctsSelecteds] = useState([])
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

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
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
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
