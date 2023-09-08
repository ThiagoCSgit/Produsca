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

import { LineChart } from "react-native-chart-kit";

import api from "../../service/api";

import Loading from "../../components/Loading";
import RadioButtonDays from "../../components/RadioButtonDays";

import IconFE from "react-native-vector-icons/Feather";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function Products({ route, navigation }) {
  const { nameProduct } = route.params;

  const [priceHistory, setPriceHistory] = useState([]);
  const [quantDays, setQuantDays] = useState(7);
  const [supermarktesAvailables, setSupermarktesAvailables] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [isLoadingMarkets, setIsLoadingMarkets] = useState(true);

  useEffect(() => {
    getPriceHistory();
    getSupermarketsProduct();
  }, []);

  useEffect(() => {
    getPriceHistory();
  }, [quantDays]);

  function getPriceHistory() {
    setIsLoadingHistory(true);
    try {
      let dataFinal = format(new Date(), "yyyy-MM-dd");
      let dataInicial = new Date();
      dataInicial.setDate(dataInicial.getDate() - quantDays);
      dataInicial = format(dataInicial, "yyyy-MM-dd");
      console.warn(
        `/consultas/HistoricoPrecoGeral?nome_produto=${nameProduct}&dataInicial=${dataInicial}&dataFinal=${dataFinal}`
      );
      api
        .get(
          `/consultas/HistoricoPrecoGeral?nome_produto=${nameProduct}&dataInicial=${dataInicial}&dataFinal=${dataFinal}`
        )
        .then((response) => {
          let historic = response.data;
          console.warn("historico response:", response.data);
          if (historic != null && historic?.listPrecoGeral.length > 0) {
            setPriceHistory(historic.listPrecoGeral);
          } else {
            setPriceHistory(historic);
          }
          setIsLoadingHistory(false);
        });
    } catch (e) {
      console.log("e:", e);
      setIsLoadingHistory(false);
    }
  }

  function getSupermarketsProduct() {
    console.warn(`/consultas/SupermercadosProduto?nome_produto=${nameProduct}`);
    try {
      api
        .get(`/consultas/SupermercadosProduto?nome_produto=${nameProduct}`)
        .then((response) => {
          let listMarkets = response.data;
          if (listMarkets != null && listMarkets.length > 0) {
            setSupermarktesAvailables(
              listMarkets.map((item, index) => {
                console.warn("item da lista:", item);
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
          }
          setIsLoadingMarkets(false);
        });
    } catch (e) {
      console.log("e:", e);
      setIsLoadingMarkets(false);
    }
  }

  function convertToReal(value) {
    return Number.parseFloat(value).toLocaleString("pt-br", {
      minimumFractionDigits: 2,
    });
  }

  const onShare = async () => {
    const result = await Share.share({
      message: `O(A) ${
        supermarktesAvailables[0].product.nome
      } está custando${supermarktesAvailables.map(
        (item) =>
          ` ${convertToReal(item.product.preco)}${
            item.name ? ` no ${item.name}` : ""
          }`
      )}, aqui no Produsca, confira!`,
    });
  };

  setTimeout(() => {
    setIsLoadingMarkets(false);
    setIsLoadingHistory(false);
  }, 3000);

  return isLoadingHistory || isLoadingMarkets ? (
    <Loading />
  ) : (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.nameProduct}>{nameProduct}</Text>
        <View style={{ alignItems: "center" }}>
          {priceHistory.length > 0 ? (
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
          ) : (
            <View
              style={{
                height: 200,
                width: "100%",
                paddingHorizontal: 10,
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.message}>{priceHistory.message}</Text>
            </View>
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
            {supermarktesAvailables.length > 0 && (
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
                            fontSize: 18,
                            fontFamily: "OpenSans_500Medium",
                          }}
                        >
                          {item.name || "Supermercado"}
                        </Text>
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 18,
                          color: "#140F07",
                          fontFamily: "OpenSans_500Medium",
                        }}
                      >
                        {" "}
                        - R${convertToReal(item.product?.preco)}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.buttonHistoric}
                      onPress={() =>
                        navigation.navigate("Detalhes do Produto", {
                          supermarket: item.name,
                          nameProduct: nameProduct,
                          cnpj: item.cnpj,
                          barCode: item.product?.codigo_barra,
                          price: item.product?.preco,
                        })
                      }
                    >
                      <Text style={styles.buttonHistoricText}>
                        Histórico de preço
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={onShare}
                    style={styles.buttonShare}
                  >
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
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
