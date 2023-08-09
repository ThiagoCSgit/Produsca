import { View, ScrollView, Text } from 'react-native';
import styles from './styles';
import { useEffect, useState } from 'react';
import api from '../../service/api'

import CollapseProductsList from '../../components/CollapseProductsList';
import Loading from '../../components/Loading';

export default function SupermaketShoppingList({ route, navigation }) {
  const [state, setState] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let listNomeProd = route.params.list.map(item => {
      return {
        nome: item.product.name
      }
    })
    console.warn('listNomeProd:',listNomeProd)
    api.post("/envios/ProdutosEscolhidosCarrinho", {
      "listaNomeProduto": [
        {
          "nome": "batata"
        }
      ]
    }).then(response => {
      console.warn('supermcados para comprar:',response.data)
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
      setIsLoading(false)
    })
  }, [])


  return ( isLoading ?
    <Loading/> :
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