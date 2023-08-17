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
import IconE from "react-native-vector-icons/EvilIcons";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";
import IconAD from "react-native-vector-icons/AntDesign";

import { LinearGradient } from "expo-linear-gradient";

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
        const newProduct = JSON.parse(product[1]);
        return newProduct;
      });
      console.warn("preenchendo cartList:", newList);
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

  async function increaseQuantity(id, supermarket = null) {
    let newList = [...cartList];

    setCartList(
      newList.map((item) => {
        if (item.id == id) {
          item.qtd++;
        }
        return item;
      })
    );

    let itemToAdd = cartList.find((item) => item.id == id);
    itemToAdd.supermarket = supermarket;
    id = supermarket
      ? `produto-lista-${supermarket}-${id}`
      : `produto-lista-${id}`;
    try {
      await AsyncStorage.setItem(id, JSON.stringify(itemToAdd));
    } catch (e) {
      console.warn("error:", e);
    }
  }

  async function decreaseQuantity(id, supermarket = null) {
    let newList = [...cartList];

    setCartList(
      newList.map((item) => {
        if (item.id == id && item.qtd > 1) {
          item.qtd--;
        }
        return item;
      })
    );

    let itemToAdd = cartList.find((item) => item.id == id);
    itemToAdd.supermarket = supermarket;
    id = supermarket
      ? `produto-lista-${supermarket}-${id}`
      : `produto-lista-${id}`;
    try {
      await AsyncStorage.setItem(id, JSON.stringify(itemToAdd));
    } catch (e) {
      console.warn("error:", e);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {cartList.length > 0 ? (
        <View style={styles.screenList}>
          <FlatList
            data={cartList}
            numColumns={1}
            key={"_"}
            renderItem={({ item }) => {
              return (
                <View style={styles.itemCart}>
                  <Text style={styles.itemName}>
                    {item.supermarket
                      ? `${item.name} \n R$${item.price} - ${item.supermarket}`
                      : `${item.name}`}
                  </Text>
                  <View style={styles.quantItems}>
                    <IconAD
                      name="minuscircleo"
                      size={30}
                      onPress={() =>
                        decreaseQuantity(item.id, item.supermarket)
                      }
                    />
                    <Text style={styles.quantityValue}>{item.qtd}</Text>
                    <IconAD
                      name="pluscircleo"
                      size={30}
                      onPress={() =>
                        increaseQuantity(item.id, item.supermarket)
                      }
                    />
                    <IconE
                      style={styles.iconTrash}
                      name="trash"
                      size={45}
                      onPress={() =>
                        removeItem(
                          item.supermarket
                            ? `produto-lista-${item.supermarket}-${item.id}`
                            : `produto-lista-${item.id}`
                        )
                      }
                    />
                  </View>
                </View>
              );
            }}
          />
          <LinearGradient
            colors={[
              "#f09c33",
              "#f59234",
              "#f98736",
              "#fd7b38",
              "#ff6e3c",
              "#ff5f41",
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            <TouchableOpacity
              style={styles.buttonSimulate}
              onPress={() =>
                navigation.navigate("Supermacados para Comprar", {
                  list: cartList,
                })
              }
            >
              <IconMCI
                style={styles.iconCalculator}
                name="calculator-variant-outline"
                size={25}
              />
              <Text style={styles.textButton}>Simular Compra</Text>
            </TouchableOpacity>
          </LinearGradient>
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
