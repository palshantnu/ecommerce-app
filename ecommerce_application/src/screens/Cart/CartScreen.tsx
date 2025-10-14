import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import colors from '../../constants/colors';
import { useCart } from '../../context/CartContext';
import AppButton from '../../components/common/AppButton';
import AppTextInput from '../../components/common/AppTextInput';

const CartScreen = () => {
  const { cartItems, updateQuantity, removeItem, totalPrice } = useCart();

  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.controls}>
        <AppTextInput
          value={item.quantity.toString()}
          onChangeText={(val) => updateQuantity(item.id, parseInt(val) || 1)}
          keyboardType="number-pad"
          style={styles.quantityInput}
        />
        <AppButton title="Remove" onPress={() => removeItem(item.id)} style={styles.removeButton} />
      </View>
    </View>
  );

  if (cartItems.length === 0)
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>
        <AppButton title="Checkout" onPress={() => console.log('Go to Checkout')} />
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 10 },
  itemContainer: { backgroundColor: colors.white, padding: 15, borderRadius: 8, marginBottom: 10 },
  itemName: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  controls: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  quantityInput: { width: 60 },
  removeButton: { backgroundColor: colors.danger, paddingHorizontal: 15 },
  footer: { paddingVertical: 15, borderTopWidth: 1, borderColor: colors.grey },
  total: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: colors.grey },
});
