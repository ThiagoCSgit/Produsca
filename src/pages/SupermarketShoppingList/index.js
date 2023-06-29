import { View, Text } from 'react-native';
import styles from './styles';
import { useEffect, useState } from 'react';
import Collapse from '../../components/Collapse'
import CollapseComponent from '../../components/CollapseComponent';
import api from '../../service/api'

export default function SupermaketShoppingList({ route }) {
  // console.warn('route list', route.params.list)
  const [state, setState] = useState([])
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let listNomeProd = route.params.list.map(item => {
      return {
        nome: item.product.name
      }
    })
    api.post("/envios/ProdutosEscolhidosCarrinho", { listaNomeProduto: listNomeProd }).then(response => {
      console.warn(response.data)
      setState(response.data)
    })
  }, [])

  useEffect(() => {
    setState(
      route.params.list.map(item => {
        return {
          isExpandend: true,
          title: item.product.supermarket || 'Teste',
          product: item.product
        }
      })
    )
    // console.warn('statata', state)
  }, [])


  return (
    <View style={styles.container}>
      <Text>Lista de compras no supermercado</Text>
      <Collapse visible={visible} setVisible={setVisible}>
        {state.map(item => {
          return (
            <Text>{item.nome} {item.preco}</Text>
          )
        })}
      </Collapse>
      {/* <CollapseComponent content={route.params.list} visible={visible} setVisible={setVisible} /> */}
      {/* {route.params.list.map(item => { */}
      {/* return ( */}

      {/* // <Text>{item.product.name}</Text> */}
      {/* ) */}
      {/* })} */}
    </View>
  )
}