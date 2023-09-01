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
  const { categoryName, supermarketName } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [noData, setNoData] = useState(null);
  // const [products, setProducts] = useState([
  //   {
  //     id: "1",
  //     name: "Laranja",
  //     image: require("../../images/foodImage.png"),
  //     qtd: 0,
  //     mark: "Cofril",
  //     price: "10,90",
  //     minPrice: "1,23",
  //     maxPrice: "72,23",
  //   },
  //   {
  //     id: "2",
  //     name: "Sobrecoxa de Frango",
  //     image: require("../../images/foodImage.png"),
  //     qtd: 0,
  //     mark: "Perdigão",
  //     price: "15,90",
  //     minPrice: "1,23",
  //     maxPrice: "72,23",
  //   },
  //   {
  //     id: "3",
  //     name: "Filé Mingnon",
  //     image: require("../../images/foodImage.png"),
  //     qtd: 0,
  //     mark: "Montana",
  //     price: "22,90",
  //     minPrice: "1,23",
  //     maxPrice: "72,23",
  //   },
  //   {
  //     id: "4",
  //     name: "Banana Ouro",
  //     image: require("../../images/foodImage.png"),
  //     qtd: 0,
  //     mark: "",
  //     price: "9,75",
  //     minPrice: "1,23",
  //     maxPrice: "72,23",
  //   },
  //   {
  //     id: "5",
  //     name: "Manga Tommy Atkins",
  //     image: require("../../images/foodImage.png"),
  //     qtd: 0,
  //     mark: "",
  //     price: "4,73",
  //     minPrice: "1,23",
  //     maxPrice: "72,23",
  //   },
  //   {
  //     id: "6",
  //     name: "Tomate Orgânico",
  //     image: require("../../images/foodImage.png"),
  //     qtd: 0,
  //     mark: "Viver",
  //     price: "10,80",
  //     minPrice: "1,23",
  //     maxPrice: "72,23",
  //   },
  // ]);
  const [products, setProducts] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    console.warn("executorando getCategorys");
    getCategoryProducts();
  }, []);

  useMemo(() => {
    if (isFocused && !isLoading && products.length > 0) {
      return getCheckProducts();
    }
  }, [isFocused, isLoading]);

  useEffect(() => {
    console.warn("modificação em products:", products);
  }, [products]);

  async function getCategoryProducts() {
    setIsLoading(true);
    setNoData(null);

    if (supermarketName) {
      // let nameNoSpace = supermarketName.split(/\s+/).join("").toLowerCase();
      // console.log(`rota super: /consultas/ProdutosCategoriaSupermercados?categoria=${categoryName}&NomeSupermercado=${nameNoSpace}`)
      api
        .get(
          `/consultas/ProdutosCategoriaSupermercados?categoria=${categoryName}&NomeSupermercado=${supermarketName}`
        )
        .then((response) => {
          console.warn("response da api:", response.data);
          let listProd = response.data;
          if (listProd != null && listProd.length > 0) {
            setProducts(
              listProd.map((item, index) => {
                return {
                  id: `${index + 1}-${item.nome}`,
                  name: item.nome,
                  image: `${item.link_imagem}`,
                  price: "10,80",
                  qtd: 0,
                };
              })
            );
            api
              .get(`/consultas/PrecosProdutosSupermercado?super=EPA`)
              .then((response) => {
                // console.warn('response:',response.data)
                // setCatProducts(response.data)
                setIsLoading(false);
              });
          } else {
            setProducts([]);
            setNoData(response.data);
          }
          setIsLoading(false);
        });
    } else {
      // console.log(`/consultas/ProdutosCategoria?categoria=${categoryName}`)
      api
        .get(`/consultas/ProdutosCategoria?categoria=${categoryName}`)
        .then((response) => {
          console.warn("response sem supermercado:", response.data);
          let listProd = response.data;
          if (listProd != null && listProd.length > 0) {
            setProducts(
              listProd.map((item, index) => {
                console.log(" o nome:", item.nome);
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
      // await AsyncStorage.clear();
      let newList = [...products];
      // console.log('newList recebendo products:',newList)
      newList.forEach((item) => {
        item.qtd = 0;
      });

      let productChecked = null;
      console.warn("newList antes:", newList);
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
        console.warn("productChecked dentro do for:", productChecked);
        if (productChecked != null) {
          // productChecked = JSON.parse(productChecked);
          if (
            item.id == productChecked.id &&
            categoryName == productChecked.category
          ) {
            newList[i] = productChecked;
          }
        }
      }
      console.warn("newList depois:", newList);
      setProducts(newList);
    } catch (e) {
      console.warn("error", e);
    }
  }

  function randomIdGeneretor(length) {
    const caracteres =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length);
      id += caracteres.charAt(randomIndex);
    }

    return id;
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
      console.log("id:", id);
      console.log("itemToAdd:", itemToAdd);
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
    console.warn("asyncStorage:", asyncStorage);
    let productsOnList = asyncStorage.filter((item) =>
      item.includes("produto-lista")
    );
    console.log("clear id:", id, "supermarket:", supermarket);
    if (!supermarket) {
      productsOnList.forEach(async (item) => {
        if (item.includes(`produto-lista-${supermarket}-`)) {
          console.log("item de outro mercado:", item);
          await AsyncStorage.removeItem(item);
        }
      });
    } else {
      productsOnList.forEach(async (item) => {
        if (item.includes(`produto-lista-noMarket-`)) {
          console.log("item sem mercado:", item);
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
          supermarketName
            ? categoryName + " - " + supermarketName
            : categoryName
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
                // alignItems: "center",
              }}
            >
              <Pressable
                style={styles.productItem}
                onPress={() =>
                  supermarketName
                    ? navigation.navigate("Detalhes do Produto", {
                        supermarket: supermarketName,
                        nameProduct: item.name,
                        idProduct: item.id,
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
                  // source={item.image}
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
