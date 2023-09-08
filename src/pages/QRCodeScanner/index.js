import {
  View,
  Text,
  Dimensions,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import styles from "./styles";
import api from "../../service/api";
import IconET from "react-native-vector-icons/Entypo";

import { useIsFocused } from "@react-navigation/native";

import Loading from "../../components/Loading";

export default function Scanner() {
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    api.post("/envios/LinkNotaFiscal", { link: data });
  };

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
          {scanned && (
            <Button
              title="Nota escaneada, aperte para escanear novamente"
              onPress={() => setScanned(false)}
            />
          )}
        </View>
        <View
          style={{
            position: "relative",
            left: Dimensions.get("window").width / 2 - 25,
            bottom: 70,
          }}
        >
          <TouchableOpacity
            style={styles.flashButton}
            onPress={handleFlashToggle}
          >
            <IconET name="flashlight" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
