import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CategoryProducts from './src/pages/CategoryProducts';
import Supermarkets from './src/pages/Supermarkets';
import Products from './src/pages/Products';
import Product from './src/pages/Product';
import ProductSupermarket from './src/pages/ProductSupermarket';
import Supermarket from './src/pages/Supermarket';
import ShopCart from './src/pages/ShopCart';
import ShoppingList from './src/pages/ShoppingList';
import SupermarketShoppingList from './src/pages/SupermarketShoppingList';
import Scanner from './src/pages/QRCodeScanner';
import ShopCartButton from './src/components/Cart';
import PurchasesHistoric from './src/pages/PurchasesHistoric';

import IconET from 'react-native-vector-icons/Entypo';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import IconFA from 'react-native-vector-icons/FontAwesome5';


import { useFonts, OpenSans_500Medium, OpenSans_600SemiBold } from '@expo-google-fonts/open-sans';

export default function App() {
  const Stack = createStackNavigator()
  const Tab = createBottomTabNavigator()
  const [state, setState] = useState(null)
  
    const [fontLoaded] = useFonts({
      OpenSans_500Medium,
      OpenSans_600SemiBold
    })
  
    if(!fontLoaded){
      return <View/>
    }

  function Tabs({ navigation }) {
    if (!state) {
      setState(navigation)
    }
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            if (route.name === "Categorias de Produtos") {
              return <IconMI style={[focused ? styles.buttonFocus : styles.noFocus]} name="category" size={25} />
            }
            else if (route.name == "Supermercados Próximos") {
              return <IconET style={[focused ? styles.buttonFocus : styles.noFocus]} name="shopping-basket" size={25} />
            }
            else {
              return <IconFA style={[focused ? styles.buttonFocus : styles.noFocus]} name="clipboard-list" size={25} />
            }
          },
          headerRight: () => {
            return <ShopCartButton navigation={navigation} />
          },
          headerRightContainerStyle: {
            alignItems: 'flex-end',
            paddingRight: 50
          },
          headerStyle: {
            // backgroundColor: '#1E90FF',
            backgroundColor: '#f58634',
            // backgroundColor: '#f499e9',
            // backgroundColor: '#ff75df',
            // backgroundColor: '#9653b7',
            // backgroundColor: '#8257E6',
            // backgroundColor: '#ff7d1a',
          },
          headerTitleStyle: {
            color: "#ffffff",
            fontFamily: "OpenSans_600SemiBold"
          },
          // tabBarActiveTintColor: '#1E90FF',
          tabBarActiveTintColor: '#f58634',
          // tabBarActiveTintColor: '#f499e9',
          // tabBarActiveTintColor: '#ff75df',
          // tabBarActiveTintColor: '#9653b7',
          // tabBarActiveTintColor: '#8257E6',
          // tabBarActiveTintColor: '#ff7d1a',
          tabBarInactiveTintColor: '#fff',
          tabBarStyle:{
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
            backgroundColor: '#140f07',
            // backgroundColor: '#78767c',
          }
        })}
      >
        <Tab.Screen name="Categorias de Produtos" component={CategoryProducts} />
        <Tab.Screen name="Supermercados Próximos" component={Supermarkets} />
        <Tab.Screen name="Histórico de Compras" component={PurchasesHistoric} />
      </Tab.Navigator>
    )
  }

  function returnShopCart() {
    return <ShopCartButton navigation={state} />
  }

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen options={{
          headerShown: false,
        }}
          name=" "
          component={Tabs}
        />
        <Stack.Screen
          name="Produtos"
          component={Products}
          options={{
            headerRight: () => {
              return returnShopCart()
            },
            headerRightContainerStyle: {
              alignItems: 'flex-end',
              paddingRight: 50,
            },
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: '#1E90FF',
            },
            headerTitleStyle: {
              color: '#ffffff',
              fontFamily: "OpenSans_600SemiBold"
            }
          }}
        />
        <Stack.Screen
          name="Produto"
          component={Product}
          options={{
            headerRight: () => {
              return returnShopCart()
            },
            headerRightContainerStyle: {
              alignItems: 'flex-end',
              paddingRight: 50
            },
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: '#1E90FF',
            },
            headerTitleStyle: {
              color: '#ffffff',
              fontFamily: "OpenSans_600SemiBold"
            }
          }}
        />
        <Stack.Screen
          name="Detalhes do Produto"
          component={ProductSupermarket}
          options={{
            headerRight: () => {
              return returnShopCart()
            },
            headerRightContainerStyle: {
              alignItems: 'flex-end',
              paddingRight: 50
            },
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: '#1E90FF',
            },
            headerTitleStyle: {
              color: '#ffffff',
              fontFamily: "OpenSans_600SemiBold"
            }
          }}
        />
        <Stack.Screen
          name="Supermercado"
          component={Supermarket}
          options={{
            headerRight: () => {
              return returnShopCart()
            },
            headerRightContainerStyle: {
              alignItems: 'flex-end',
              paddingRight: 50
            },
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: '#1E90FF',
            },
            headerTitleStyle: {
              color: '#ffffff',
              fontFamily: "OpenSans_600SemiBold"
            }
          }}
        />
        <Stack.Screen
          name="Carrinho"
          component={ShopCart}
          options={{
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: '#1E90FF',
            },
            headerTitleStyle: {
              color: '#ffffff',
              fontFamily: "OpenSans_600SemiBold"
            }
          }}
        />
        <Stack.Screen
          name="Lista de Compras"
          component={ShoppingList}
          options={{
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: '#1E90FF',
            },
            headerTitleStyle: {
              color: '#ffffff',
              fontFamily: "OpenSans_600SemiBold"
            }
          }}
        />
        <Stack.Screen
          name="Supermacados para Comprar"
          component={SupermarketShoppingList}
          options={{
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: '#1E90FF',
            },
            headerTitleStyle: {
              color: '#ffffff',
              fontFamily: "OpenSans_600SemiBold"
            }
          }}
        />
        <Stack.Screen
          name="Scanner"
          component={Scanner}
          options={{
            headerRight: () => {
              return returnShopCart()
            },
            headerRightContainerStyle: {
              alignItems: 'flex-end',
              paddingRight: 50
            },
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: '#1E90FF',
            },
            headerTitleStyle: {
              color: '#ffffff',
              fontFamily: "OpenSans_600SemiBold"
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noFocus:{
    color: '#fff'
  },
  buttonFocus: {
    color: '#1E90FF',
    color: '#f58634'
    // color: '#9653b7'
    // color: '#8257E6'
    // color: '#ff7d1a'
    // color: '#f499e9'
    // color: '#f499e9'
  },
  headerCart: {
    marginRight: 20
  }
});
