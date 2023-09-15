import { View, ScrollView, Image, Text } from "react-native";
import styles from "./styles";
import CollapseProductsList from "../../components/CollapseProductsList";
import { useIsFocused } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function PurchasesHistoric() {
  const [historic, setHistoric] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    getHistoric();
  }, [isFocused]);

  async function getHistoric() {
    let savedKeys = await AsyncStorage.getAllKeys();
    let filteredKeys = savedKeys.filter((key) => {
      if (key.includes("compra-historico")) {
        return key;
      }
    });
    let shopping = await AsyncStorage.multiGet(filteredKeys);
    let newList = shopping.map((item) => {
      let id = item[0];
      let products = JSON.parse(item[1]).products;
      let supermarket = JSON.parse(item[1]).supermarket;
      let data = JSON.parse(item[1]).data;

      return {
        id: id,
        products: products,
        supermarket: supermarket,
        data: data,
      };
    });
    setHistoric(newList);
  }

  return (
    <View style={styles.container}>
      {historic != null && historic.length > 0 ? (
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            paddingHorizontal: 10,
          }}
        >
          <CollapseProductsList
            state={historic}
            deleteButton={true}
            getHistoric={getHistoric}
            showInfos={true}
          />
        </ScrollView>
      ) : (
        <View style={styles.emptyHistoric}>
          <Image
            style={styles.image}
            source={require("../../images/folha-vazia.png")}
          />
          <Text style={styles.text}>Seu histórico de compras está vazio</Text>
        </View>
      )}
    </View>
  );
}
