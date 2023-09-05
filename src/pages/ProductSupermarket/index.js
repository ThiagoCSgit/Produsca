import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  Share,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { useIsFocused } from "@react-navigation/native";
import { LineChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../service/api";

import Icon from "react-native-vector-icons/Feather";

import Loading from "../../components/Loading";
import RadioButtonDays from "../../components/RadioButtonDays";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function ProductSupermarket({ route, navigation }) {
  const { nameProduct, idProduct, supermarket, barCode, cnpj } = route.params;
  console.log(route.params);
  const [priceHistory, setPriceHistory] = useState([]);
  // const [inCart, setInCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [quantDays, setQuantDays] = useState(7);

  const isFocused = useIsFocused();

  // useEffect(() => {
  //   getCheckProducts();
  // }, [isFocused]);

  useEffect(() => {
    getHistoricoPreco();
    // getCheckProducts();
  }, []);

  // useEffect(() => {
  //   console.log("quantDays detalhes:", quantDays);
  // }, [quantDays]);

  function getHistoricoPreco() {
    let dataFinal = format(new Date(), "yyyy-MM-dd");
    let dataInicial = new Date();
    dataInicial.setDate(dataInicial.getDate() - quantDays);
    dataInicial = format(dataInicial, "yyyy-MM-dd");
    console.warn(
      `/consultas/HistoricoPrecoSupermercado?codigo_barra=${barCode}&CNPJSupermercado=${cnpj}&dataInicio=${dataInicial}&dataFinal=${dataFinal}`
    );
    try {
      api
        .get(
          `/consultas/HistoricoPrecoSupermercado?codigo_barra=${barCode}&CNPJSupermercado=${cnpj}&dataInicio=${dataInicial}&dataFinal=${dataFinal}`
        )
        // api
        //   .get(
        //     `/consultas/HistoricoPrecoSupermercado?nomeProduto=batata&supermercado=EPA`
        //   )
        .then((response) => {
          console.warn("response.data:", response.data);
          setPriceHistory(response.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log("error:", error);
    }
  }

  // async function getCheckProducts() {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem(
  //       `produto-lista-${supermarket}-${idProduct}-${nameProduct}`
  //     );
  //     const value = jsonValue != null ? JSON.parse(jsonValue) : {};
  //     setInCart(value.inCart);
  //   } catch (e) {
  //     console.warn("error", e);
  //   }
  // }

  const onShare = async () => {
    const result = await Share.share({
      message: `O(A) ${nameProduct} no ${supermarket} está no precinho aqui no Produsca, o seu app de busca`,
    });
  };

  return isLoading ? (
    <Loading />
  ) : (
    <SafeAreaView style={styles.container}>
      <Text style={styles.nameProduct}>
        {nameProduct} - {supermarket}
      </Text>
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
                fontSize: 14, // Defina o tamanho da fonte desejado aqui
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
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={onShare} style={styles.buttonShare}>
            <Text style={styles.shareText}>Compartilhar oferta</Text>
            <View style={styles.shareIcon}>
              <Icon style={{ color: "#fff" }} name="share-2" size={27} />
            </View>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.buttonsArea}>
          <Pressable
            onPress={() => executeAction(inCart, idProduct, supermarket)}
          >
            <View style={{ flexDirection: "row", marginLeft: 10 }}>
              <Checkbox value={inCart} style={{ height: 25, width: 25 }} />
              <Text style={styles.labelCheckBox}>Adicionar ao carrinho</Text>
            </View>
          </Pressable>
          <Pressable onPress={onShare}>
            <Icon
              style={{ marginRight: 25, height: 30, width: 30 }}
              name="share-2"
              size={27}
            />
          </Pressable>
        </View> */}
      </View>
    </SafeAreaView>
  );
}
