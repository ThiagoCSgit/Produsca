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
  // let internalState = state;
  useEffect(() => {
    console.warn("purchaseInProgress effect:", purchaseInProgress);
  }, [purchaseInProgress]);

  console.warn("state collapse:", state);
  // console.warn("internalState collapse:", internalState);

  useEffect(() => {
    console.warn("state effect vazio:", state);
    setInternalState(state);
  }, [state]);

  useEffect(() => {
    console.warn("mudança no internalState:", internalState);
  }, [internalState]);

  useEffect(() => {
    if (isFocused) {
      // console.warn("está em foco");
      getPurchaseInProgress();
    }
  }, [isFocused]);

  useEffect(() => {
    // console.warn("useEffect visivle:", internalState);
    if (internalState.length > 0) {
      // console.warn("map do visible");
      let visibleList = internalState.map((item) => {
        return {
          id: item.id,
          open: true,
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

  async function getPurchaseInProgress(list = null, choosedMarket = null) {
    console.warn(
      "getPurchaseInProgress params choosedMarket:",
      choosedMarket,
      "list:",
      list
    );
    let savedKeys = await AsyncStorage.getAllKeys();
    console.warn("savedKeys:", savedKeys);
    let purchaseKey = savedKeys.find((key) => {
      if (key.includes("compra-iniciada")) {
        return key;
      }
    });
    if (purchaseKey) {
      const tempPurchaseKey = purchaseKey.replace("-iniciada", "");
      console.warn("tempPurchaseKey:", tempPurchaseKey);
      let historyKey = savedKeys.find((key) => {
        if (key.includes("compra-historico")) {
          let tempHistoryKey = key.replace("-historico", "");
          console.warn("tempHistoryKey:", tempHistoryKey);
          return tempHistoryKey == tempPurchaseKey;
        }
      });
      console.warn("historyKey:", historyKey);
      let supermarketNameKey = purchaseKey.substring(20);
      let codeHistory = historyKey.substring(17, 20);
      // let id = choosedMarket
      //   ? `compra-iniciada-${codeHistory}-${choosedMarket}`
      //   : `compra-iniciada-${codeHistory}-${supermarketNameKey}`;
      console.warn(
        "purchase:",
        purchaseKey,
        "teste:",
        `compra-iniciada-${codeHistory}-${supermarketNameKey}`
      );
      console.warn(
        "nome do supermercado supermarketNameKey:",
        supermarketNameKey,
        "codeHistory:",
        codeHistory
      );
      setPurchaseInProgress(choosedMarket ? choosedMarket : supermarketNameKey);
      console.warn("valor de choosedMarket:", choosedMarket);

      if (
        choosedMarket &&
        purchaseKey != `compra-iniciada-${codeHistory}-${choosedMarket}`
      ) {
        console.warn("escolhido supermercado diferente do antes");
        //   console.warn("comprando em outro supermercado");
        console.warn("comprando em outro supermercado historyKey:", historyKey);
        console.warn(
          "comprando em outro supermercado purchaseKey:",
          purchaseKey
        );
        await AsyncStorage.removeItem(purchaseKey);
        await AsyncStorage.removeItem(historyKey);
        // let otherPurchaseKey = savedKeys.find((key) => {
        //   if (key.includes("compra-iniciada")) {
        //     return key;
        //   }
        // });

        let shoppingList = list;
        let id = `compra-iniciada-${shoppingList.id}-${choosedMarket}`;
        console.warn(
          "iniciando uma nova compra em outro supermercado de id:",
          id,
          "shoppingList:",
          shoppingList
        );
        await AsyncStorage.setItem(id, JSON.stringify(shoppingList));
      } else {
        let shoppingList = JSON.parse(await AsyncStorage.getItem(purchaseKey));
        // console.warn("shoppingList para continuar uma compra:", shoppingList);
        // console.warn("internalState:", internalState);
        let id = `compra-iniciada-${codeHistory}-${supermarketNameKey}`;

        console.warn("id para continuar uma compra:", id);
        let updatedState = internalState.map((item) => {
          return item.id == shoppingList.id
            ? { ...item, products: shoppingList.products }
            : item;
        });
        // console.warn("teste updatedState:", updatedState);
        console.warn("teste updatedState[0]:", updatedState[0]);
        console.warn("teste updatedState[1]:", updatedState[1]);
        setInternalState(updatedState);
        // // internalState = updatedState;
        await AsyncStorage.setItem(id, JSON.stringify(shoppingList));
      }
    } else {
      console.warn("primeira vez que inicia uma compra, list:", list);
      if (list && list?.products.length > 0) {
        try {
          let shoppingList = list;
          let idNew = `compra-iniciada-${shoppingList.id}-${choosedMarket}`;
          console.warn(
            "iniciando uma compra do zero de id:",
            idNew,
            "shoppingList:",
            shoppingList
          );
          await AsyncStorage.setItem(idNew, JSON.stringify(shoppingList));
        } catch (e) {
          console.warn(e);
        }
      }
    }
  }

  // async function getPurchaseInProgress(list = [], choosedMarket) {
  //   console.warn(
  //     "getPurchaseInProgress params choosedMarket:",
  //     choosedMarket,
  //     "list:",
  //     list
  //   );
  //   let savedKeys = await AsyncStorage.getAllKeys();
  //   console.warn("savedKeys:", savedKeys);
  //   let purchaseKey = savedKeys.find((key) => {
  //     if (key.includes("compra-iniciada")) {
  //       return key;
  //     }
  //   });
  //   let historyKey = savedKeys.find((key) => {
  //     if (key.includes("compra-historico")) {
  //       return key;
  //     }
  //   });
  //   if (purchaseKey) {
  //     let supermarketNameKey = historyKey.substring(21);
  //     let id = `compra-iniciada-${supermarketNameKey}`;
  //     console.warn(
  //       "nome do supermercado supermarketNameKey:",
  //       supermarketNameKey
  //     );
  //     setPurchaseInProgress(supermarketNameKey);
  //     console.warn("purchase:", purchaseKey);
  //     console.warn("valor de choosedMarket:", choosedMarket);

  //     // if (purchaseKey == `compra-iniciada-${choosedMarket}`) {
  //     //   console.warn("comprando em outro supermercado");
  //     //   console.warn("comprando em outro supermercado historyKey:", historyKey);
  //     //   await AsyncStorage.removeItem(purchaseKey);
  //     //   // await AsyncStorage.removeItem(historyKey);

  //     //   let shoppingList = list;
  //     //   console.warn(
  //     //     "iniciando uma nova compra em outro supermercado de id:",
  //     //     id,
  //     //     "shoppingList:",
  //     //     shoppingList
  //     //   );
  //     //   await AsyncStorage.setItem(id, JSON.stringify(shoppingList));
  //     // } else {
  //     //   console.warn("id para continuar uma compra:", id);
  //     //   let shoppingList = JSON.parse(await AsyncStorage.getItem(purchaseKey));
  //     //   console.warn("shoppingList para continuar uma compra:", shoppingList);
  //     //   console.warn("internalState:", internalState);

  //     //   let updatedState = internalState.map((item) => {
  //     //     return item.id == shoppingList.id
  //     //       ? { ...item, products: shoppingList.products }
  //     //       : item;
  //     //   });
  //     //   console.warn("teste updatedState:", updatedState);
  //     //   // setInternalState(updatedState);
  //     //   internalState = updatedState;
  //     //   await AsyncStorage.setItem(id, JSON.stringify(shoppingList));
  //     // }
  //   } else {
  //     console.warn("primeira vez que inicia uma compra");
  //     if (list.length > 0) {
  //       try {
  //         id = `compra-iniciada-${choosedMarket}`;
  //         let shoppingList = list;
  //         console.warn(
  //           "iniciando uma compra do zero de id:",
  //           id,
  //           "shoppingList:",
  //           shoppingList
  //         );
  //         await AsyncStorage.setItem(id, JSON.stringify(shoppingList));
  //       } catch (e) {
  //         console.warn(e);
  //       }
  //     }
  //   }
  // }

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
                              { marginLeft: 10, fontStyle: "italic" },
                            ]}
                          >
                            {products.qtd}x R$ {products.price}
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
