import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import { useEffect, useState } from 'react';
import api from '../../service/api'
import Icon from 'react-native-vector-icons/AntDesign';

export default function SupermaketShoppingList({ route, navigation }) {
  const [state, setState] = useState([])
  const [visible, setVisible] = useState([]);

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
      setVisible(data.map(item => {
        return {
          id: item.id,
          open: true
        }
      }))
      setState(data)
    })
  }, [])

  function openCloseCollapse(id){
    const updatedVisible  = visible.map(item => {
      if (item.id == id){
        item.open = !item.open
      }
      return item
    })
    setVisible(updatedVisible)
  }

  function startShopping(list){
    navigation.navigate("Carrinho", {
      list: list
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{justifyContent: "center", paddingHorizontal: 15}}>
        {
          state.map((item, index) => {
            return (
              <View key={index} style={[styles.card, styles.shadow, !visible[index].open && styles.p15]}>
                <TouchableOpacity style={styles.buttonOpenCollapse} onPress={() => openCloseCollapse(item.id)}>
                  <Text style={{fontSize: 20}}>{item.supermercado}</Text>
                  {
                      visible[index].open ?
                          <Icon name="down" size={20} /> :
                          <Icon name="right" size={20} />
                  }
                </TouchableOpacity>
                {
                  visible[index].open &&
                    <View>
                      <View style={styles.listCollapse}>
                        {
                          item.produtos.map((produto, indexProd) => 
                            <Text style={{fontSize: 18, marginVertical: 5}} key={`${index}-${indexProd}`}>{produto.nome} {produto.preco}</Text>)
                        }
                      </View>
                      <TouchableOpacity style={styles.startShoppingButton} onPress={() => startShopping(state[index])}>
                        <Text style={styles.textButton}>Iniciar Compra</Text>
                        <Icon name="shoppingcart" size={20} style={{color: "#fff"}}/>
                      </TouchableOpacity>
                    </View>
                }
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  )
}