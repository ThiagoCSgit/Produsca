import {
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Pressable,
  View,
} from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import api from "../../service/api";

import Loading from "../../components/Loading";
import NoData from "../../components/NoData";

import Icon from "react-native-vector-icons/AntDesign";

export default function Products({ route, navigation }) {
  const { categoryName, supermarketName, cnpj } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [noData, setNoData] = useState(null);
  const [products, setProducts] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getCategoryProducts();
  }, []);

  useMemo(() => {
    if (isFocused && !isLoading && products.length > 0) {
      return getCheckProducts();
    }
  }, [isFocused, isLoading]);

  async function getCategoryProducts() {
    setIsLoading(true);
    setNoData(null);

    if (supermarketName || cnpj) {
      api
        .get(
          `/consultas/ProdutosCategoriaSupermercados?categoria=${categoryName}&${
            cnpj
              ? `CNPJSupermercado=${cnpj}`
              : `NomeSupermercado=${supermarketName}`
          }`
        )
        .then((response) => {
          let listProd = response.data;
          if (listProd != null && listProd.length > 0) {
            setProducts(
              listProd.map((item, index) => {
                return {
                  id: `${index + 1}-${item.nome}`,
                  name: item.nome,
                  image: `${item.link_imagem}`,
                  price: item.preco,
                  bar_code: item.codigo_barra,
                  qtd: 0,
                };
              })
            );
          } else {
            setProducts([]);
            setNoData(response.data);
          }
          setIsLoading(false);
        });
    } else {
      api
        .get(`/consultas/ProdutosCategoria?categoria=${categoryName}`)
        .then((response) => {
          let listProd = response.data;
          if (listProd != null && listProd.length > 0) {
            setProducts(
              listProd.map((item, index) => {
                return {
                  id: `${index + 1}-${item.nome}`,
                  name: item.nome,
                  image: `${item.link_imagem}`,
                  price: item.preco,
                  qtd: 0,
                };
              })
            );
          } else {
            setProducts([]);
            setNoData(response.data);
          }
          setIsLoading(false);
        });
    }
  }

  async function getCheckProducts() {
    try {
      let newList = [...products];
      newList.forEach((item) => {
        item.qtd = 0;
      });

      let productChecked = null;
      for (let i = 0; i < newList.length; i++) {
        item = newList[i];
        if (supermarketName) {
          productChecked = JSON.parse(
            await AsyncStorage.getItem(
              `produto-lista-${supermarketName}-${item.id}-${item.name}`
            )
          );
        } else {
          productChecked = JSON.parse(
            await AsyncStorage.getItem(
              `produto-lista-noMarket-${item.id}-${item.name}`
            )
          );
        }
        if (productChecked != null) {
          if (
            item.id == productChecked.id &&
            categoryName == productChecked.category
          ) {
            newList[i] = productChecked;
          }
        }
      }
      setProducts(newList);
    } catch (e) {
      console.warn("error", e);
    }
  }

  function increaseQuantity(id, supermarket = null) {
    let newList = [...products];
    let currentProduct = "";

    setProducts(
      newList.map((item) => {
        if (item.id == id) {
          item.qtd++;
          currentProduct = item;
        }
        return item;
      })
    );

    addOrRemoveToShopCart(
      currentProduct.id,
      currentProduct.qtd,
      supermarket,
      currentProduct.name
    );
  }

  function decreaseQuantity(id, supermarket = null) {
    let newList = [...products];
    let currentProduct = "";

    setProducts(
      newList.map((item) => {
        if (item.id == id && item.qtd > 0) {
          item.qtd--;
          currentProduct = item;
        }
        return item;
      })
    );

    addOrRemoveToShopCart(
      currentProduct.id,
      currentProduct.qtd,
      supermarket,
      currentProduct.name
    );
  }

  async function addOrRemoveToShopCart(idProd, qtd, supermarket, productName) {
    let id = supermarket
      ? `produto-lista-${supermarket}-${idProd}-${productName}`
      : `produto-lista-noMarket-${idProd}-${productName}`;

    cleanShoppingList(supermarket, id);

    if (qtd > 0) {
      let itemToAdd = products.find((item) => item.id == idProd);
      itemToAdd.supermarket = supermarket;
      itemToAdd.category = categoryName;
      try {
        await AsyncStorage.setItem(id, JSON.stringify(itemToAdd));
      } catch (e) {
        console.warn("error:", e);
      }
    } else {
      try {
        await AsyncStorage.removeItem(id);
      } catch (e) {
        console.warn("error", e);
      }
    }
  }

  async function cleanShoppingList(supermarket, id) {
    let asyncStorage = await AsyncStorage.getAllKeys();
    let productsOnList = asyncStorage.filter((item) =>
      item.includes("produto-lista")
    );
    if (!supermarket) {
      productsOnList.forEach(async (item) => {
        if (item.includes(`produto-lista-${supermarket}-`)) {
          await AsyncStorage.removeItem(item);
        }
      });
    } else {
      productsOnList.forEach(async (item) => {
        if (item.includes(`produto-lista-noMarket-`)) {
          await AsyncStorage.removeItem(item);
        }
      });
    }
  }

  return isLoading ? (
    <Loading />
  ) : noData != null ? (
    <NoData message={noData.message} executeAction={getCategoryProducts} />
  ) : (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titlePage}>
        {`${
          supermarketName ? categoryName + "\n" + supermarketName : categoryName
        }`}
      </Text>
      <FlatList
        style={styles.listProducts}
        contentContainerStyle={{ gap: 30 }}
        data={products}
        numColumns={1}
        key={"_"}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                borderWidth: 1,
                borderColor: "#D4EEE2",
                borderRadius: 10,
                paddingHorizontal: 10,
              }}
            >
              <Pressable
                style={styles.productItem}
                onPress={() =>
                  supermarketName
                    ? navigation.navigate("Detalhes do Produto", {
                        supermarket: supermarketName,
                        nameProduct: item.name,
                        barCode: item.bar_code,
                        cnpj: cnpj,
                        price: item.price,
                      })
                    : navigation.navigate("Produto", {
                        nameProduct: item.name,
                        idProduct: item.id,
                      })
                }
              >
                <Image
                  style={styles.productIcon}
                  source={{ uri: item.image }}
                />
                <View style={styles.productInfos}>
                  <Text style={styles.nameProduct}>{item.name}</Text>
                  {supermarketName && (
                    <Text style={styles.nameProduct}>R$ {item.price}</Text>
                  )}
                </View>
              </Pressable>
              <View style={styles.quantItems}>
                <Icon
                  name="minuscircleo"
                  color="#253D4E"
                  size={25}
                  onPress={() => decreaseQuantity(item.id, supermarketName)}
                />
                <Text style={styles.quantityValue}>{item.qtd}</Text>
                <Icon
                  name="pluscircleo"
                  color="#253D4E"
                  size={25}
                  onPress={() => increaseQuantity(item.id, supermarketName)}
                />
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
