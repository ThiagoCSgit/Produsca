import {
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Pressable,
  View,
} from "react-native";
import styles from "./styles";
import React, { useState, useEffect } from "react";

import Loading from "../../components/Loading";
import NoData from "../../components/NoData";
import AdjustDistance from "../../components/AdjustDistance";
import { useLocation } from "../../context/LocationProvider";

import api from "../../service/api";

export default function Supermarkets({ navigation }) {
  const [supermarkets, setSupermarkets] = useState([
    {
      id: 1,
      name: "Extrabom",
      image: require("../../images/foodImage.png"),
      address: "Rua da Fantasia",
      city: "Vila Velha",
    },
    {
      id: 2,
      name: "Perim",
      image: require("../../images/foodImage.png"),
      address: "Rua da Fantasia 2",
      city: "Vitória",
    },
    {
      id: 3,
      name: "Carone",
      image: require("../../images/foodImage.png"),
      address: "Rua da Fantasia 3",
      city: "Vitória",
    },
    {
      id: 4,
      name: "Epa",
      image: require("../../images/foodImage.png"),
      address: "Rua da Fantasia 4",
      city: "Serra",
    },
    {
      id: 5,
      name: "Mineirão",
      image: require("../../images/foodImage.png"),
      address: "Rua da Fantasia 5",
      city: "Vila Velha",
    },
    {
      id: 6,
      name: "Atacadão",
      image: require("../../images/foodImage.png"),
      address: "Rua da Fantasia 6",
      city: "Vila Velha",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [noData, setNoData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [range, setRange] = useState(1000);
  const [previousRange, setPreviousRange] = useState(0);

  const myLocation = useLocation();

  useEffect(() => {
    console.log("myLocation:", myLocation);
    console.log("range:", range);
    console.log("previousRange:", previousRange);
    if (myLocation && !modalVisible && range != previousRange) {
      console.log("lat:", myLocation.coords.latitude);
      console.log("lon:", myLocation.coords.longitude);
      setPreviousRange(range);
      // console.log('chamou a rota')
      console.log(
        "rota:",
        `/consultas/SupermercadosProximos?latitude=${myLocation.coords.latitude}&longitude=${myLocation.coords.longitude}&raioDistancia=${range}`
      );
      getNearbySupermarkets();
    }
  }, [myLocation, range, modalVisible]);

  async function getNearbySupermarkets() {
    console.log("minha localização:", myLocation);
    setNoData(null);
    setIsLoading(true);
    api
      .get(
        `/consultas/SupermercadosProximos?latitude=${myLocation.coords.latitude}&longitude=${myLocation.coords.longitude}&raioDistancia=${range}`
      )
      .then((response) => {
        console.warn("response:", response.data);
        let listMarkets = response.data;
        console.log("listMarkets:", listMarkets);
        if (listMarkets != null && listMarkets.length > 0) {
          console.log("tem dados:");
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
              };
            })
          );
        } else {
          setSupermarkets([]);
          console.log("sem dados:", response.data);
          setNoData(response.data);
        }
        setIsLoading(false);
      });
  }

  return isLoading ? (
    <Loading />
  ) : noData != null ? (
    <View style={{ opacity: modalVisible ? 0.4 : 1 }}>
      <NoData
        message="Acho não mano, tenta de novo depois"
        executeAction={getNearbySupermarkets}
      />
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
      style={[
        styles.container,
        { backgroundColor: modalVisible ? "rgba(122, 118, 114, 0.4)" : "#fff" },
      ]}
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
                })
              }
            >
              <Image style={styles.supermarketIcon} source={item.image} />
              <View>
                <Text style={styles.supermarketName}>
                  {item.name} - {item.publicPlace} {item.number}, {item.city}
                </Text>
              </View>
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
