import {SafeAreaView, Text, Image, FlatList, View} from 'react-native';
import styles from './styles';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


// contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
// style={styles.listSupermarketCategorys}

export default function ShopCart() {
    const [cartList, setCartList] = useState([])

    useEffect(() => {
        getCartProducts()
    }, [])
    
    async function getCartProducts(){
        try {
            let productKeys = await AsyncStorage.getAllKeys()
            let products = await AsyncStorage.multiGet(productKeys)
            let newList = products.map(product => (
                 product[1]
            ))
            setCartList(newList)
        } catch(e) {
            console.warn('error', e)
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            {
                cartList.length > 0 ?
                <FlatList
                    data={cartList}
                    numColumns={1}
                    key={'_'}
                    renderItem={({item}) => {
                    return (
                        <Text>{item}</Text>
                    )
                    }}
                />
                :
                <View>
                    <Image style={styles.emptyCartImage} source={require("../../images/shoppingCart.png")}/>
                    <Text style={styles.labelEmptyCart}>Seu carrinho está vazio</Text>
                </View>
            }
        </SafeAreaView>
    )
}