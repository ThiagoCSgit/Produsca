import {
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Pressable,
  View,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import api from "../../service/api";

import Loading from "../../components/Loading";
import NoData from "../../components/NoData";

import { useIsFocused } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CategoryProducts({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [noData, setNoData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [shoppingList, setShoppingList] = useState(null);

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

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      hasPurchaseInProgress();
    }
  }, [isFocused]);

  async function hasPurchaseInProgress() {
    // await AsyncStorage.clear();
    let savedKeys = await AsyncStorage.getAllKeys();
    let filteredKey = savedKeys.find((key) => {
      if (key.includes("compra-iniciada")) {
        return key;
      }
    });
    if (filteredKey) {
      let shopping = await AsyncStorage.getItem(filteredKey);
      if (shopping) {
        setShoppingList(JSON.parse(shopping));
        setModalVisible(true);
      }
    } else {
      setModalVisible(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    setIsLoading(true);
    setNoData(null);
    try {
      api
        .get("/consultas/CategoriasProdutos")
        .then((response) => {
          let listCategorys = response.data;
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

  async function finishAndSave() {
    setModalVisible(false);
    let savedKeys = await AsyncStorage.getAllKeys();
    let purchaseKey = savedKeys.find((key) => {
      if (key.includes("compra-iniciada")) {
        return key;
      }
    });
    const tempPurchaseKey = purchaseKey.replace("-iniciada", "");
    let historyKey = savedKeys.find((key) => {
      if (key.includes("compra-historico")) {
        let tempHistoryKey = key.replace("-historico", "");
        return tempHistoryKey == tempPurchaseKey;
      }
    });
    await AsyncStorage.removeItem(purchaseKey);
    await AsyncStorage.removeItem(historyKey);
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
      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.containerModal}>
          <Text style={styles.modalText}>
            Há uma compra em andamento, gostaria de retornar a ela?
          </Text>
          <View style={styles.modalButtons}>
            <Pressable
              onPress={() => {
                finishAndSave();
              }}
              style={[
                styles.buttonModal,
                {
                  backgroundColor: "#eda7a7",
                  borderColor: "#eda7a7",
                },
              ]}
            >
              <Text style={[styles.buttonText, { color: "#fff" }]}>Não</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setModalVisible(false);
                setTimeout(() => {
                  navigation.navigate("Carrinho", {
                    list: shoppingList,
                    hasPurchaseInProgress: true,
                  });
                }, 100);
              }}
              style={[
                styles.buttonModal,
                {
                  backgroundColor: "#D4EEE2",
                  borderColor: "#D4EEE2",
                },
              ]}
            >
              <Text style={[styles.buttonText, { color: "#253D4E" }]}>Sim</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
