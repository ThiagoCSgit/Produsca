import {
  SafeAreaView,
  Text,
  Image,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconF from "react-native-vector-icons/Feather";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";
import IconAD from "react-native-vector-icons/AntDesign";

export default function ShoppingList({ navigation }) {
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    getCartProducts();
  }, []);

  async function getCartProducts() {
    try {
      let productKeys = await AsyncStorage.getAllKeys();

      let filteredKeys = productKeys.filter((key) => {
        if (key.includes("produto-lista-")) {
          return key;
        }
      });
      let products = await AsyncStorage.multiGet(filteredKeys);
      let newList = products.map((product) => {
        return JSON.parse(product[1]);
      });
      setCartList(newList);
    } catch (e) {
      console.warn("error", e);
    }
  }

  async function removeItem(id, callGetCart = true) {
    try {
      await AsyncStorage.removeItem(id);
      if (callGetCart) {
        getCartProducts();
      }
    } catch (e) {
      console.warn("error", e);
    }
  }

  async function increaseQuantity(id, cnpj) {
    let newList = [...cartList];
    let currentProduct = "";

    setCartList(
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
      cnpj,
      currentProduct.name
    );
  }

  async function decreaseQuantity(id, cnpj) {
    let newList = [...cartList];
    let currentProduct = "";

    setCartList(
      newList.map((item) => {
        if (item.id == id && item.qtd > 1) {
          item.qtd--;
          currentProduct = item;
        }
        return item;
      })
    );

    addOrRemoveToShopCart(
      currentProduct.id,
      currentProduct.qtd,
      cnpj,
      currentProduct.name
    );
  }

  async function addOrRemoveToShopCart(idProd, qtd, cnpj) {
    let id = cnpj
      ? `produto-lista-${cnpj}-${idProd}`
      : `produto-lista-noMarket-${idProd}`;
    if (qtd > 0) {
      let itemToAdd = cartList.find((item) => item.id == idProd);
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

  return (
    <SafeAreaView style={styles.container}>
      {cartList.length > 0 ? (
        <View
          style={{
            width: "100%",
            flex: 1,
          }}
        >
          <FlatList
            contentContainerStyle={{
              gap: 20,
            }}
            data={cartList}
            numColumns={1}
            key={"_"}
            renderItem={({ item }) => {
              return (
                <View style={styles.itemCart}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.itemName}>
                      {item.supermarket
                        ? `${item.name} \nR$${item.price} - ${item.supermarket}`
                        : `${item.name}`}
                    </Text>
                    <View style={styles.quantItems}>
                      <IconAD
                        name="minuscircleo"
                        color="#253D4E"
                        size={25}
                        onPress={() => decreaseQuantity(item.id, item.cnpj)}
                      />
                      <Text style={styles.quantityValue}>{item.qtd}</Text>
                      <IconAD
                        name="pluscircleo"
                        color="#253D4E"
                        size={25}
                        onPress={() => increaseQuantity(item.id, item.cnpj)}
                      />
                    </View>
                  </View>
                  <View>
                    <IconF
                      color="#dc3546"
                      name="trash-2"
                      size={25}
                      onPress={() =>
                        removeItem(
                          item.supermarket
                            ? `produto-lista-${item.cnpj}-${item.id}`
                            : `produto-lista-noMarket-${item.id}`
                        )
                      }
                    />
                  </View>
                </View>
              );
            }}
          />
          <View
            style={{
              position: "relative",
              top: 15,
            }}
          >
            <TouchableOpacity
              style={styles.buttonSimulate}
              onPress={() => {
                navigation.navigate("Supermercados disponíveis", {
                  list: cartList,
                });
              }}
            >
              <IconMCI
                style={styles.iconCalculator}
                name="calculator-variant-outline"
                size={25}
              />
              <Text style={styles.textButton}>Simular Compra</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <Image
            style={styles.emptyCartImage}
            source={require("../../images/shoppingCart.png")}
          />
          <Text style={styles.labelEmptyCart}>Sua lista está vazia</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
