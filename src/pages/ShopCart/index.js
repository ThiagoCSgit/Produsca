import {SafeAreaView, Text, Image, FlatList} from 'react-native';
import styles from './styles';
import { useState } from 'react';


// contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
// style={styles.listSupermarketCategorys}

export default function ShopCart() {
    const [cartList, setCartList] = useState([])
    return(
        <SafeAreaView style={styles.container}>
            <Text>Carrinho</Text>
            {
                cartList.length > 0 ?
                <FlatList
                    data={cartList}
                    numColumns={1}
                    key={'_'}
                    renderItem={({item}) => {
                    return (
                        <Text>oi</Text>
                    )
                    }}
                />
                :
                <Image style={styles.emptyCartImage} source={require("../../images/shoppingCart.png")}/>
            }
        </SafeAreaView>
    )
}