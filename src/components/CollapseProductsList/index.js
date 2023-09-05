import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Dimensions,
} from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/AntDesign";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CollapseProductsList({
  state,
  showButton = false,
  navigation = null,
  isFocused,
}) {
  const [visible, setVisible] = useState([]);
  const [purchaseInProgress, setPurchaseInProgress] = useState(null);
  const [internalState, setInternalState] = useState(state);

  useEffect(() => {
    setInternalState(state);
  }, [state]);

  useEffect(() => {
    if (isFocused) {
      getPurchaseInProgress();
    }
  }, [isFocused]);

  useEffect(() => {
    if (internalState.length > 0) {
      let visibleList = internalState.map((item) => {
        return {
          id: item.id,
          open: false,
        };
      });
      setVisible(visibleList);
    }
  }, [internalState]);

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
    await getPurchaseInProgress(list, supermarketName);
    navigation.navigate("Carrinho", {
      list: list,
    });
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

  async function getPurchaseInProgress(list = null, choosedMarket = null) {
    let savedKeys = await AsyncStorage.getAllKeys();
    let purchaseKey = savedKeys.find((key) => {
      if (key.includes("compra-iniciada")) {
        return key;
      }
    });
    if (purchaseKey) {
      const tempPurchaseKey = purchaseKey.replace("-iniciada", "");
      let historyKey = savedKeys.find((key) => {
        if (key.includes("compra-historico")) {
          let tempHistoryKey = key.replace("-historico", "");
          return tempHistoryKey == tempPurchaseKey;
        }
      });
      let supermarketNameKey = purchaseKey.substring(20);
      let codeHistory = historyKey.substring(17, 20);

      setPurchaseInProgress(choosedMarket ? choosedMarket : supermarketNameKey);

      if (
        choosedMarket &&
        purchaseKey != `compra-iniciada-${codeHistory}-${choosedMarket}`
      ) {
        await AsyncStorage.removeItem(purchaseKey);
        await AsyncStorage.removeItem(historyKey);

        let shoppingList = list;
        let id = `compra-iniciada-${shoppingList.id}-${choosedMarket}`;
        await AsyncStorage.setItem(id, JSON.stringify(shoppingList));
      } else {
        let shoppingList = JSON.parse(await AsyncStorage.getItem(purchaseKey));
        let id = `compra-iniciada-${codeHistory}-${supermarketNameKey}`;

        let updatedState = internalState.map((item) => {
          return item.id == shoppingList.id
            ? { ...item, products: shoppingList.products }
            : item;
        });
        setInternalState(updatedState);
        await AsyncStorage.setItem(id, JSON.stringify(shoppingList));
      }
    } else {
      if (list && list?.products.length > 0) {
        try {
          let shoppingList = list;
          let idNew = `compra-iniciada-${shoppingList.id}-${choosedMarket}`;

          await AsyncStorage.setItem(idNew, JSON.stringify(shoppingList));
        } catch (e) {
          console.warn(e);
        }
      }
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
        {internalState &&
          visible.length > 0 &&
          internalState.map((item, index) => {
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
                      Contato: {item.supermarket.phone}
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
                          startShopping(
                            internalState[index],
                            item.supermarket.name
                          )
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
                            // width: Dimensions.get("window").width - 100,
                          }}
                        >
                          <Text
                            style={[
                              styles.itemList,
                              { width: Dimensions.get("window").width - 160 },
                            ]}
                            key={`${index}-${indexProd}`}
                          >
                            {products.name}
                          </Text>
                          <Text
                            style={[
                              styles.itemList,
                              {
                                marginLeft: 10,
                                fontStyle: "italic",
                                alignItems: "center",
                                justifyContent: "center",
                              },
                            ]}
                          >
                            {products.price == -1
                              ? `${products.qtd}x R$ - -`
                              : `${products.qtd}x R$ ${products.price}`}
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
                            startShopping(
                              internalState[index],
                              item.supermarket.name
                            )
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
