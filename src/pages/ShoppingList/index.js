import {SafeAreaView, Text, Image, FlatList, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconE from 'react-native-vector-icons/EvilIcons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';



export default function ShoppingList({navigation}) {
    const [cartList, setCartList] = useState([])

    useEffect(() => {
        getCartProducts()
    }, [])
    
    async function getCartProducts(){
        try {

            let productKeys = await AsyncStorage.getAllKeys()
            console.warn(productKeys)
            let filteredKeys = productKeys.filter(key => {
                if(key.includes("produto-lista-")){
                    return key
                }
            })

            let products = await AsyncStorage.multiGet(filteredKeys)

            let newList = products.map(product => {
                const newProduct = JSON.parse(product[1])
                return {product: newProduct}
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
                            <IconE style={styles.iconTrash} name="trash" size={40} onPress={() => removeItem(item.product.supermarket ? `produto-lista-${item.product.supermarket}-${item.product.id}`: `produto-lista-${item.product.id}`)}/>
                        </View>
                    )
                    }}
                />
                <LinearGradient
                    colors={['#f09c33', '#f59234', '#f98736', '#fd7b38', '#ff6e3c', '#ff5f41']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.buttonGradient}
                    >
                    <TouchableOpacity style={styles.buttonSimulate} onPress={() => navigation.navigate("Supermacados para Comprar", {
                        list: cartList
                    })}>
                        <IconMCI style={styles.iconCalculator} name="calculator-variant-outline" size={25}/>
                        <Text style={styles.textButton}>Simular Compra</Text>
                    </TouchableOpacity>
                </LinearGradient>
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