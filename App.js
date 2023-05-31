import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CategoryProducts from './src/pages/CategoryProducts';
import Supermarkets from './src/pages/Supermarkets';
import Products from './src/pages/Products';
import Supermarket from './src/pages/Supermarket';
import ShopCart from './src/pages/ShopCart';
import ShoppingList from './src/pages/ShoppingList';
import Scanner from './src/pages/QRCodeScanner';
import ShopCartButton from './src/components/Cart/ShopCartButton';

import IconET from 'react-native-vector-icons/Entypo';
import IconMI from 'react-native-vector-icons/MaterialIcons';


export default function App() {
  const Stack = createStackNavigator()
  const Tab = createBottomTabNavigator()

  function Tabs({navigation}){
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            if(route.name === "Categorias de Produtos"){
              return <IconMI style={[focused && styles.buttonFocus]} name="category" size={25}/>
            }
            else{
              return <IconET style={[focused && styles.buttonFocus]} name="shopping-basket" size={25}/>
            }
          },
          headerRight: () => {
            return <ShopCartButton navigation={navigation}/>
          },
          headerRightContainerStyle: {
            alignItems: 'center',
          }
        })}
      >
        <Tab.Screen name="Categorias de Produtos" component={CategoryProducts}/>
        <Tab.Screen name="Supermercados Próximos" component={Supermarkets}/>
      </Tab.Navigator>
    )
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
          <Stack.Screen name="Produtos" component={Products}/>
          <Stack.Screen
            name="Supermercado" 
            component={Supermarket}
            options={{
                headerRight: (props) => {
                  console.log('proooops:',props)
                  return <ShopCartButton />
                }
              }}
           />
          <Stack.Screen name="Carrinho" component={ShopCart}/>
          <Stack.Screen name="Lista de Compras" component={ShoppingList}/>
          <Stack.Screen name="Scanner" component={Scanner}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonFocus:{
    color: '#1E90FF'
  },
  headerCart:{
    marginRight: 20
  }
});
