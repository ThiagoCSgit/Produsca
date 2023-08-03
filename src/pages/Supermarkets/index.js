import { SafeAreaView, Text, Image, FlatList, Pressable, View, Modal, TouchableOpacity } from 'react-native';
import styles from './styles';
import React, { useState, useEffect } from "react";
import ScannerButton from '../../components/Scanner/ScannerButton';
import Loading from '../../components/Loading';
import * as Location from 'expo-location';
import IconAD from 'react-native-vector-icons/AntDesign';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'

import Slider from '@react-native-community/slider';

import api from "../../service/api"


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
  const [modalVisible, setModalVisible] = useState(false);
  const [range, setRange] = useState(1000);
  const [previousRange, setPreviousRange] = useState(0)

  useEffect(() => {
    getLocation()
  }, [])

  useEffect(() => {
    console.log('myLocation:',myLocation)
    console.log('range:',range)
    console.log('previousRange:',previousRange)
    if(myLocation && !modalVisible && (range != previousRange)){
      // console.log('lat:',myLocation.coords.latitude)
      // console.log('lon:',myLocation.coords.longitude)
      setPreviousRange(range)
      console.log('chamou a rota')
      api.get(`/consultas/SupermercadosProximos?latitude=${myLocation.coords.latitude}&longitude=${myLocation.coords.longitude}&raioDistancia=${range}`).then(response => {
        console.warn('response:',response.data)
        let listMarkets = response.data
        if (listMarkets != null && listMarkets.length > 0){
          setSupermarkets(listMarkets.map((item, index) => {
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
        }
        else{
          setSupermarkets([])
        }
        setIsLoading(false)
      })
    }
  }, [myLocation, range, modalVisible])

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
    <SafeAreaView style={[styles.container, {backgroundColor: modalVisible ? 'rgba(122, 118, 114, 0.4)' : '#fff'}]}>
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
      <View style={{gap: 10}}>
        <View style={{opacity: modalVisible ? 0.4 : 1}}>
          <ScannerButton navigation={navigation}/>
        </View>
        <TouchableOpacity style={[styles.buttonRange, {opacity: modalVisible ? 0.4 : 1}]} onPress={() => setModalVisible(!modalVisible)}>
          <IconMCI style={styles.iconGPS} name='crosshairs-gps' size={25}/>
          <Text style={styles.textButtonRange}>Ajustar distância</Text>
        </TouchableOpacity>
        <Modal
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          animationType="fade"
          transparent={true}
        >
            <View style={styles.containerModal}>
              <Pressable style={styles.closeButton} onPress={() => setModalVisible(!modalVisible)}>
                <IconAD name='close' size={27}/>
              </Pressable>
              <Text style={styles.rangeLabel}>Raio de alcance {'\n'} {range}m</Text>
              <Slider
                style={{width: 250, height: 50}}
                minimumValue={1000}
                maximumValue={10000}
                onValueChange={value => setRange(parseInt(value))}
                value={range}
                step={50}
                minimumTrackTintColor='#1E90FF'
                thumbTintColor='#1E90FF'
              />
            </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
