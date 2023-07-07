import { 
  SafeAreaView, 
  Dimensions, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  Pressable, 
  View,
  Share
} from 'react-native';
import Checkbox from 'expo-checkbox';
import React, { useEffect, useState } from "react"
import styles from './styles';
import { useIsFocused } from "@react-navigation/native";
import { LineChart } from "react-native-chart-kit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../service/api';

import Icon from 'react-native-vector-icons/Feather';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Products({ route, navigation }) {
  const {nameProduct, idProduct, supermarket, funcAddRemoveCart} = route.params

  const [priceHistory, setPriceHistory] = useState([])
  const [inCart, setInCart] = useState(false)
  const [supermarktesAvailables, setSupermarktesAvailables] = useState([])
  const isFocused = useIsFocused();


  useEffect(() => {
    getCheckProducts()
  }, [isFocused])

  useEffect(() => {
    getHistoricoPreco()
    getCheckProducts()
    getSupermarketsProduct()
  }, [])
  
  function getHistoricoPreco(){
    try{
      // api.get(`/consultas/HistoricoPrecoGeral?nomeproduto=${route.params?.nameProduct.toLowerCase()}`).then(response => {
      api.get(`/consultas/HistoricoPrecoGeral?nomeproduto=batata`).then(response => {
        setPriceHistory(response.data)
      })
    } catch(error){
      console.log('error:',error)
    }
  }
  
  function getSupermarketsProduct(){
    try{
      // api.get(`/consultas/HistoricoPrecoGeral?nomeproduto=${route.params?.nameProduct.toLowerCase()}`).then(response => {
      api.get(`/consultas/SupermercadosProduto?nomeProduto=batata`).then(response => {
        setSupermarktesAvailables(response.data)
      })
    } catch(error){
      console.log('error:',error)
    }

  }

  async function getCheckProducts() {
    try {
      const jsonValue = await AsyncStorage.getItem(`${idProduct}`);
      const value = jsonValue != null ? JSON.parse(jsonValue) : {}
      setInCart(value.inCart)
    } catch (e) {
      console.warn('error', e)
    }
  }


  function executeAction(){
    funcAddRemoveCart(!inCart, idProduct, supermarket)
    setInCart(!inCart)
  }

  const onShare = async () => {
    const result = await Share.share({
      message: `O ${nameProduct} está no precinho aqui no Produsca, o seu app de busca`,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.nameProduct}>{nameProduct}</Text>
      <View>
        {
          priceHistory.length > 0 &&
          <LineChart
            data={{
              labels: priceHistory.map(item => {
                return format(new Date(`${item.data}`), 'dd MMMM yy', { locale: ptBR });
              }),
              datasets: [{
                data: priceHistory.map(item => item.preco)
              }]
            }}
            width={Dimensions.get("window").width - 20} // from react-native
            height={320}
            yAxisLabel="R$"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundGradientFrom: "#5682e8",
              backgroundGradientTo: "#005fff",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              propsForLabels: {
                fontSize: 14, // Defina o tamanho da fonte desejado aqui
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#00f1ff"
              }
            }}
            bezier
            style={{
              marginTop: 20,
              borderRadius: 5,
            }}
          />
        }
        <View style={{maxHeight: "40%"}}>
          <ScrollView style={styles.listSupermarktesAvailables}>
            <Text style={{fontSize: 20, marginBottom: 10}}>Disponível em:</Text>
            {supermarktesAvailables.map(item => (
              <View style={{height: 50, flexDirection: "row", marginTop: 10}}>
                <TouchableOpacity>
                  <Text style={{color: "#1E90FF", fontSize: 20}}>
                    Supermercado {item.nome}
                  </Text>
                </TouchableOpacity>
                <Text style={{fontSize: 20}}> - R${item.produto.preco}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <Pressable style={styles.buttonsArea} onPress={() => executeAction(inCart, idProduct, supermarket)}>
          <View style={{flexDirection: "row", marginLeft: 10}}>
            <Checkbox
              value={inCart}
              style={{height: 25, width: 25}}
            />
            <Text style={styles.labelCheckBox}>Adicionar ao carrinho</Text>
          </View>
          <Pressable onPress={onShare}>
            <Icon style={{marginRight: 25, height: 30, width: 30}} name="share-2" size={27} />
          </Pressable>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}