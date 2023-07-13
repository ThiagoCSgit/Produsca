import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { useEffect, useState } from 'react';

export default function SupermaketShoppingList({ state, showButton = false, navigation = null }) {

  const [visible, setVisible] = useState(null)

  useEffect(() => {
    if(state){
      setVisible(state.map(item => {
        return {
          id: item.id,
          open: true
        }
      }))
    }
  }, [state])

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
          (state && visible) && state.map((item, index) => {
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
                      {
                        showButton &&
                        <TouchableOpacity style={styles.startShoppingButton} onPress={() => startShopping(state[index])}>
                            <Text style={styles.textButton}>Iniciar Compra</Text>
                            <Icon name="shoppingcart" size={20} style={{color: "#fff"}}/>
                        </TouchableOpacity>
                      }
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