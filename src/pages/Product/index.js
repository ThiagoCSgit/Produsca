import {
  SafeAreaView,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Share,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { useIsFocused } from "@react-navigation/native";
import { LineChart } from "react-native-chart-kit";

import api from "../../service/api";

import Loading from "../../components/Loading";
import RadioButtonDays from "../../components/RadioButtonDays";
import NoData from "../../components/NoData";

import IconFE from "react-native-vector-icons/Feather";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function Products({ route, navigation }) {
  const { nameProduct, idProduct } = route.params;

  const [priceHistory, setPriceHistory] = useState([]);
  const [quantDays, setQuantDays] = useState(7);
  const [supermarktesAvailables, setSupermarktesAvailables] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [isLoadingMarkets, setIsLoadingMarkets] = useState(true);
  const [noData, setNoData] = useState(null);

  const isFocused = useIsFocused();

  // useEffect(() => {
  //   getCheckProducts()
  // }, [isFocused])

  useEffect(() => {
    getPriceHistory();
    // getCheckProducts()
    getSupermarketsProduct();
  }, []);

  useEffect(() => {
    getPriceHistory();
  }, [quantDays]);

  function callApis() {
    setIsLoadingHistory(true);
    setIsLoadingMarkets(true);
    setNoData(null);

    getPriceHistory();
    getSupermarketsProduct();
  }

  function getPriceHistory() {
    try {
      let nameNoSpace = nameProduct.split(/\s+/).join("").toLowerCase();
      let dataInicial = format(new Date(), "yyyy-MM-dd");
      let dataFinal = new Date();
      dataFinal.setDate(dataFinal.getDate() - quantDays);
      dataFinal = format(dataFinal, "yyyy-MM-dd");
      console.log(
        `/consultas/HistoricoPrecoGeral?nomeproduto=${nameNoSpace}?dataInicial=${dataInicial}?dataFinal=${dataFinal}`
      );
      // api.get(`/consultas/HistoricoPrecoGeral?nomeproduto=${nameNoSpace}?dataInicial=2023-08-01?dataFinal=2023-07-25`).then(response => {
      api
        .get(`/consultas/HistoricoPrecoGeral?nomeproduto=batata`)
        .then((response) => {
          let historic = response.data;
          console.log("historico response:", response.data);
          if (historic != null && historic.length > 0) {
            setPriceHistory(response.data);
          } else {
            setNoData(historic);
          }
          setIsLoadingHistory(false);
        });
    } catch (error) {
      console.log("error:", error);
    }
  }

  function getSupermarketsProduct() {
    let nameNoSpace = nameProduct.split(/\s+/).join("").toLowerCase();
    console.log(`/consultas/SupermercadosProduto?nomeproduto=${nameNoSpace}`);
    try {
      api
        .get(`/consultas/SupermercadosProduto?nomeProduto=${nameNoSpace}`)
        .then((response) => {
          console.log("response supermercados produtos:", response.data);
          // setSupermarktesAvailables(response.data)
          let listMarkets = response.data;
          if (listMarkets != null && listMarkets.length > 0) {
            setSupermarktesAvailables(
              listMarkets.map((item, index) => {
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
                };
              })
            );
          } else {
            setSupermarktesAvailables([]);
            setNoData;
          }
          setIsLoadingMarkets(false);
        });
    } catch (error) {
      console.log("error:", error);
    }
  }

  // async function getCheckProducts() {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem(`produto-lista-${idProduct}`);
  //     const value = jsonValue != null ? JSON.parse(jsonValue) : {}
  //     setInCart(value.inCart)
  //   } catch (e) {
  //     console.warn('error', e)
  //   }
  // }

  const onShare = async () => {
    const result = await Share.share({
      message: `O ${nameProduct} está no precinho aqui no Produsca, o seu app de busca`,
    });
  };

  return isLoadingHistory && isLoadingMarkets ? (
    <Loading />
  ) : noData != null ? (
    <NoData message={noData.message} executeAction={callApis} />
  ) : (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.nameProduct}>{nameProduct}</Text>
        <View>
          {priceHistory.length > 0 && (
            <LineChart
              data={{
                labels: priceHistory.map((item) => {
                  return format(new Date(`${item.data}`), "dd MMMM yy", {
                    locale: ptBR,
                  });
                }),
                datasets: [
                  {
                    data: priceHistory.map((item) => item.preco),
                  },
                ],
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
                  stroke: "#00f1ff",
                },
              }}
              bezier
              style={{
                marginTop: 20,
                borderRadius: 5,
              }}
            />
          )}
          <View style={styles.selectDays}>
            {
              <RadioButtonDays
                quantDays={quantDays}
                setQuantDays={setQuantDays}
              />
            }
          </View>
          <View>
            <View style={styles.listSupermarktesAvailables}>
              <Text
                style={{
                  fontSize: 20,
                  marginBottom: 10,
                  fontFamily: "OpenSans_500Medium",
                }}
              >
                Disponível em:
              </Text>
              {supermarktesAvailables.map((item) => (
                <View style={styles.itemSupermarket}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      paddingBottom: 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Supermercado", {
                          name: item.name,
                          phone: item.phone,
                          publicPlace: item.publicPlace,
                          district: item.district,
                          city: item.city,
                          state: item.state,
                          number: item.number,
                        })
                      }
                    >
                      <Text
                        style={{
                          color: "#1E90FF",
                          fontSize: 20,
                          fontFamily: "OpenSans_500Medium",
                        }}
                      >
                        Supermercado {item.name}
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#140F07",
                        fontFamily: "OpenSans_500Medium",
                      }}
                    >
                      {" "}
                      - R${item.product?.preco}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.buttonHistoric}
                    onPress={() =>
                      navigation.navigate("Detalhes do Produto", {
                        supermarket: item.name,
                        nameProduct: nameProduct,
                        idProduct: idProduct,
                        // funcAddRemoveCart: funcAddRemoveCart
                      })
                    }
                  >
                    <Text style={styles.buttonHistoricText}>
                      Histórico de preço
                    </Text>
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
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity onPress={onShare} style={styles.buttonShare}>
                  <Text style={styles.shareText}>Compartilhar oferta</Text>
                  <View style={styles.shareIcon}>
                    <IconFE
                      style={{ color: "#fff" }}
                      name="share-2"
                      size={27}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              {/* </View> */}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
