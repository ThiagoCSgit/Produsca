import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import styles from "./styles";
import api from "../../service/api";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { useIsFocused } from "@react-navigation/native";

import Loading from "../../components/Loading";

export default function Scanner({ navigation }) {
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [updateApi, setUpdateApi] = useState(null);

  useEffect(() => {
    (async () => {
      if (isFocused) {
        setIsLoading(true);
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
        setIsLoading(false);
      } else {
        setHasPermission(false);
        setIsLoading(false);
      }
    })();
  }, [isFocused]);

  useEffect(() => {
    if (updateApi) {
      getLastPurchase();
    }
  }, [updateApi]);

  function returnDate(value) {
    let date = value.split(" ")[0];
    date = date.split("/");
    return `${date[1]}-${date[0]}-${date[2]}`;
  }

  async function getLastPurchase() {
    let savedKeys = await AsyncStorage.getAllKeys();
    let lastPurchaseKey = savedKeys.find((key) => {
      if (key.includes("ultima-compra")) {
        return key;
      }
    });
    if (lastPurchaseKey && updateApi.listaProdutos.length > 0) {
      let lastPurchaseList = await AsyncStorage.getItem(lastPurchaseKey);
      let updatedData = {
        id: lastPurchaseList.id,
        products: updateApi.listaProdutos.map((item, index) => {
          return {
            name: item.nomeProduto,
            price: item.valorUnidade,
            qtd: item.quantidade,
            idProd: index,
          };
        }),
        supermarket: {
          name: updateApi.nome,
          publicPlace: updateApi.logradouro,
          number: updateApi.numero,
          city: updateApi.cidade,
          state: updateApi.estado,
          district: updateApi.bairro,
          phone: updateApi.telefone,
          cnpj: updateApi.cnpj,
        },
        data: format(new Date(returnDate(updateApi.dataEmissao)), "dd/MM/yy", {
          locale: ptBR,
        }),
      };
      let codeNCnpj = lastPurchaseKey.substring(14);
      let purchaseHistoryKey = savedKeys.find((key) => {
        if (key.substring(17) == codeNCnpj) {
          return key;
        }
      });
      if (purchaseHistoryKey) {
        await AsyncStorage.setItem(
          purchaseHistoryKey,
          JSON.stringify(updatedData)
        );
        await AsyncStorage.removeItem(lastPurchaseKey);
      }
    }
  }

  function handleBarCodeScanned({ data }) {
    setScanned(true);
    Alert.alert(
      "Nota escaneada com sucesso",
      "Obrigado pela sua contribuição 😉",
      [
        {
          text: "OK",
          onPress: () => {
            setScanned(false);
            navigation.navigate("Categorias");
          },
        },
      ]
    );
    api.post("/envios/LinkNotaFiscal", { link: data }).then((response) => {
      if (!response.data.message) {
        setUpdateApi(response.data);
      } else {
        setUpdateApi(null);
      }
    });
  }

  const handleFlashToggle = async () => {
    setFlashOn(!flashOn);
  };

  if (hasPermission === null && isLoading) {
    return <Loading />;
  } else if (hasPermission === false && isLoading === false) {
    return (
      <Text style={{ fontFamily: "OpenSans_500Medium" }}>
        Acesso a camera negado
      </Text>
    );
  } else {
    return isLoading ? (
      <Loading />
    ) : (
      <View style={styles.container}>
        <View style={{ height: 500, justifyContent: "center" }}>
          <Camera
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
            flashMode={
              flashOn
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
            }
          />
        </View>
        <View
          style={{
            position: "relative",
            left: Dimensions.get("window").width / 2 - 25,
            bottom: 70,
          }}
        >
          <TouchableOpacity
            style={[
              styles.flashButton,
              flashOn
                ? { backgroundColor: "#fff" }
                : { backgroundColor: "#1a1a1a" },
            ]}
            onPress={handleFlashToggle}
          >
            {flashOn ? (
              <Icon name="flashlight" size={25} />
            ) : (
              <Icon name="flashlight-off" size={25} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.textInfo}>Leitor de nota fiscal</Text>
      </View>
    );
  }
}
