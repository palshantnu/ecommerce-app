import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from '../screens/Product/ProductListScreen';
import ProductDetailsScreen from '../screens/Product/ProductDetailsScreen';

export type ProductStackParamList = {
  ProductList: undefined;
  ProductDetails: { productId: number };
};

const Stack = createNativeStackNavigator<ProductStackParamList>();

const StackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="ProductList" component={ProductListScreen} />
    <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
  </Stack.Navigator>
);

export default StackNavigator;
