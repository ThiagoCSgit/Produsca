import { View, ScrollView, Text } from "react-native";
import styles from "./styles";
import { useEffect, useState } from "react";
import api from "../../service/api";

import CollapseProductsList from "../../components/CollapseProductsList";
import Loading from "../../components/Loading";
import AdjustDistance from "../../components/AdjustDistance";
import NoData from "../../components/NoData";

import { useLocation } from "../../context/LocationProvider";

export default function SupermaketShoppingList({ route, navigation }) {
  const [state, setState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [range, setRange] = useState(1000);
  const [previousRange, setPreviousRange] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [noData, setNoData] = useState(null);

  const myLocation = useLocation();

  useEffect(() => {
    if (myLocation && !modalVisible && range != previousRange) {
      setPreviousRange(range);
      postShopList();
    }
  }, [myLocation, range, modalVisible]);

  function postShopList() {
    setIsLoading(true);
    setNoData(null);
    console.warn("myLocation:", myLocation);
    console.warn("minha localização:", myLocation);
    let listNomeProd = route.params.list.map((item) => {
      return {
        nome: item.name,
        codigo: "",
      };
    });

    console.warn("parametros da rota:", {
      latitudeUsuario: myLocation?.coords.latitude,
      longitudeUsuario: myLocation?.coords.longitude,
      raioDistanciaMetros: range,
      listaNomeProduto: listNomeProd,
    });

    console.warn("listNomeProd:", listNomeProd);
    api
      .post("/envios/ProdutosEscolhidosCarrinho", {
        latitudeUsuario: myLocation?.coords.latitude,
        longitudeUsuario: myLocation?.coords.longitude,
        raioDistanciaMetros: range,
        listaNomeProduto: listNomeProd,
      })
      .then((response) => {
        console.warn("Supermercados disponíveis:", response.data);
        let listResponse = response.data;
        // let data = [
        //   {
        //     supermercado: "EPA",
        //     produtos: listResponse,
        //     id: 1,
        //   },
        //   {
        //     supermercado: "Extrabom",
        //     produtos: listResponse,
        //     id: 2,
        //   },
        // ];
        if (listResponse != null && listResponse.length > 0) {
          let data = listResponse.map((item) => {
            return {
              supermarket: item.supermercado,
              products: item.produtos,
              id: item.id,
            };
          });
          console.warn("data retornada:", data);
          setState(data);
        } else {
          setState([]);
          setNoData(listResponse);
        }
        setIsLoading(false);
      });
  }

  return isLoading ? (
    <Loading />
  ) : noData != null ? (
    <View>
      <NoData message={noData.message} executeAction={postShopList} />
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
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          paddingHorizontal: 10,
        }}
      >
        {state != null && (
          <CollapseProductsList
            state={state}
            showButton={true}
            navigation={navigation}
          />
        )}
      </ScrollView>
      <View
        style={{
          width: "100%",
          alignItems: "center",
        }}
      >
        <AdjustDistance
          range={range}
          setRange={setRange}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
    </View>
  );
}
