import {
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Pressable,
  View,
  Linking,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import api from "../../service/api";

import Loading from "../../components/Loading";
import NoData from "../../components/NoData";

export default function Supermarket({ route, navigation }) {
  const supermarketInfos = {
    name: route.params.name,
    phone: route.params.phone,
    publicPlace: route.params.publicPlace,
    city: route.params.city,
    state: route.params.state,
    number: route.params.number,
    cnpj: route.params.cnpj,
  };
  const [isLoading, setIsLoading] = useState(true);
  const [supermarketProducts, setSupermarketProducts] = useState([]);
  const [noData, setNoData] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    setIsLoading(true);
    setNoData(null);
    api.get("/consultas/CategoriasProdutos").then((response) => {
      let listCategorys = response.data;
      if (listCategorys != null && listCategorys.length > 0) {
        setSupermarketProducts(
          listCategorys.map((item, index) => {
            return {
              name: capitalizeWords(item.nome),
              id: index + 1,
              image: `${item.link_imagem}`,
            };
          })
        );
      } else {
        let apiReturn = response.data;
        apiReturn.message =
          "Nenhuma categoria encontrada, tente novamente mais tarde";
        setNoData(apiReturn);
        setSupermarketProducts([]);
      }
      setIsLoading(false);
    });
  }

  function capitalizeWords(text) {
    return text.replace(
      /\b\w{3,}/g,
      (match) => match.charAt(0).toUpperCase() + match.slice(1)
    );
  }

  function callNumber(phoneNumber) {
    Linking.openURL(`tel:${phoneNumber}`);
  }

  function openMaps(address) {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;
    try {
      Linking.openURL(url);
    } catch (error) {
      console.warn(error);
    }
  }

  return isLoading ? (
    <Loading />
  ) : noData != null ? (
    <NoData message={noData.message} executeAction={getCategories} />
  ) : (
    supermarketProducts && (
      <SafeAreaView style={styles.container}>
        <View style={styles.supermarketInfos}>
          {supermarketInfos.name != "" ? (
            <Text style={styles.supermarketName}>{supermarketInfos.name}</Text>
          ) : (
            <Text style={{ fontFamily: "OpenSans_500Medium", fontSize: 18 }}>
              Nome do supermercado indisponível
            </Text>
          )}
          <TouchableOpacity
            style={styles.callNumber}
            onPress={() => callNumber(supermarketInfos.phone)}
          >
            <Text style={[styles.supermarketInfo, styles.phone]}>
              Telefone: {supermarketInfos.phone}
            </Text>
            <View style={styles.buttonCall}>
              <Icon name="phone-call" size={22} style={{ color: "#fff" }} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              openMaps(
                `${supermarketInfos.publicPlace} ${supermarketInfos.number} ${supermarketInfos.city} ${supermarketInfos.state}`
              )
            }
          >
            <Text style={[styles.supermarketInfo, { color: "#000" }]}>
              Endereço: {"\n"}
              <Text style={{ color: "#1E90FF" }}>
                {supermarketInfos.publicPlace} {supermarketInfos.number} {"\n"}
                {supermarketInfos.district} {supermarketInfos.city},{" "}
                {supermarketInfos.state}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
          style={styles.listSupermarketCategorys}
          data={supermarketProducts}
          numColumns={3}
          key={"_"}
          renderItem={({ item }) => {
            return (
              <Pressable
                style={styles.supermarketCategoryItem}
                onPress={() =>
                  navigation.navigate("Produtos", {
                    supermarketName: supermarketInfos.name,
                    categoryName: item.name,
                    cnpj: supermarketInfos.cnpj,
                  })
                }
              >
                {item.image && (
                  <Image
                    style={styles.supermarketCategoryIcon}
                    source={{ uri: item.image }}
                  />
                )}
                <Text style={styles.supermarketCategoryName}>{item?.name}</Text>
              </Pressable>
            );
          }}
        />
      </SafeAreaView>
    )
  );
}
