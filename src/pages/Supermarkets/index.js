import {
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Pressable,
  View,
  Dimensions,
} from "react-native";
import styles from "./styles";
import React, { useState, useEffect, useContext } from "react";

import Loading from "../../components/Loading";
import NoData from "../../components/NoData";
import AdjustDistance from "../../components/AdjustDistance";
import { useLocation } from "../../context/LocationProvider";

import getLocation from "../../utils/getLocation";

import api from "../../service/api";

export default function Supermarkets({ navigation }) {
  const [supermarkets, setSupermarkets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noData, setNoData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [range, setRange] = useState(5000);
  const [previousRange, setPreviousRange] = useState(0);
  const [myLocation, setMyLocation] = useState(useLocation());

  useEffect(() => {
    if (myLocation == null) {
      setPosition();
    }
  }, [myLocation]);

  useEffect(() => {
    if (myLocation && !modalVisible && range != previousRange) {
      setPreviousRange(range);
      getNearbySupermarkets();
    }
  }, [myLocation, range, modalVisible]);

  async function setPosition() {
    let location = await getLocation();
    setMyLocation(location);
  }

  async function getNearbySupermarkets() {
    setNoData(null);
    setIsLoading(true);
    api
      .get(
        `/consultas/SupermercadosProximos?latitude=${myLocation.coords.latitude}&longitude=${myLocation.coords.longitude}&raioDistancia=${range}`
      )
      .then((response) => {
        let listMarkets = response.data;
        if (listMarkets != null && listMarkets.length > 0) {
          setSupermarkets(
            listMarkets.map((item, index) => {
              return {
                id: index + 1,
                name: item.nome,
                city: item.nomeCidade,
                state: item.nomeEstado,
                publicPlace: item.logradouro,
                number: item.numero,
                phone: item.telefone,
                district: item.nomeBairro,
                image: require("../../images/icone_mercado.png"),
                cnpj: item.cnpj,
              };
            })
          );
        } else {
          setSupermarkets([]);
          setNoData(response.data);
        }
        setIsLoading(false);
      });
  }

  return isLoading ? (
    <Loading />
  ) : noData != null ? (
    <View style={{ opacity: modalVisible ? 0.4 : 1 }}>
      <NoData message={noData.message} executeAction={getNearbySupermarkets} />
      <View style={{ alignItems: "center", marginTop: -45 }}>
        <AdjustDistance
          range={range}
          setRange={setRange}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
    </View>
  ) : (
    <SafeAreaView
      style={[styles.container, { opacity: modalVisible ? 0.4 : 1 }]}
    >
      <FlatList
        style={styles.listSupermarkets}
        data={supermarkets}
        numColumns={1}
        key={"_"}
        renderItem={({ item }) => {
          return (
            <Pressable
              style={styles.supermarketItem}
              onPress={() =>
                navigation.navigate("Supermercado", {
                  name: item.name,
                  phone: item.phone,
                  publicPlace: item.publicPlace,
                  district: item.district,
                  city: item.city,
                  state: item.state,
                  number: item.number,
                  cnpj: item.cnpj,
                })
              }
            >
              <Image style={styles.supermarketIcon} source={item.image} />
              {item.name != "" ? (
                <Text style={styles.supermarketInfos}>
                  {item.name} - {item.publicPlace} {item.number}, {item.city}
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: "OpenSans_500Medium",
                    fontSize: 12,
                    width: Dimensions.get("window").width - 160,
                  }}
                >
                  Nome do supermercado indisponível, {item.publicPlace}{" "}
                  {item.number}, {item.city}
                </Text>
              )}
            </Pressable>
          );
        }}
      />
      <AdjustDistance
        range={range}
        setRange={setRange}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
}
