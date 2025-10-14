import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import colors from '../../constants/colors';
import Header from '../../components/layout/Header';
import SearchBar from '../../components/layout/SearchBar';
import Banner from '../../components/layout/Banner';
import CategoryCard from '../../components/layout/CategoryCard';
import ProductCard from '../../components/product/ProductCard';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const categories = [
  {
    id: 1,
    name: 'Food',
    imageUri: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop',
    icon: 'fast-food',
  },
  {
    id: 2,
    name: 'Groceries',
    imageUri: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=400&h=300&fit=crop',
    icon: 'cart',
  },
  {
    id: 3,
    name: 'Fish & Meat',
    imageUri: 'https://images.unsplash.com/photo-1574781338176-4cae7ce1e1d9?w=400&h=300&fit=crop',
    icon: 'fish',
  },
  {
    id: 4,
    name: 'Health & Well...',
    imageUri: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    icon: 'medical',
  },
  {
    id: 5,
    name: 'Flowers',
    imageUri: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&h=300&fit=crop',
    icon: 'flower',
  },
  {
    id: 6,
    name: 'Courier Genie',
    imageUri: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop',
    icon: 'cube',
  },
];

const products = [
  {
    id: 1,
    name: 'Fresh Salmon Fillet',
    categoryId: 3,
    price: 250,
    imageUri: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop',
    rating: 4.8,
    deliveryTime: '10-15 min',
  },
  {
    id: 2,
    name: 'Premium Catfish',
    categoryId: 3,
    price: 150,
    imageUri: 'https://images.unsplash.com/photo-1599154688454-d28792503e0a?w=400&h=300&fit=crop',
    rating: 4.5,
    deliveryTime: '15-20 min',
  },
  {
    id: 3,
    name: 'Organic Chicken Breast',
    categoryId: 3,
    price: 200,
    imageUri: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&h=300&fit=crop',
    rating: 4.9,
    deliveryTime: '10-12 min',
  },
  {
    id: 4,
    name: 'Fresh Mutton Leg',
    categoryId: 3,
    price: 450,
    imageUri: 'https://images.unsplash.com/photo-1602476524594-6f7d33d9e5e9?w=400&h=300&fit=crop',
    rating: 4.7,
    deliveryTime: '20-25 min',
  },
  {
    id: 5,
    name: 'Jumbo Prawns',
    categoryId: 3,
    price: 300,
    imageUri: 'https://images.unsplash.com/photo-1587339944147-13a48d9d804d?w=400&h=300&fit=crop',
    rating: 4.6,
    deliveryTime: '12-18 min',
  },
  {
    id: 6,
    name: 'Fresh Crab',
    categoryId: 3,
    price: 500,
    imageUri: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=300&fit=crop',
    rating: 4.8,
    deliveryTime: '15-20 min',
  },
];

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(3);
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory ? p.categoryId === selectedCategory : true;
    const matchesSearch = p.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (productId) => {
    console.log('Add to cart:', productId);
    // Add your cart logic here
  };

  const handleFavorite = (productId) => {
    console.log('Toggle favorite:', productId);
    // Add your favorite logic here
  };

  const renderCategory = (cat) => (
    <CategoryCard
      key={cat.id}
      category={cat}
      isSelected={selectedCategory === cat.id}
      onPress={() => setSelectedCategory(cat.id)}
    />
  );

  const renderProduct = ({ item, index }) => (
    <ProductCard
      product={item}
      fadeAnim={fadeAnim}
      onAddPress={() => handleAddToCart(item.id)}
      onFavoritePress={() => handleFavorite(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <Header />
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <Banner />

        <Text style={styles.sectionTitle}>What would you like to order?</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map(renderCategory)}
        </ScrollView>

        <View style={styles.productsHeader}>
          <Text style={styles.sectionTitle}>Top picks for you</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        {filteredProducts.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No products found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search</Text>
          </View>
        ) : (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderProduct}
            numColumns={2}
            columnWrapperStyle={styles.row}
            scrollEnabled={false}
            contentContainerStyle={styles.productsContainer}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    marginTop: 10
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 15,
  },
  categoryScroll: {
    marginBottom: 10,
  },
  categoryContainer: {
    paddingRight: 10,
  },
  productsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  seeAllText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  row: {
    justifyContent: 'space-between',
    gap: 12,
  },
  productsContainer: {
    paddingBottom: 30,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    color: '#666',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
  },
  emptySubtext: {
    color: '#999',
    fontSize: 14,
  },
});

export default HomeScreen;