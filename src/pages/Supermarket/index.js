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
  // const [supermarketInfos, setSupermarketInfos] = useState({address: "Rua da Fantasia, 645", contact: "(27) 33498522", name: route.params.name})
  const [isLoading, setIsLoading] = useState(true);
  // const [supermarketProducts, setSupermarketProducts] = useState([
  //   {
  //     id: 1,
  //     name: "Alimentação",
  //     image: require("../../images/foodImage.png"),
  //   },
  //   {
  //     id: 2,
  //     name: "Limpeza",
  //     image: require("../../images/foodImage.png"),
  //   },
  //   {
  //     id: 3,
  //     name: "Cama e banho",
  //     image: require("../../images/foodImage.png"),
  //   },
  //   {
  //     id: 4,
  //     name: "Alimentação",
  //     image: require("../../images/foodImage.png"),
  //   },
  //   {
  //     id: 5,
  //     name: "Limpeza",
  //     image: require("../../images/foodImage.png"),
  //   },
  //   {
  //     id: 6,
  //     name: "Cama e banho",
  //     image: require("../../images/foodImage.png"),
  //   },
  //   {
  //     id: 7,
  //     name: "Alimentação",
  //     image: require("../../images/foodImage.png"),
  //   },
  //   {
  //     id: 8,
  //     name: "Limpeza",
  //     image: require("../../images/foodImage.png"),
  //   },
  //   {
  //     id: 9,
  //     name: "Cama e banho",
  //     image: require("../../images/foodImage.png"),
  //   },
  //   {
  //     id: 10,
  //     name: "Alimentação",
  //     image: require("../../images/foodImage.png"),
  //   },
  //   {
  //     id: 11,
  //     name: "Limpeza",
  //     image: require("../../images/foodImage.png"),
  //   },
  //   {
  //     id: 12,
  //     name: "Cama e banho",
  //     image: require("../../images/foodImage.png"),
  //   },
  //   {
  //     id: 13,
  //     name: "Alimentação",
  //     image: require("../../images/foodImage.png"),
  //   },
  //   {
  //     id: 14,
  //     name: "Limpeza",
  //     image: require("../../images/foodImage.png"),
  //   },
  //   {
  //     id: 15,
  //     name: "Cama e banho",
  //     image: require("../../images/foodImage.png"),
  //   },
  //   {
  //     id: 16,
  //     name: "Alimentação",
  //     image: require("../../images/foodImage.png"),
  //   },
  //   {
  //     id: 17,
  //     name: "Limpeza",
  //     image: require("../../images/foodImage.png"),
  //   },
  //   {
  //     id: 18,
  //     name: "Cama e banho",
  //     image: require("../../images/foodImage.png"),
  //   },
  // ]);
  const [supermarketProducts, setSupermarketProducts] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    setIsLoading(true);
    api.get("/consultas/CategoriasProdutos").then((response) => {
      console.warn("response categoria:", response.data);
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
  ) : (
    supermarketProducts && (
      <SafeAreaView style={styles.container}>
        <View style={styles.supermarketInfos}>
          <Text style={styles.supermarketName}>{supermarketInfos.name}</Text>
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
