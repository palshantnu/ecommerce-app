import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getProducts, Product } from '../../api/productApi';
import colors from '../../constants/colors';
import ProductCard from '../../components/product/ProductCard';
import AppTextInput from '../../components/common/AppTextInput';
import AppButton from '../../components/common/AppButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProductStackParamList } from '../../navigation/StackNavigator';

type Props = NativeStackScreenProps<ProductStackParamList, 'ProductList'>;

const ProductListScreen: React.FC<Props> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Dummy products data
  const dummyProducts: Product[] = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      price: 2999,
      description: 'High-quality wireless headphones with noise cancellation',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      category: 'Electronics',
      rating: 4.5,
      stock: 15
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      price: 5999,
      description: 'Advanced fitness tracking with heart rate monitor',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
      category: 'Wearables',
      rating: 4.3,
      stock: 8
    },
    {
      id: 3,
      name: 'USB-C Fast Charger',
      price: 1299,
      description: 'Fast charging adapter with multiple ports',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop',
      category: 'Accessories',
      rating: 4.2,
      stock: 25
    },
    {
      id: 4,
      name: 'Wireless Mouse',
      price: 899,
      description: 'Ergonomic wireless mouse for comfortable use',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop',
      category: 'Accessories',
      rating: 4.0,
      stock: 30
    },
    {
      id: 5,
      name: 'Laptop Backpack',
      price: 2499,
      description: 'Durable laptop backpack with multiple compartments',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
      category: 'Accessories',
      rating: 4.4,
      stock: 12
    },
    {
      id: 6,
      name: 'Smartphone Case',
      price: 499,
      description: 'Protective case with premium design',
      image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=300&h=300&fit=crop',
      category: 'Accessories',
      rating: 4.1,
      stock: 50
    }
  ];

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Use dummy data if no products exist
  const displayProducts = products?.length > 0 ? products : dummyProducts;
  const isDummyData = products?.length === 0;

  const filteredDisplayProducts = displayProducts.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Products</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      {isDummyData && (
        <View style={styles.demoBanner}>
          <Icon name="cube-outline" size={18} color="#856404" />
          <Text style={styles.demoText}>Demo Products - Real products will load from API</Text>
        </View>
      )}

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <AppTextInput
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          icon="search"
        />
      </View>

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {filteredDisplayProducts.length} {filteredDisplayProducts.length === 1 ? 'product' : 'products'} found
          {searchQuery ? ` for "${searchQuery}"` : ''}
        </Text>
      </View>

      {/* Products Grid */}
      {filteredDisplayProducts.length > 0 ? (
        <FlatList
          data={filteredDisplayProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View style={[
              styles.productCardWrapper,
              index % 2 === 0 ? styles.leftCard : styles.rightCard
            ]}>
              <ProductCard
                product={item}
                onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
                fadeAnim={fadeAnim}
              />
            </View>
          )}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Icon name="search-outline" size={80} color={colors.lightGrey} />
          <Text style={styles.noResultsTitle}>No products found</Text>
          <Text style={styles.noResultsSubtitle}>
            Try adjusting your search or browse different categories
          </Text>
          <AppButton
            title="Clear Search"
            onPress={() => setSearchQuery('')}
            style={styles.clearButton}
            type="outline"
          />
        </View>
      )}

      {/* Demo Hint */}
      {isDummyData && (
        <View style={styles.demoHint}>
          <Text style={styles.demoHintText}>
            Showing demo products. Connect to a real API to see actual products.
          </Text>
        </View>
      )}
    </View>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.grey,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  headerPlaceholder: {
    width: 40,
  },
  demoBanner: {
    backgroundColor: '#FFF3CD',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#FFC107',
  },
  demoText: {
    color: '#856404',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  resultsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  resultsText: {
    fontSize: 14,
    color: colors.grey,
    fontWeight: '500',
  },
  listContent: {
    paddingHorizontal: 12, // Reduced horizontal padding
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productCardWrapper: {
    flex: 1,
    marginHorizontal: 4, // Added horizontal margin for gap
  },
  leftCard: {
    marginRight: 2, // Smaller gap on right for left cards
  },
  rightCard: {
    marginLeft: 2, // Smaller gap on left for right cards
  },
  noResultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  noResultsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  noResultsSubtitle: {
    fontSize: 16,
    color: colors.grey,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  clearButton: {
    borderColor: colors.primary,
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  demoHint: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey,
  },
  demoHintText: {
    fontSize: 12,
    color: colors.grey,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});