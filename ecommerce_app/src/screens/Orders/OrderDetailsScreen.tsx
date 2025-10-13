import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import colors from '../../constants/colors';
import { getOrderDetails, OrderDetails } from '../../api/orderApi';
import AppButton from '../../components/common/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OrderStackParamList } from '../../navigation/StackNavigator';

type Props = NativeStackScreenProps<OrderStackParamList, 'OrderDetails'>;

const OrderDetailsScreen: React.FC<Props> = ({ route }) => {
  const { orderId } = route.params;
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const data = await getOrderDetails(orderId);
      setOrder(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" color={colors.primary} style={{ flex: 1 }} />;

  if (!order) return <Text style={styles.error}>Order not found</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Order #{order.id}</Text>
      <Text>Status: {order.status}</Text>
      <Text>Total: ${order.total.toFixed(2)}</Text>
      <Text style={styles.section}>Items:</Text>
      {order.items.map((item) => (
        <View key={item.id} style={styles.item}>
          <Text>{item.name} x {item.quantity}</Text>
          <Text>${item.price.toFixed(2)}</Text>
        </View>
      ))}
      <AppButton title="Reorder" onPress={() => console.log('Reorder', order.id)} />
    </ScrollView>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: colors.primary },
  section: { fontSize: 18, fontWeight: 'bold', marginTop: 15, marginBottom: 10 },
  item: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  error: { flex: 1, textAlign: 'center', marginTop: 50, fontSize: 18, color: colors.danger },
});
