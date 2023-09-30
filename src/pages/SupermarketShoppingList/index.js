import { View, ScrollView, Alert } from "react-native";
import styles from "./styles";
import { useEffect, useState } from "react";
import api from "../../service/api";

import CollapseProductsList from "../../components/CollapseProductsList";
import Loading from "../../components/Loading";
import AdjustDistance from "../../components/AdjustDistance";
import NoData from "../../components/NoData";

import getLocation from "../../utils/getLocation";
import randomIdGeneretor from "../../utils/randomIdGeneretor";

import { useLocation } from "../../context/LocationProvider";

import { useIsFocused } from "@react-navigation/native";

export default function SupermaketShoppingList({ route, navigation }) {
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [range, setRange] = useState(5000);
  const [previousRange, setPreviousRange] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [noData, setNoData] = useState(null);
  const [myLocation, setMyLocation] = useState(useLocation());

  const isFocused = useIsFocused();

  useEffect(() => {
    if (myLocation == null) {
      setPosition();
    }
  }, [myLocation]);

  useEffect(() => {
    if (myLocation && !modalVisible && range != previousRange) {
      setPreviousRange(range);
      postShopList();
    }
  }, [myLocation, range, modalVisible]);

  useEffect(() => {
    if (state.length > 0) {
      alertNoPrice();
    }
  }, [state]);

  async function setPosition() {
    let location = await getLocation();
    setMyLocation(location);
  }

  function postShopList() {
    setIsLoading(true);
    setNoData(null);
    let listNomeProd = route.params.list.map((item) => {
      return {
        nome: item.name,
        codigo: "",
        qtd: item.qtd,
      };
    });
    api
      .post("/envios/ProdutosEscolhidosCarrinho", {
        latitudeUsuario: myLocation?.coords.latitude,
        longitudeUsuario: myLocation?.coords.longitude,
        raioDistanciaMetros: range,
        listaNomeProduto: listNomeProd,
      })
      .then((response) => {
        let listResponse = response.data;
        if (listResponse != null && listResponse.length > 0) {
          let data = listResponse.map((item) => {
            let supermercado = {
              name: item.nomeSupermercado,
              publicPlace: item.logradouro,
              number: item.numero,
              city: item.nomeCidade,
              state: item.nomeEstado,
              district: item.nomeBairro,
              phone: item.telefone,
              cnpj: item.cnpj,
            };
            let produtos = item.produtos.map((prod, index) => {
              if (prod.nome.trim() == listNomeProd[index].nome.trim())
                return {
                  name: prod.nome,
                  price: prod.preco,
                  describe: prod.descricao,
                  image: prod.link_image,
                  qtd: listNomeProd[index].qtd,
                };
            });
            return {
              supermarket: supermercado,
              products: produtos,
              id: randomIdGeneretor(3),
            };
          });
          setState(data);
        } else {
          setState([]);
          setNoData(listResponse);
        }
        setIsLoading(false);
      });
  }

  function alertNoPrice() {
    if (state.length > 0) {
      let noPrice = null;
      for (let i = 0; i < state.length; i++) {
        noPrice = state[i].products.find((item) => {
          return item.price == -1;
        });
      }
      if (noPrice) {
        Alert.alert(
          "Produtos não cadastrados",
          "Existem alguns produtos que ainda não tem preços cadastrados, então o valor da sua comprar será diferente do informado. Nos ajude a crescer contribuindo com os dados da sua compra!"
        );
      }
    }
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
            isFocused={isFocused}
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
