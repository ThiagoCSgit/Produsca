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
      console.log("productKeys getCart:", productKeys);

      let filteredKeys = productKeys.filter((key) => {
        if (key.includes("produto-lista-")) {
          return key;
        }
      });

      let products = await AsyncStorage.multiGet(filteredKeys);
      let newList = products.map((product) => {
        return JSON.parse(product[1]);
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
      : `produto-lista-noMarket-${id}`;
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
    console.log("item adicionado:", itemToAdd);
    id = supermarket
      ? `produto-lista-${supermarket}-${id}`
      : `produto-lista-noMarket-${id}`;
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
            contentContainerStyle={{ marginTop: 30, gap: 30 }}
            data={cartList}
            numColumns={1}
            key={"_"}
            renderItem={({ item }) => {
              return (
                <View style={styles.itemCart}>
                  <View style={{ width: "80%" }}>
                    <Text style={styles.itemName}>
                      {item.supermarket
                        ? `${item.name} \n R$${item.price} - ${item.supermarket}`
                        : `${item.name}`}
                    </Text>
                    <View style={styles.quantItems}>
                      <IconAD
                        name="minuscircleo"
                        color="#253D4E"
                        size={25}
                        onPress={() =>
                          decreaseQuantity(item.id, item.supermarket)
                        }
                      />
                      <Text style={styles.quantityValue}>{item.qtd}</Text>
                      <IconAD
                        name="pluscircleo"
                        color="#253D4E"
                        size={25}
                        onPress={() =>
                          increaseQuantity(item.id, item.supermarket)
                        }
                      />
                    </View>
                  </View>
                  <IconF
                    color="#dc3546"
                    name="trash-2"
                    style={{ marginBottom: 13 }}
                    size={25}
                    onPress={() =>
                      removeItem(
                        item.supermarket
                          ? `produto-lista-${item.supermarket}-${item.id}`
                          : `produto-lista-noMarket-${item.id}`
                      )
                    }
                  />
                </View>
              );
            }}
          />
          <TouchableOpacity
            style={styles.buttonSimulate}
            onPress={() => {
              console.warn("tem produto pra simular:", cartList);
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
