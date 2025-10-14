import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import colors from '../../constants/colors';
import AppTextInput from '../../components/common/AppTextInput';
import AppButton from '../../components/common/AppButton';
import { useCart } from '../../context/CartContext';

const CheckoutScreen = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handlePlaceOrder = () => {
    if (!name || !address || !phone) {
      Alert.alert('Error', 'Please fill all details');
      return;
    }
    console.log('Order placed:', { name, address, phone, cartItems, totalPrice });
    Alert.alert('Success', 'Order placed successfully!');
    clearCart();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <AppTextInput placeholder="Full Name" value={name} onChangeText={setName} />
      <AppTextInput placeholder="Address" value={address} onChangeText={setAddress} multiline />
      <AppTextInput placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>
      <AppButton title="Place Order" onPress={handlePlaceOrder} />
    </ScrollView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: colors.primary },
  total: { fontSize: 20, fontWeight: 'bold', marginVertical: 20 },
});
