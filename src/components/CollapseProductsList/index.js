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
import IconF from "react-native-vector-icons/Feather";
import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CollapseProductsList({
  state,
  showButton = false,
  showInfos = false,
  navigation = null,
  isFocused,
  deleteButton = false,
  getHistoric,
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

  async function startShopping(list, cnpj) {
    await getPurchaseInProgress(list, cnpj);
    navigation.navigate("Carrinho", {
      list: list,
    });
  }

  async function deleteShopping(id) {
    await AsyncStorage.removeItem(id);
    getHistoric();
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
      let supermarketCnpjKey = purchaseKey.substring(20);
      let codeHistory = historyKey.substring(17, 20);
      setPurchaseInProgress(choosedMarket ? choosedMarket : supermarketCnpjKey);

      if (
        choosedMarket &&
        purchaseKey != `compra-iniciada-${codeHistory}-${choosedMarket}`
      ) {
        await AsyncStorage.multiRemove([
          purchaseKey,
          historyKey,
          `ultima-compra-${codeHistory}-${supermarketCnpjKey}`,
        ]);
        let shoppingList = list;
        let id = `compra-iniciada-${shoppingList.id}-${choosedMarket}`;
        await AsyncStorage.setItem(id, JSON.stringify(shoppingList));
      } else {
        let shoppingList = JSON.parse(await AsyncStorage.getItem(purchaseKey));
        let id = `compra-iniciada-${codeHistory}-${supermarketCnpjKey}`;

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

  function itemPrice(value, quantity = 1) {
    if (value != -1) {
      return Number.parseFloat(value * quantity).toLocaleString("pt-br", {
        minimumFractionDigits: 2,
      });
    } else {
      return "- -";
    }
  }

  function totalValue(list) {
    let sum = 0;
    if (list.products.length > 0) {
      list.products.forEach((item) => {
        if (item.price != -1) {
          sum += parseFloat(item.price) * parseFloat(item.qtd);
        }
      });
    }
    let valor = sum != 0 ? itemPrice(`${sum}`) : "- -";
    return valor;
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
                  style={[
                    { gap: 15 },
                    !showButton && !deleteButton && { paddingBottom: 15 },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.buttonOpenCollapse}
                    onPress={() => openCloseCollapse(item.id)}
                  >
                    {item.supermarket.name ? (
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: "OpenSans_500Medium",
                          color: "#253D4E",
                        }}
                      >
                        {item.supermarket.name}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "OpenSans_500Medium",
                          color: "#253D4E",
                        }}
                      >
                        Nome do supermercado indisponível
                      </Text>
                    )}
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
                    <TouchableOpacity
                      style={[
                        styles.startShoppingButton,
                        {
                          backgroundColor: "#00c9b7",
                        },
                      ]}
                      onPress={() =>
                        startShopping(
                          internalState[index],
                          item.supermarket.cnpj
                        )
                      }
                    >
                      <Text style={styles.textButton}>
                        {purchaseInProgress == item.supermarket.cnpj
                          ? "Continuar Compra"
                          : "Iniciar Compra"}
                      </Text>
                      <Icon
                        name="shoppingcart"
                        size={20}
                        style={{ color: "#fff" }}
                      />
                    </TouchableOpacity>
                  )}
                  {deleteButton && !visible[index]?.open && (
                    <TouchableOpacity
                      style={[
                        styles.startShoppingButton,
                        { backgroundColor: "#ff8080" },
                      ]}
                      onPress={() => deleteShopping(internalState[index].id)}
                    >
                      <IconF
                        style={{ marginRight: 13 }}
                        color="#fff"
                        name="trash-2"
                        size={25}
                      />
                      <Text style={styles.textButton}>Excluir</Text>
                    </TouchableOpacity>
                  )}
                </View>
                {visible[index]?.open && (
                  <View>
                    {showInfos && (
                      <View style={styles.historicInfos}>
                        <Text style={styles.itemValue}>Data: {item.data}</Text>
                        <Text style={styles.itemValue}>
                          Total: R$ {totalValue(item)}
                        </Text>
                      </View>
                    )}
                    <View style={styles.listCollapse}>
                      {item?.products.map((products, indexProd) => (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                          key={indexProd}
                        >
                          <Text
                            style={[
                              styles.itemList,
                              { width: Dimensions.get("window").width - 230 },
                            ]}
                            key={`${index}-${indexProd}`}
                          >
                            {products.name}
                          </Text>
                          <Text style={[styles.itemValue]}>
                            {products.price == -1
                              ? `${products.qtd}x R$ - -`
                              : `${products.qtd}x R$ ${products.price}`}
                          </Text>
                        </View>
                      ))}
                    </View>
                    {showButton && (
                      <TouchableOpacity
                        style={[
                          styles.startShoppingButton,
                          {
                            backgroundColor: "#00c9b7",
                          },
                        ]}
                        onPress={() =>
                          startShopping(
                            internalState[index],
                            item.supermarket.cnpj
                          )
                        }
                      >
                        <Text style={styles.textButton}>
                          {purchaseInProgress == item.supermarket.cnpj
                            ? "Continuar Compra"
                            : "Iniciar Compra"}
                        </Text>
                        <Icon
                          name="shoppingcart"
                          size={20}
                          style={{ color: "#fff" }}
                        />
                      </TouchableOpacity>
                    )}
                    {deleteButton && (
                      <TouchableOpacity
                        style={[
                          styles.startShoppingButton,
                          { backgroundColor: "#ff8080" },
                        ]}
                        onPress={() => deleteShopping(internalState[index].id)}
                      >
                        <IconF
                          style={{ marginRight: 13 }}
                          color="#fff"
                          name="trash-2"
                          size={25}
                        />
                        <Text style={styles.textButton}>Excluir</Text>
                      </TouchableOpacity>
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
