import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/AntDesign";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

export default function CollapseProductsList({
  state,
  showButton = false,
  navigation = null,
}) {
  const [visible, setVisible] = useState([]);
  const [purchaseInProgress, setPurchaseInProgress] = useState(null);
  const isFocused = useIsFocused();

  console.warn("state collapse:", state);

  useEffect(() => {
    if (isFocused) {
      getPurchaseInProgress();
    }
  }, [isFocused]);

  useEffect(() => {
    console.warn("useEffect pro visible");
    if (state.length > 0) {
      console.warn("map do visible");
      let visibleList = state.map((item) => {
        return {
          id: item.id,
          open: false,
        };
      });
      console.warn("visibleList:", visibleList);
      setVisible(visibleList);
    }
  }, [state]);

  function openCloseCollapse(id) {
    const updatedVisible = visible.map((item) => {
      if (item.id == id) {
        item.open = !item.open;
      }
      return item;
    });
    setVisible(updatedVisible);
  }

  async function startShopping(list, supermarketName) {
    // setPurchaseInProgress(true);
    navigation.navigate("Carrinho", {
      list: list,
    });
    let savedKeys = await AsyncStorage.getAllKeys();
    let historyKey = savedKeys.find((key) => {
      if (key.includes("compra-historico")) {
        return key;
      }
    });
    let purchaseKey = savedKeys.find((key) => {
      if (key.includes("compra-iniciada")) {
        return key;
      }
    });
    let id = `compra-iniciada-${supermarketName}`;
    if (purchaseKey) {
      if (purchaseKey != `compra-iniciada-${supermarketName}`) {
        console.warn("comprando em outro supermercado");
        console.warn("comprando em outro supermercado historyKey:", historyKey);
        await AsyncStorage.removeItem(purchaseKey);
        await AsyncStorage.removeItem(historyKey);

        let shoppingList = list;
        console.warn(
          "iniciando uma nova compra em outro supermercado de id:",
          id,
          "shoppingList:",
          shoppingList
        );
        await AsyncStorage.setItem(id, JSON.stringify(shoppingList));
      } else {
        console.warn("id para continuar uma compra:", id);
        let shoppingList = JSON.parse(await AsyncStorage.getItem(purchaseKey));
        console.warn("shoppingList para continuar uma compra:", shoppingList);
        await AsyncStorage.setItem(id, JSON.stringify(shoppingList));
      }
      // console.warn("uma compra em andamento, teste:", purchaseKey);
      // console.warn(
      //   "uma compra em andamento, purchaseInProgress:",
      //   purchaseInProgress
      // );
      // console.warn(
      //   "uma compra em andamento, supermarketName:",
      //   supermarketName
      // );
    } else {
      try {
        id = `compra-iniciada-${supermarketName}`;
        let shoppingList = list;
        console.warn(
          "iniciando uma compra do zero de id:",
          id,
          "shoppingList:",
          shoppingList
        );
        await AsyncStorage.setItem(id, JSON.stringify(shoppingList));
      } catch (e) {
        console.warn(e);
      }
    }
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

  // async function hasPurchaseInProgress() {
  //   let savedKeys = await AsyncStorage.getAllKeys();
  //   let filteredKey = savedKeys.find((key) => {
  //     if (key.includes("compra-iniciada")) {
  //       return key;
  //     }
  //   });
  //   console.warn("has filteredKey:", filteredKey);
  //   return filteredKey;
  // }

  async function getPurchaseInProgress() {
    let savedKeys = await AsyncStorage.getAllKeys();
    let purchaseKey = savedKeys.find((key) => {
      if (key.includes("compra-iniciada")) {
        return key;
      }
    });
    console.warn("sub string antes:", purchaseKey);
    console.log("sub string antes:", purchaseKey);
    if (purchaseKey) {
      console.warn("sub string:", purchaseKey);
      setPurchaseInProgress(purchaseKey.substring(16));
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          paddingHorizontal: 15,
        }}
      >
        {state &&
          visible.length > 0 &&
          state.map((item, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.card,
                  styles.shadow,
                  !visible[index]?.open && styles.p15,
                ]}
              >
                <View
                  style={[{ gap: 15 }, !showButton && { paddingBottom: 15 }]}
                >
                  <TouchableOpacity
                    style={styles.buttonOpenCollapse}
                    onPress={() => openCloseCollapse(item.id)}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: "OpenSans_500Medium",
                        color: "#253D4E",
                      }}
                    >
                      {item.supermarket.name}
                    </Text>
                    {visible[index]?.open ? (
                      <Icon name="down" color="#253D4E" size={20} />
                    ) : (
                      <Icon name="right" color="#253D4E" size={20} />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => callNumber(item.supermarket.phone)}
                  >
                    <Text style={styles.supermarketInfos}>
                      Contanto: {item.supermarket.phone}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      openMaps(
                        `${item.supermarket.publicPlace} ${item.supermarket.number} ${item.supermarket.city} ${item.supermarket.state}`
                      )
                    }
                  >
                    <Text style={styles.supermarketInfos}>
                      {item.supermarket.publicPlace} {item.supermarket.number},{" "}
                      {item.supermarket.city} - {item.supermarket.state}
                    </Text>
                  </TouchableOpacity>
                  {showButton && !visible[index]?.open && (
                    <LinearGradient
                      // colors={['#69c906', '#84be00']}
                      // colors={['#e8c525', '#ebd31c']}
                      colors={["#25e8c8", "#1ca8eb"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.buttonGradient}
                    >
                      <TouchableOpacity
                        style={styles.startShoppingButton}
                        onPress={() =>
                          startShopping(state[index], item.supermarket.name)
                        }
                      >
                        <Text style={styles.textButton}>
                          {purchaseInProgress == item.supermarket.name
                            ? "Continuar Compra"
                            : "Iniciar Compra"}
                        </Text>
                        <Icon
                          name="shoppingcart"
                          size={20}
                          style={{ color: "#fff" }}
                        />
                      </TouchableOpacity>
                    </LinearGradient>
                  )}
                </View>
                {visible[index]?.open && (
                  <View>
                    <View style={styles.listCollapse}>
                      {item?.products.map((products, indexProd) => (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={styles.itemList}
                            key={`${index}-${indexProd}`}
                          >
                            {products.name}
                          </Text>
                          <Text style={styles.itemList}>
                            R$ {products.price}
                          </Text>
                        </View>
                      ))}
                    </View>
                    {showButton && (
                      <LinearGradient
                        // colors={['#69c906', '#84be00']}
                        // colors={['#e8c525', '#ebd31c']}
                        colors={["#25e8c8", "#1ca8eb"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.buttonGradient}
                      >
                        <TouchableOpacity
                          style={styles.startShoppingButton}
                          onPress={() =>
                            startShopping(state[index], item.supermarket.name)
                          }
                        >
                          <Text style={styles.textButton}>
                            {purchaseInProgress == item.supermarket.name
                              ? "Continuar Compra"
                              : "Iniciar Compra"}
                          </Text>
                          <Icon
                            name="shoppingcart"
                            size={20}
                            style={{ color: "#fff" }}
                          />
                        </TouchableOpacity>
                      </LinearGradient>
                    )}
                  </View>
                )}
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
}
