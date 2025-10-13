import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import colors from '../../constants/colors';
import { getOrders, Order } from '../../api/orderApi';
import AppButton from '../../components/common/Button';

const OrdersScreen = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Order }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.orderId}>Order #{item.id}</Text>
      <Text>Total: ${item.total.toFixed(2)}</Text>
      <Text>Status: {item.status}</Text>
      <AppButton title="View Details" onPress={() => console.log('View', item.id)} />
    </View>
  );

  if (loading) return <ActivityIndicator size="large" color={colors.primary} style={{ flex: 1 }} />;

  if (orders.length === 0)
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No orders found</Text>
      </View>
    );

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 10, paddingBottom: 20 }}
    />
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  orderContainer: { backgroundColor: colors.white, padding: 15, borderRadius: 8, marginBottom: 10 },
  orderId: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: colors.grey },
});
