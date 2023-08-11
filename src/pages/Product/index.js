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

import Loading from '../../components/Loading';
import RadioButtonDays from '../../components/RadioButtonDays';

import IconFE from 'react-native-vector-icons/Feather';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Products({ route, navigation }) {
  const {nameProduct, idProduct, funcAddRemoveCart} = route.params

  const [priceHistory, setPriceHistory] = useState([])
  const [inCart, setInCart] = useState(false)
  const [quantDays, setQuantDays] = useState(7)
  const [supermarktesAvailables, setSupermarktesAvailables] = useState([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)
  const [isLoadingMarkets, setIsLoadingMarkets] = useState(true)
  

  const isFocused = useIsFocused();


  useEffect(() => {
    getCheckProducts()
  }, [isFocused])

  useEffect(() => {
    // getHistoricoPreco()
    getCheckProducts()
    getSupermarketsProduct()
  }, [])

  useEffect(() => {
    getHistoricoPreco()
  }, [quantDays])

  
  function getHistoricoPreco(){
    try{
      let nameNoSpace = nameProduct.split(/\s+/).join('').toLowerCase()
      let dataInicial = format(new Date(), 'yyyy-MM-dd')
      let dataFinal = new Date()
      dataFinal.setDate(dataFinal.getDate() - quantDays)
      dataFinal = format(dataFinal, 'yyyy-MM-dd')
      console.log(`/consultas/HistoricoPrecoGeral?nomeproduto=${nameNoSpace}?dataInicial=${dataInicial}?dataFinal=${dataFinal}`)
      // api.get(`/consultas/HistoricoPrecoGeral?nomeproduto=${nameNoSpace}?dataInicial=2023-08-01?dataFinal=2023-07-25`).then(response => {
      api.get(`/consultas/HistoricoPrecoGeral?nomeproduto=batata`).then(response => {
        setPriceHistory(response.data)
        setIsLoadingHistory(false)
      })
    } catch(error){
      console.log('error:',error)
    }
  }
  
  function getSupermarketsProduct(){
    try{
      // api.get(`/consultas/SupermercadosProduto?nomeproduto=${route.params?.nameProduct.toLowerCase()}`).then(response => {
      api.get(`/consultas/SupermercadosProduto?nomeProduto=batata`).then(response => {
        console.log('response supermercados produtos:', response.data)
        setSupermarktesAvailables(response.data)
        let listMarkets = response.data
        if (listMarkets != null && listMarkets.length > 0){
          setSupermarktesAvailables(listMarkets.map((item, index) => {
            return {
              id: index + 1,
              name: item.nome,
              city: item.cidade,
              state: item.estado,
              publicPlace: item.logradouro,
              number: item.numero,
              phone: item.telefone || "(27) 33984455",
              district: item.bairro,
              product: item.produto,
              image: require("../../images/icone_mercado.png"),
            }
          }))
        }
        else{
          setSupermarktesAvailables([])
        }
        setIsLoadingMarkets(false)
      })
    } catch(error){
      console.log('error:',error)
    }

  }


  async function getCheckProducts() {
    try {
      const jsonValue = await AsyncStorage.getItem(`produto-lista-${idProduct}`);
      const value = jsonValue != null ? JSON.parse(jsonValue) : {}
      setInCart(value.inCart)
    } catch (e) {
      console.warn('error', e)
    }
  }


  function executeAction(){
    funcAddRemoveCart(!inCart, idProduct)
    setInCart(!inCart)
  }

  const onShare = async () => {
    const result = await Share.share({
      message: `O ${nameProduct} está no precinho aqui no Produsca, o seu app de busca`,
    });
  };

  return ( isLoadingHistory && isLoadingMarkets ?
    <Loading/> :
    <ScrollView>
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
                    fontSize: 15, // Defina o tamanho da fonte desejado aqui
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
            <View style={styles.selectDays}>
              {
                <RadioButtonDays quantDays={quantDays} setQuantDays={setQuantDays}/>
              }
            </View>
            <View>
              <View style={styles.listSupermarktesAvailables}>
                <Text style={{fontSize: 20, marginBottom: 10, fontFamily: "OpenSans_500Medium"}}>Disponível em:</Text>
                {supermarktesAvailables.map(item => (
                  <View style={styles.itemSupermarket}>
                    <View style={{flexDirection: "row", justifyContent: "center", paddingBottom: 10}}>
                      <TouchableOpacity onPress={() => navigation.navigate("Supermercado", {
                        name: item.name,
                        phone: item.phone,
                        publicPlace: item.publicPlace,
                        district: item.district,
                        city: item.city,
                        state: item.state,
                        number: item.number
                      })}>
                        <Text style={{color: "#1E90FF", fontSize: 20, fontFamily: "OpenSans_500Medium"}}>
                          Supermercado {item.name}
                        </Text>
                      </TouchableOpacity>
                      <Text style={{fontSize: 20, color: "#623b32", fontFamily: "OpenSans_500Medium"}}> - R${item.product?.preco}</Text>
                    </View>
                    <TouchableOpacity style={styles.buttonHistoric} onPress={() => 
                      navigation.navigate("Detalhes do Produto", {
                        supermarket: item.name,
                        nameProduct: nameProduct,
                        idProduct: idProduct,
                        funcAddRemoveCart: funcAddRemoveCart
                      })
                    }>
                      <Text style={styles.buttonHistoricText}>Histórico de preço</Text>
                    </TouchableOpacity>
                  </View>
                ))}
                {/* <View style={styles.buttonsArea}> */}
                  {/* <Pressable onPress={() => executeAction(inCart, idProduct)}>
                    <View style={{flexDirection: "row", marginLeft: 10}}>
                      <Checkbox
                        value={inCart}
                        style={{height: 25, width: 25}}
                      />
                      <Text style={styles.labelCheckBox}>Adicionar ao carrinho</Text>
                    </View>
                  </Pressable> */}
                  <TouchableOpacity onPress={onShare} style={styles.buttonShare}>
                    <Text style={styles.shareText}>Compartilhar</Text>
                    <View style={styles.shareIcon}>
                      <IconFE style={{color: "#fff"}} name="share-2" size={27} />
                    </View>
                  </TouchableOpacity>
                {/* </View> */} 
              </View>
            </View>
          </View>
      </SafeAreaView>
    </ScrollView>
  )
}