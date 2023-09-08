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
import { LineChart } from "react-native-chart-kit";
import api from "../../service/api";

import Icon from "react-native-vector-icons/Feather";

import Loading from "../../components/Loading";
import RadioButtonDays from "../../components/RadioButtonDays";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function ProductSupermarket({ route, navigation }) {
  const { nameProduct, supermarket, barCode, cnpj, price } = route.params;
  const [priceHistory, setPriceHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantDays, setQuantDays] = useState(7);

  useEffect(() => {
    getHistoricoPreco();
  }, []);

  useEffect(() => {
    getHistoricoPreco();
  }, [quantDays]);

  function getHistoricoPreco() {
    setIsLoading(true);
    let dataFinal = format(new Date(), "yyyy-MM-dd");
    let dataInicial = new Date();
    dataInicial.setDate(dataInicial.getDate() - quantDays);
    dataInicial = format(dataInicial, "yyyy-MM-dd");

    try {
      api
        .get(
          `/consultas/HistoricoPrecoSupermercado?${
            barCode ? `codigo_barra=${barCode}` : `nome_produto=${nameProduct}`
          }&CNPJSupermercado=${cnpj}&dataInicio=${dataInicial}&dataFinal=${dataFinal}`
        )
        .then((response) => {
          let historic = response.data;
          if (historic != null && historic.listPrecoGeral.length > 0) {
            setPriceHistory(historic.listPrecoGeral);
          } else {
            setPriceHistory(historic);
          }
          setIsLoading(false);
        });
    } catch (error) {
      console.log("error:", error);
      setIsLoading(false);
    }
  }

  function convertToReal(value) {
    return Number.parseFloat(value).toLocaleString("pt-br", {
      minimumFractionDigits: 2,
    });
  }

  const onShare = async () => {
    await Share.share({
      message: `O(A) ${nameProduct}${
        supermarket ? ` no${supermarket}` : ""
      } está custando apenas R$${convertToReal(price)} no Produsca, confira!`,
    });
  };

  return isLoading ? (
    <Loading />
  ) : (
    <SafeAreaView style={styles.container}>
      <Text style={styles.nameProduct}>
        {nameProduct} {supermarket && `- ${supermarket}`}
      </Text>
      <View>
        {priceHistory.length > 0 ? (
          <LineChart
            data={{
              labels: priceHistory.map((item) => {
                return format(new Date(`${item.data}`), "dd/MM/yy", {
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
        ) : (
          <View
            style={{
              height: 200,
              alignItems: "center",
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
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={onShare} style={styles.buttonShare}>
            <Text style={styles.shareText}>Compartilhar oferta</Text>
            <View style={styles.shareIcon}>
              <Icon style={{ color: "#fff" }} name="share-2" size={27} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
