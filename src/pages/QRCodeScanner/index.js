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
import Toast from "react-native-toast-message";

import randomIdGeneretor from "../../utils/randomIdGeneretor";

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
    if (updateApi != null) {
      getLastPurchase();
    }
  }, [updateApi]);

  async function getLastPurchase() {
    let id = randomIdGeneretor(3);
    let scannerKey = `compra-historico-${id}-${updateApi.cnpj}`;
    let updatedData = {
      id: id,
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
      data: updateApi.dataEmissao.split(" ")[0],
    };

    await AsyncStorage.setItem(scannerKey, JSON.stringify(updatedData));
    Toast.show({
      type: "info",
      text1: "Nota fiscal processada",
      text2: "Seu histórico de compras foi atualizado 😎",
      position: "bottom",
    });
    setUpdateApi(null);
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
