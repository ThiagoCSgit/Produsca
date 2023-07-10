import {SafeAreaView, Text, Image, FlatList, View} from 'react-native';
import styles from './styles';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconE from 'react-native-vector-icons/EvilIcons';
import Checkbox from 'expo-checkbox';
import Icon from 'react-native-vector-icons/AntDesign';


export default function ShopCart({route}) {
    const [cartList, setCartList] = useState([])
    const {list} = route.params
    
    useEffect(() => {
        getCartProducts()
        console.log('list shopcart:',list)
    }, [])
    
    async function getCartProducts(){
        try {
            let productKeys = await AsyncStorage.getAllKeys()
            let products = await AsyncStorage.multiGet(productKeys)
            let newList = products.map(product => {
                const newProduct = JSON.parse(product[1])
                return {product: newProduct, check: false}
            })
            console.warn(newList)
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

    function increaseQuantity(id){
        let newList = [...cartList]
        setCartList(newList.map(item => {
            if(item.product.id == id){
                item.product.quantityItems = parseInt(item.product.quantityItems) + 1
            }
            return item
        }))
        saveEditions(id)
    }

    function decreaseQuantity(id){
        let newList = [...cartList]
        setCartList(newList.map(item => {
            if(item.product.id == id){
                item.product.quantityItems = parseInt(item.product.quantityItems) - 1
            }
            return item
        }))
        saveEditions(id)
    }

    function unformatedParseFloatValue(value) {
        if (value != "") {
            return Number.parseFloat(value.replaceAll(".", "").replace(",", "."));
        }
        return 0;
    }

    function itemPrice(value, quantity){
        let unformatedValue = unformatedParseFloatValue(value) * parseInt(quantity)
        let valueFixed = Number.parseFloat(unformatedValue).toFixed(2);
        return Number.parseFloat(valueFixed).toLocaleString("pt-br", {
            minimumFractionDigits: 2,
        })
    }

    async function saveEditions(id){
        let itemToAdd = cartList.find(item => item.product.id == id)
        try {
            await AsyncStorage.setItem(id, JSON.stringify(itemToAdd.product))
        } catch (e) {
            console.warn('error:',e)
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
                    renderItem={({item}) => {
                    return (
                        <View style={styles.itemCart}>
                            <Text style={[styles.itemName, item.check && styles.bought]}>
                                {item.product.mark ? `${item.product.name}, ${item.product.mark} \n R$${itemPrice(item.product.price,  item.product.quantityItems)} - ${item.product.supermarket}` : `${item.product.name} \n R$${itemPrice(item.product.price,  item.product.quantityItems)} - ${item.product.supermarket}`}
                            </Text>
                            <View style={styles.actionIcons}>
                                <Checkbox
                                    value={item.check}
                                    onValueChange={(newValue) => checkedProduct(newValue, item.product.id)}
                                    style={{width: 28, height: 28}}
                                />
                                <View style={styles.quantItems}>
                                    <Icon name="minuscircleo" size={28} onPress={() => decreaseQuantity(item.product.id)}/>
                                    <Text style={styles.quantityValue}>{item.product.quantityItems}</Text>
                                    <Icon name="pluscircleo" size={28} onPress={() => increaseQuantity(item.product.id)}/>
                                </View>
                                <IconE style={styles.iconTrash} name="trash" size={40} onPress={() => removeItem(item.product.id)}/>
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