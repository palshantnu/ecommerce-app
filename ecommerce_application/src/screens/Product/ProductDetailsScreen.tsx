import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { getProductDetails, Product } from '../../api/productApi';
import colors from '../../constants/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProductStackParamList } from '../../navigation/StackNavigator';
import { useCart } from '../../context/CartContext';
import AppButton from '../../components/common/Button';

type Props = NativeStackScreenProps<ProductStackParamList, 'ProductDetails'>;

const ProductDetailsScreen: React.FC<Props> = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { addItem } = useCart();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const data = await getProductDetails(productId);
      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" color={colors.primary} style={{ flex: 1 }} />;

  if (!product) return <Text style={styles.error}>Product not found</Text>;

  return (
    <ScrollView style={styles.container}>
      {product.image && <Image source={{ uri: product.image }} style={styles.image} />}
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <AppButton
        title="Add to Cart"
        onPress={() => addItem({ ...product, CartItems: { quantity: 1 } })}
      />
    </ScrollView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 10 },
  image: { width: '100%', height: 250, borderRadius: 10, marginBottom: 15 },
  name: { fontSize: 24, fontWeight: 'bold', color: colors.primary, marginBottom: 10 },
  price: { fontSize: 20, fontWeight: '600', color: colors.secondary, marginBottom: 10 },
  description: { fontSize: 16, color: colors.black, marginBottom: 20 },
  error: { textAlign: 'center', marginTop: 50, fontSize: 18, color: colors.danger },
});
