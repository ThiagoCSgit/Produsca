import { SafeAreaView, Text, Image, FlatList, Pressable, View } from 'react-native';
import styles from './styles';
import React, { useState, useEffect } from "react";
import ScannerButton from '../../components/Scanner/ScannerButton';
import * as Location from 'expo-location';

import api from "../../service/api"

import Loading from '../../components/Loading';

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
  const [myLocation, setMyLocation] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getLocation()
  }, [])

  useEffect(() => {
    if(myLocation){
      console.warn('lat:',myLocation.coords.latitude)
      console.warn('lon:',myLocation.coords.longitude)
      api.get(`consultas/SupermercadosProximos?latitude=${myLocation.coords.latitude}&longitude=${myLocation.coords.longitude}`).then(response => {
        console.warn('response:',response.data)
        setSupermarkets(response.data.map((item, index) => {
          return {
            id: index + 1,
            name: item.nome,
            city: item.cidade,
            state: item.estado,
            publicPlace: item.logradouro,
            number: item.numero,
            phone: item.telefone,
            rate: item.avaliacao,
            district: item.bairro,
            image: require("../../images/foodImage.png"),
          }
        }))
        // setCatProducts(response.data)
        setIsLoading(false)
      })
    }
  }, [myLocation])

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('A permissão para acessar o local foi negada');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.warn('location aqui:',location)
    setMyLocation(location);
  }

  return ( isLoading ? 
    <Loading/> :
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.listSupermarkets}
        data={supermarkets}
        numColumns={1}
        key={'_'}
        renderItem={({item}) => {
          return (
            <Pressable style={styles.supermarketItem} onPress={() => navigation.navigate("Supermercado", {
              name: item.name,
              phone: item.phone,
              publicPlace: item.publicPlace,
              district: item.district,
              city: item.city,
              state: item.state,
              number: item.number
            })}>
              <Image style={styles.supermarketIcon} source={item.image}/>
              <View>
                <Text style={styles.supermarketName}>{item.name} - {item.city}</Text>
                <Text style={styles.supermarketName}>{item.publicPlace}, 
                  {'\n'}{item.number}
                </Text>
              </View>
            </Pressable>
          )
        }}
      />
      <ScannerButton navigation={navigation}/>
    </SafeAreaView>
  );
}
