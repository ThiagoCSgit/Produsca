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

export default function SupermaketShoppingList({
  state,
  showButton = false,
  navigation = null,
  setPurchaseInProgress,
}) {
  const [visible, setVisible] = useState(null);

  useEffect(() => {
    if (state) {
      setVisible(
        state.map((item) => {
          return {
            id: item.id,
            open: false,
          };
        })
      );
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

  async function startShopping(list) {
    // setPurchaseInProgress(true);
    navigation.navigate("Carrinho", {
      list: list,
    });
    try {
      let id = "compra-iniciada";
      let statusPurchase = true;
      await AsyncStorage.setItem(id, JSON.stringify(statusPurchase));
    } catch (e) {
      console.warn(e);
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

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          paddingHorizontal: 15,
        }}
      >
        {state &&
          visible &&
          state.map((item, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.card,
                  styles.shadow,
                  !visible[index].open && styles.p15,
                ]}
              >
                <View style={{ gap: 15 }}>
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
                    {visible[index].open ? (
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
                  {showButton && !visible[index].open && (
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
                        onPress={() => startShopping(state[index])}
                      >
                        <Text style={styles.textButton}>Iniciar Compra</Text>
                        <Icon
                          name="shoppingcart"
                          size={20}
                          style={{ color: "#fff" }}
                        />
                      </TouchableOpacity>
                    </LinearGradient>
                  )}
                </View>
                {visible[index].open && (
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
                          onPress={() => startShopping(state[index])}
                        >
                          <Text style={styles.textButton}>Iniciar Compra</Text>
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
