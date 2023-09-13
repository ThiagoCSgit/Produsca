import {
  SafeAreaView,
  Text,
  Image,
  FlatList,
  View,
  TouchableOpacity,
  Alert,
  Pressable,
  Modal,
} from "react-native";
import styles from "./styles";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconF from "react-native-vector-icons/Feather";
import Checkbox from "expo-checkbox";
import Icon from "react-native-vector-icons/AntDesign";

export default function ShopCart({ route, navigation }) {
  const [cartList, setCartList] = useState({
    id: 0,
    products: [],
    supermarket: "",
    cnpj: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [total, setTotal] = useState(0);
  const { list } = route.params;

  useEffect(() => {
    getCartProducts();
  }, []);

  useEffect(() => {
    totalValue();
    saveToHistory();
  }, [cartList]);

  function getCartProducts() {
    let newList = list.products.map((item, index) => {
      item.idProd = index;
      return item;
    });
    setCartList({
      id: list.id,
      products: newList,
      supermarket: list.supermarket,
    });
  }

  function checkedProduct(value, id) {
    let newList = cartList.products.map((item) => {
      if (item.idProd == id) {
        item.check = value;
      }
      return item;
    });
    setCartList({
      id: list.id,
      products: newList,
      supermarket: list.supermarket,
    });
  }

  async function removePurchaseStorage() {
    await AsyncStorage.removeItem(
      `compra-iniciada-${cartList.id}-${cartList.supermarket.cnpj}`
    );
  }

  function removeItem(index) {
    let newList = [...cartList.products];
    newList.splice(index, 1);
    setCartList({
      id: list.id,
      products: newList,
      supermarket: list.supermarket,
    });
  }

  function increaseQuantity(id) {
    let newList = cartList.products.map((item) => {
      if (item.idProd == id) {
        item.qtd = parseInt(item.qtd) + 1;
      }
      return item;
    });
    setCartList({
      id: list.id,
      products: newList,
      supermarket: list.supermarket,
    });
  }

  function decreaseQuantity(id) {
    let newList = cartList.products.map((item) => {
      if (item.idProd == id && item.qtd > 0) {
        item.qtd = parseInt(item.qtd) - 1;
      }
      return item;
    });
    setCartList({
      id: list.id,
      products: newList,
      supermarket: list.supermarket,
    });
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

  function totalValue() {
    let sum = 0;
    if (cartList.products.length > 0) {
      cartList.products.forEach((item) => {
        if (item.price != -1) {
          sum += item.price * item.qtd;
        }
      });
    }
    let valor = itemPrice(`${sum}`);
    setTotal(valor);
  }

  async function checkout() {
    let hasUncheckProduct = false;
    cartList.products.forEach((item) => {
      if (!item.check) {
        hasUncheckProduct = true;
      }
    });

    if (hasUncheckProduct) {
      Alert.alert(
        "Itens não marcados",
        "Um ou mais produtos da lista não foram marcados",
        [
          {
            text: "Continuar sem marcar todos",
            onPress: async () => {
              saveToHistory();
              setModalVisible(true);
              removePurchaseStorage();
            },
          },
          {
            text: "Voltar para marcar",
            onPress: () => {},
          },
        ]
      );
    } else {
      saveToHistory();
      setModalVisible(true);
    }
    removePurchaseStorage();
  }

  async function saveToHistory() {
    try {
      if (cartList.products.length > 0) {
        await AsyncStorage.setItem(
          `compra-iniciada-${cartList.id}-${cartList.supermarket.cnpj}`,
          JSON.stringify(cartList)
        );
        await AsyncStorage.setItem(
          `compra-historico-${cartList.id}-${cartList.supermarket.cnpj}`,
          JSON.stringify(cartList)
        );
      } else {
        removePurchaseStorage();
      }

      let productKeys = await AsyncStorage.getAllKeys();
      for (let i = 0; i < productKeys.length; i++) {
        let key = productKeys[i];
        if (key.includes("produto-lista-")) {
          await AsyncStorage.removeItem(key);
        }
      }
    } catch (e) {
      console.warn("error:", e);
    }
  }

  async function cancelPurchase() {
    removePurchaseStorage();

    await AsyncStorage.removeItem(
      `compra-historico-${cartList.id}-${cartList.supermarket.cnpj}`
    );

    setTimeout(() => {
      navigation.navigate("Histórico");
    }, 100);
  }

  return (
    <SafeAreaView style={styles.container}>
      {cartList?.products.length > 0 ? (
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
          }}
        >
          <Text style={styles.totalValue}>Valor Total da compra: {total}</Text>
          <FlatList
            data={cartList.products}
            numColumns={1}
            key={"_"}
            contentContainerStyle={{
              gap: 15,
              paddingHorizontal: 20,
            }}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.itemCart}>
                  <View style={{ width: "80%" }}>
                    <Text
                      style={[styles.itemName, item.check && styles.bought]}
                    >
                      {item?.marca
                        ? `${item.name}, ${item.marca} ${"\n"} R$ ${itemPrice(
                            `${item.price}`,
                            `${item.qtd}`
                          )}`
                        : `${item.name} ${"\n"} R$ ${itemPrice(
                            `${item.price}`,
                            `${item.qtd}`
                          )}`}
                    </Text>
                    <View style={styles.actionIcons}>
                      <View style={styles.quantItems}>
                        <Icon
                          name="minuscircleo"
                          size={25}
                          onPress={() => decreaseQuantity(item.idProd)}
                        />
                        <Text style={styles.quantityValue}>{item.qtd}</Text>
                        <Icon
                          name="pluscircleo"
                          size={25}
                          onPress={() => increaseQuantity(item.idProd)}
                        />
                      </View>
                      <Checkbox
                        value={item.check}
                        onValueChange={(newValue) =>
                          checkedProduct(newValue, item.idProd)
                        }
                        style={{ width: 22, height: 22 }}
                      />
                    </View>
                  </View>
                  <IconF
                    style={{ marginBottom: 13 }}
                    color="#dc3546"
                    name="trash-2"
                    size={25}
                    onPress={() => removeItem(index)}
                  />
                </View>
              );
            }}
          />
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-around",
              position: "relative",
              top: 10,
            }}
          >
            <TouchableOpacity
              style={[styles.buttonCheckout, { backgroundColor: "#eda7a7" }]}
              onPress={() => cancelPurchase()}
            >
              <Icon name="close" size={22} color="#fff" />
              <Text style={[styles.textButton, { color: "#fff" }]}>
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonCheckout}
              onPress={() => checkout()}
            >
              <Icon name="check" size={22} color="#253D4E" />
              <Text style={styles.textButton}>Finalizar</Text>
            </TouchableOpacity>
          </View>
          <Modal
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
            animationType="fade"
            transparent={true}
          >
            <View style={styles.containerModal}>
              <Pressable
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Icon name="close" size={27} />
              </Pressable>
              <Text style={styles.modalText}>
                Gostaria de escanear a nota fiscal?
              </Text>
              <View style={styles.modalButtons}>
                <Pressable
                  onPress={() => {
                    setModalVisible(false);
                    setTimeout(() => {
                      navigation.navigate("Histórico");
                    }, 100);
                  }}
                  style={[
                    styles.buttonModal,
                    {
                      backgroundColor: "#eda7a7",
                      borderColor: "#eda7a7",
                    },
                  ]}
                >
                  <Text style={[styles.buttonText, { color: "#fff" }]}>
                    Não
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setModalVisible(false);
                    setTimeout(() => {
                      navigation.navigate("Scanner");
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
                  <Text style={[styles.buttonText, { color: "#253D4E" }]}>
                    Sim
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      ) : (
        <View>
          <Image
            style={styles.emptyCartImage}
            source={require("../../images/shoppingCart.png")}
          />
          <Text style={styles.labelEmptyCart}>Seu carrinho está vazio</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
