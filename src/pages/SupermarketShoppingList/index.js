import { View, ScrollView, Text } from "react-native";
import styles from "./styles";
import { useEffect, useState } from "react";
import api from "../../service/api";

import CollapseProductsList from "../../components/CollapseProductsList";
import Loading from "../../components/Loading";
import AdjustDistance from "../../components/AdjustDistance";
import NoData from "../../components/NoData";

import { useLocation } from "../../context/LocationProvider";

import { useIsFocused } from "@react-navigation/native";

export default function SupermaketShoppingList({ route, navigation }) {
  // const [state, setState] = useState([
  //   {
  //     supermarket: {
  //       name: "EPA",
  //       city: "Vitória",
  //       state: "ES",
  //       publicPlace: "Rua da Fantasia",
  //       number: 123,
  //       phone: "27 33439846",
  //       district: "Natal Amigo",
  //     },
  //     products: [
  //       { name: "batata", price: 10 },
  //       { name: "batata", price: 10 },
  //       { name: "batata", price: 10 },
  //       { name: "batata", price: 10 },
  //       { name: "batata", price: 10 },
  //       { name: "batata", price: 10 },
  //       { name: "batata", price: 10 },
  //       { name: "batata", price: 10 },
  //       { name: "batata", price: 10 },
  //       { name: "batata", price: 10 },
  //       { name: "batata", price: 10 },
  //       { name: "batata", price: 10 },
  //       { name: "batata", price: 10 },
  //       { name: "batata", price: 10 },
  //       { name: "batata", price: 10 },
  //       { name: "batata", price: 10 },
  //       { name: "batata", price: 10 },
  //       { name: "batata", price: 10 },
  //       { name: "batata", price: 10 },
  //       { name: "batata", price: 10 },
  //       { name: "batata", price: 10 },
  //     ],
  //     id: 1,
  //   },
  //   {
  //     supermarket: {
  //       name: "Extrabom",
  //       city: "Vitória",
  //       state: "ES",
  //       publicPlace: "Rua da Fantasia",
  //       number: 123,
  //       phone: "27 33439846",
  //       district: "Natal Amigo",
  //     },
  //     products: [{ name: "batata", price: 10 }],
  //     id: 2,
  //   },
  // ]);
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [range, setRange] = useState(2000);
  const [previousRange, setPreviousRange] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [noData, setNoData] = useState(null);

  const isFocused = useIsFocused();

  const myLocation = useLocation();
  console.warn("paremtros:", route.params.list);

  useEffect(() => {
    console.warn("useEffetc", myLocation, modalVisible, range != previousRange);
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
        qtd: item.qtd,
      };
    });
    console.warn("listNomeProd:", listNomeProd);

    console.warn("parametros da rota:", {
      latitudeUsuario: myLocation?.coords.latitude,
      longitudeUsuario: myLocation?.coords.longitude,
      raioDistanciaMetros: range,
      listaNomeProduto: listNomeProd,
    });

    console.warn("listNomeProd:", listNomeProd);
    // api
    //   .post("/envios/ProdutosEscolhidosCarrinho", {
    //     latitudeUsuario: myLocation?.coords.latitude,
    //     longitudeUsuario: myLocation?.coords.longitude,
    //     raioDistanciaMetros: range,
    //     listaNomeProduto: listNomeProd,
    //   })
    //   .then((response) => {
    //     console.warn("Supermercados disponíveis:", response.data);
    //     let listResponse = response.data;

    // if (listResponse != null && listResponse.length > 0) {
    // let data = listResponse.map((item) => {
    //   let supermercado = {
    //     name: item.nomeSupermercado,
    //     publicPlace: item.logradouro,
    //     number: item.numero,
    //     city: item.nomeCidade,
    //     state: item.nomeEstado,
    //     district: item.nomeBairro,
    //     phone: item.telefone,
    //     cpnj: item.cnpj,
    //   };
    //   let produtos = item.produtos.map((prod) => {
    //     return {
    //       name: prod.nome,
    //       price: prod.preco,
    //       describe: prod.descricao,
    //       image: prod.link_image,
    //     };
    //   });
    //   return {
    //     supermarket: supermercado,
    //     products: produtos,
    //     id: randomIdGeneretor(3),
    //   };
    // });
    let data = [
      {
        supermarket: {
          name: "EPA",
          publicPlace: "Rua da Fantasia",
          number: 52,
          city: "VILA VELHA",
          state: "ES",
          district: "PRAIA DO SUÁ",
          phone: "2733439846",
          cpnj: 12223333,
        },
        products: listNomeProd.map((prod) => {
          return {
            name: prod.nome,
            price: 10,
            describe: "descrição",
            image: "oapopa",
            qtd: prod.qtd,
          };
        }),
        id: randomIdGeneretor(3),
      },
      {
        supermarket: {
          name: "Extrabom",
          publicPlace: "Rua da Fantasia",
          number: 52,
          city: "VILA VELHA",
          state: "ES",
          district: "PRAIA DO SUÁ",
          phone: "2733439846",
          cpnj: 12223333,
        },
        products: listNomeProd.map((prod) => {
          return {
            name: prod.nome,
            price: 10,
            describe: "descrição",
            image: "oapopa",
            qtd: prod.qtd,
          };
        }),
        id: randomIdGeneretor(3),
      },
    ];
    console.warn("data retornada:", data);
    setState(data);
    // } else {
    //   setState([]);
    //   setNoData(listResponse);
    // }
    setIsLoading(false);
    // });
  }

  function randomIdGeneretor(length) {
    const caracteres =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length);
      id += caracteres.charAt(randomIndex);
    }

    return id;
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
