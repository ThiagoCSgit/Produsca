import {SafeAreaView, Text, Image, FlatList, View, TouchableOpacity, Alert} from 'react-native';
import styles from './styles';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconE from 'react-native-vector-icons/EvilIcons';
import Checkbox from 'expo-checkbox';
import Icon from 'react-native-vector-icons/AntDesign';


export default function ShopCart({route}) {
    const [cartList, setCartList] = useState({id: 0, produtos: [], supermercado: ''})
    const [total, setTotal] = useState(0)
    const {list} = route.params
    
    useEffect(() => {
        getCartProducts()
    }, [])

    useEffect(() => {
        totalValue()
    }, [cartList])

    function getCartProducts(){
        let newList = list.produtos.map((item, index) => {
            item.check = false,
            item.idProd = index
            item.qtd = 1
            return item
        })
        setCartList({
            id: list.id,
            produtos: newList,
            supermercado: list.supermercado
        })
    }

    function checkedProduct(value, id){
        let newList = cartList.produtos.map(item => {
            if(item.idProd == id){
                item.check = value
            }
            return item
        })
        setCartList({
            id: list.id,
            produtos: newList,
            supermercado: list.supermercado
        })
    }

    async function removeItem(index){
        let newList = [...cartList.produtos]
        newList.splice(index, 1)
        setCartList({
            id: list.id,
            produtos: newList,
            supermercado: list.supermercado
        })
    }

    function increaseQuantity(id){
        let newList = cartList.produtos.map(item => {
            if(item.idProd == id){
                item.qtd = parseInt(item.qtd) + 1
            }
            return item
        })
        setCartList({
            id: list.id,
            produtos: newList,
            supermercado: list.supermercado
        })
    }

    function decreaseQuantity(id){
        let newList = cartList.produtos.map(item => {
            if(item.idProd == id && item.qtd > 0){
                item.qtd = parseInt(item.qtd) - 1
            }
            return item
        })
        setCartList({
            id: list.id,
            produtos: newList,
            supermercado: list.supermercado
        })
    }

    function unformatedParseFloatValue(value) {
        if (value != "") {
            return parseFloat(value.replaceAll(".", "").replace(",", "."));
        }
        return 0;
    }

    function itemPrice(value, quantity = 1){
        let unformatedValue = unformatedParseFloatValue(value) * parseInt(quantity)
        let valueFixed = Number.parseFloat(unformatedValue).toFixed(2);
        return Number.parseFloat(valueFixed).toLocaleString("pt-br", {
            minimumFractionDigits: 2,
        })
    }

    function totalValue(){
        let sum = 0
        if(cartList.produtos.length > 0){
            cartList.produtos.forEach(item => {
                sum += item.preco * item.qtd
            })
        }
        let valor = itemPrice(`${sum}`)
        setTotal(valor)
    }

    async function checkout(){
        let leftProduct = false
        cartList.produtos.forEach(item => {
            if(!item.check){
                leftProduct = true
            }
        })

        if(leftProduct) {
            Alert.alert("Itens não marcados", "Um ou mais produtos da lista não foram marcados")
        }
        else{
            let id = `carrinho-${cartList.id}-${cartList.supermercado}`
            console.warn('id:',id)
            try {
                await AsyncStorage.setItem(id, JSON.stringify(cartList))
              } catch (e) {
                console.warn('error:', e)
              }
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            {
                cartList?.produtos.length > 0 ?
                <View style={{width: "100%", height: "100%", alignItems: "center"}}>
                    <Text style={styles.totalValue}>Valor Total da compra: {total}</Text>
                    <FlatList
                        data={cartList.produtos}
                        numColumns={1}
                        key={'_'}
                        contentContainerStyle={{gap: 15}}
                        renderItem={({item, index}) => {
                        return (
                            <View style={styles.itemCart}>
                                <Text style={[styles.itemName, item.check && styles.bought]}>
                                    {item?.marca ? `${item.nome}, ${item.marca} \n R$${itemPrice(`${item.preco}`, `${item.qtd}`)} - ${cartList.supermercado}` : `${item.nome} \n R$${itemPrice(`${item.preco}`, `${item.qtd}`)} - ${cartList.supermercado}`}
                                </Text>
                                <View style={styles.actionIcons}>
                                    <Checkbox
                                        value={item.check}
                                        onValueChange={(newValue) => checkedProduct(newValue, item.idProd)}
                                        style={{width: 28, height: 28}}
                                    />
                                    <View style={styles.quantItems}>
                                        <Icon name="minuscircleo" size={28} onPress={() => decreaseQuantity(item.idProd)}/>
                                        <Text style={styles.quantityValue}>{item.qtd}</Text>
                                        <Icon name="pluscircleo" size={28} onPress={() => increaseQuantity(item.idProd)}/>
                                    </View>
                                    <IconE style={styles.iconTrash} name="trash" size={40} onPress={() => removeItem(index)}/>
                                </View>
                            </View>
                        )
                        }}
                    />
                    <TouchableOpacity style={styles.buttonCheckout} onPress={() => checkout()}>
                        <Text style={styles.textButton}>Finalizar Compra</Text>
                    </TouchableOpacity>
                </View>
                :
                <View>
                    <Image style={styles.emptyCartImage} source={require("../../images/shoppingCart.png")}/>
                    <Text style={styles.labelEmptyCart}>Seu carrinho está vazio</Text>
                </View>
            }
        </SafeAreaView>
    )
}