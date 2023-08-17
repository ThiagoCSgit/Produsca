import { View, ScrollView, Text } from "react-native";
import styles from "./styles";
import { useEffect, useState } from "react";
import api from "../../service/api";

import CollapseProductsList from "../../components/CollapseProductsList";
import Loading from "../../components/Loading";
import AdjustDistance from "../../components/AdjustDistance";

export default function SupermaketShoppingList({ route, navigation }) {
  const [state, setState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [range, setRange] = useState(1000);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (!modalVisible) {
      postShopList();
    }
  }, [range, modalVisible]);

  function postShopList() {
    let listNomeProd = route.params.list.map((item) => {
      return {
        nome: item.name,
      };
    });

    // {
    //   "latitudeUsuario": 0,
    //   "longitudeUsuario": 0,
    //   "raioDistanciaMetros": 0,
    //   "listaNomeProduto": [
    //     {
    //       "nome": "string",
    //       "codigo": "string"
    //     }
    //   ]
    // }
    console.warn("listNomeProd:", listNomeProd);
    api
      .post("/envios/ProdutosEscolhidosCarrinho", {
        listaNomeProduto: listNomeProd,
      })
      .then((response) => {
        console.warn("supermcados para comprar:", response.data);
        let listaNomeProduto = response.data;
        let data = [
          {
            supermercado: "EPA",
            produtos: listaNomeProduto,
            id: 1,
          },
          {
            supermercado: "Extrabom",
            produtos: listaNomeProduto,
            id: 2,
          },
        ];
        console.warn("data:", data);
        setState(data);
        setIsLoading(false);
      });
  }

  return isLoading ? (
    <Loading />
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
