import {SafeAreaView, Text, Image, FlatList, View} from 'react-native';
import styles from './styles';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconE from 'react-native-vector-icons/EvilIcons';
import Checkbox from 'expo-checkbox';


export default function ShopCart() {
    const [cartList, setCartList] = useState([])

    useEffect(() => {
        getCartProducts()
    }, [])
    
    async function getCartProducts(){
        try {
            let productKeys = await AsyncStorage.getAllKeys()
            let products = await AsyncStorage.multiGet(productKeys)
            let newList = products.map(product => {
                return {product: JSON.parse(product[1]), check: false}
            })
            setCartList(newList)

        } catch(e) {
            console.warn('error', e)
        }
    }

    function checkedProduct(value, id){
        let newList = [...cartList]
        setCartList(newList.map(item => {
            if(item.product.id == id){
                item.check = value
            }
            return item
        }))
    }

    async function removeItem(id){
        try{
            await AsyncStorage.removeItem(id);
            getCartProducts()
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
                    contentContainerStyle={{gap: 20}}
                    renderItem={({item, index}) => {
                    return (
                        <View style={styles.itemCart}>
                            <Text style={[styles.itemName, item.check && styles.bought]}>
                                {item.product.mark ? `${item.product.name}, ${item.product.mark} \n R$${item.product.price} - ${item.product.supermarket}` : `${item.product.name} \n R$${item.product.price} - ${item.product.supermarket}`}
                            </Text>
                            <View style={styles.actionIcons}>
                                <Checkbox
                                    value={item.check}
                                    onValueChange={(newValue) => checkedProduct(newValue, item.product.id)}
                                />
                                <IconE style={styles.iconTrash} name="trash" size={30} onPress={() => removeItem(item.product.id)}/>
                            </View>
                        </View>
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