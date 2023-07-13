import { View, ScrollView } from 'react-native';
import styles from './styles';
import { useEffect, useState } from 'react';
import api from '../../service/api'

import CollapseProductsList from "../../components/CollapseProductsList";

export default function SupermaketShoppingList({ route, navigation }) {
  const [state, setState] = useState(null)

  useEffect(() => {
    let listNomeProd = route.params.list.map(item => {
      return {
        nome: item.product.name
      }
    })
    api.post("/envios/ProdutosEscolhidosCarrinho", { listaNomeProduto: listNomeProd }).then(response => {
      let listaNomeProduto = response.data
      let data = [
        {
          supermercado: "EPA",
          produtos: listaNomeProduto,
          id: 1
        },
        {
          supermercado: "Extrabom",
          produtos: listaNomeProduto,
          id: 2
        }
      ]
      setState(data)
    })
  }, [])


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{justifyContent: "center", paddingHorizontal: 10}}>
        {state != null && 
          <CollapseProductsList
            state={state}
            showButton={true}
            navigation={navigation}
          />
        }
      </ScrollView>
    </View>
  )
}