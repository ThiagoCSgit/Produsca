import {SafeAreaView, Text, Image, FlatList, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconE from 'react-native-vector-icons/EvilIcons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';



export default function ShoppingList({navigation}) {
    const [cartList, setCartList] = useState([])

    useEffect(() => {
        getCartProducts()
    }, [])
    
    async function getCartProducts(){
        try {
            let productKeys = await AsyncStorage.getAllKeys()
            let products = await AsyncStorage.multiGet(productKeys)
            let newList = products.map(product => {
                const newProduct = JSON.parse(product[1])
                return {product: newProduct, check: false}
            })

            setCartList(newList)

        } catch(e) {
            console.warn('error', e)
        }
    }

    async function removeItem(id, callGetCart = true){
        try{
            await AsyncStorage.removeItem(id);
            if(callGetCart){
                getCartProducts()
            }
        } catch(e) {
            console.warn('error', e)
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            {
              cartList.length > 0 ?
              <View style={styles.screenList}>
                <FlatList
                    data={cartList}
                    numColumns={1}
                    key={'_'}
                    renderItem={({item}) => {
                    return (
                        <View style={styles.itemCart}>
                            <Text style={styles.itemName}>
                                {item.product.mark ? 
                                `${item.product.name}, ${item.product.mark} \n ${item.product.supermarket ? item.product.price + ' - ' + item.product.supermarket : 'R$' + item.product.minPrice + ' - R$' + item.product.maxPrice}` : `${item.product.name} \n ${item.product.supermarket ? item.product.price + ' - ' + item.product.supermarket : 'R$' + item.product.minPrice + ' - R$' + item.product.maxPrice}`}
                            </Text>
                            <IconE style={styles.iconTrash} name="trash" size={40} onPress={() => removeItem(item.product.id)}/>
                        </View>
                    )
                    }}
                />
                <TouchableOpacity style={styles.buttonSimulate} onPress={() => navigation.navigate("Supermacados para Comprar", {
                    list: cartList
                })}>
                  <IconMCI style={styles.iconCalculator} name="calculator-variant-outline" size={25}/>
                  <Text style={styles.textButton}>Simular Compra</Text>
                </TouchableOpacity>
              </View>
              :
              <View>
                  <Image style={styles.emptyCartImage} source={require("../../images/shoppingCart.png")}/>
                  <Text style={styles.labelEmptyCart}>Sua lista está vazia</Text>
              </View>
            }
        </SafeAreaView>
    )
}