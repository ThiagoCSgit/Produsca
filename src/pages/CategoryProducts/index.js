import {
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Pressable,
  View,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import api from "../../service/api";

import Loading from "../../components/Loading";
import NoData from "../../components/NoData";

import { usePurchaseStatus } from "../../context/PurchaseStatusProvide";

import { useIsFocused } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CategoryProducts({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [noData, setNoData] = useState(null);

  const [catProducts, setCatProducts] = useState([
    {
      id: 1,
      name: "Alimentação",
      image: require("../../images/foodImage.png"),
    },
    {
      id: 2,
      name: "Limpeza",
      image: require("../../images/foodImage.png"),
    },
    {
      id: 3,
      name: "Cama e banho",
      image: require("../../images/foodImage.png"),
    },
    {
      id: 4,
      name: "Alimentação",
      image: require("../../images/foodImage.png"),
    },
    {
      id: 5,
      name: "Limpeza",
      image: require("../../images/foodImage.png"),
    },
    {
      id: 6,
      name: "Cama e banho",
      image: require("../../images/foodImage.png"),
    },
    {
      id: 7,
      name: "Alimentação",
      image: require("../../images/foodImage.png"),
    },
    {
      id: 8,
      name: "Limpeza",
      image: require("../../images/foodImage.png"),
    },
    {
      id: 9,
      name: "Cama e banho",
      image: require("../../images/foodImage.png"),
    },
    {
      id: 10,
      name: "Alimentação",
      image: require("../../images/foodImage.png"),
    },
    {
      id: 11,
      name: "Limpeza",
      image: require("../../images/foodImage.png"),
    },
    {
      id: 12,
      name: "Cama e banho",
      image: require("../../images/foodImage.png"),
    },
    {
      id: 13,
      name: "Alimentação",
      image: require("../../images/foodImage.png"),
    },
    {
      id: 14,
      name: "Limpeza",
      image: require("../../images/foodImage.png"),
    },
    {
      id: 15,
      name: "Cama e banho",
      image: require("../../images/foodImage.png"),
    },
    {
      id: 16,
      name: "Alimentação",
      image: require("../../images/foodImage.png"),
    },
    {
      id: 17,
      name: "Limpeza",
      image: require("../../images/foodImage.png"),
    },
    {
      id: 18,
      name: "Cama e banho",
      image: require("../../images/foodImage.png"),
    },
  ]);

  const { purchaseInProgress } = usePurchaseStatus();
  const isFocused = useIsFocused();
  useEffect(() => {
    hasPurchaseInProgress();
  }, [isFocused]);

  async function hasPurchaseInProgress() {
    let shopping = await AsyncStorage.getItem("compra-iniciada");
    console.warn("shopping:", shopping);
    if (shopping) {
      Alert.alert("Havia uma compra em andamento, deseja retornar a ela?");
    }
  }

  useEffect(() => {
    getCategories();
    console.warn("purchaseInProgress categorias:", purchaseInProgress);
  }, []);

  async function getCategories() {
    setIsLoading(true);
    setNoData(null);
    try {
      api
        .get("/consultas/CategoriasProdutos")
        .then((response) => {
          let listCategorys = response.data;
          // console.log('listCategorys:',listCategorys)
          if (listCategorys != null && listCategorys.length > 0) {
            setCatProducts(
              listCategorys.map((item, index) => {
                return {
                  name: capitalizeWords(item.nome),
                  id: index + 1,
                  image: require("../../images/foodImage.png"),
                };
              })
            );
          } else {
            setCatProducts([]);
            setNoData(response.data);
          }
          setIsLoading(false);
        })
        .catch((e) => {
          console.warn("erro:", e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  function capitalizeWords(text) {
    return text.replace(
      /\b\w{3,}/g,
      (match) => match.charAt(0).toUpperCase() + match.slice(1)
    );
  }

  return isLoading ? (
    <Loading />
  ) : noData != null ? (
    <NoData message={noData.message} executeAction={getCategories} />
  ) : (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
        style={styles.listCategorys}
        data={catProducts}
        numColumns={3}
        key={"_"}
        renderItem={({ item }) => {
          return (
            <Pressable
              style={styles.categoryItem}
              onPress={() =>
                navigation.navigate("Produtos", {
                  categoryName: item.name,
                  supermarketName: null,
                })
              }
            >
              <Image style={styles.categoryIcon} source={item.image} />
              <Text style={[styles.categoryName, styles.customFonts]}>
                {item.name}
              </Text>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}
