import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Location from 'expo-location';

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

import Ionicons from '@expo/vector-icons/Ionicons';

import { useFonts, OpenSans_500Medium, OpenSans_600SemiBold } from '@expo-google-fonts/open-sans';

export default function App() {
  const Stack = createStackNavigator()
  const Tab = createBottomTabNavigator()
  const [state, setState] = useState(null)
  const [myLocation, setMyLocation] = useState(null)
  
  useEffect(() => {
    getLocation()
  }, [])
  
    const [fontLoaded] = useFonts({
      OpenSans_500Medium,
      OpenSans_600SemiBold
    })
  
    if(!fontLoaded){
      return <View/>
    }

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('A permissão para acessar o local foi negada');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setMyLocation(location);
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
            backgroundColor: '#1E90FF',
          },
          headerTitleStyle: {
            color: "#ffffff",
            fontFamily: "OpenSans_600SemiBold"
          },
          tabBarActiveTintColor: '#1E90FF',
          tabBarInactiveTintColor: '#fff',
          tabBarStyle:{
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
            backgroundColor: '#140f07',
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
    color: '#1E90FF'
  },
  headerCart: {
    marginRight: 20
  }
});
