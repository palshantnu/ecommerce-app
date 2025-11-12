import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getProductDetails, Product } from '../../api/productApi';
import colors from '../../constants/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProductStackParamList } from '../../navigation/StackNavigator';
import { useCart } from '../../context/CartContext';
import AppButton from '../../components/common/AppButton';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<ProductStackParamList, 'ProductDetails'>;

const ProductDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { productId } = route.params || 1;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  // Dummy product data for fallback
  const dummyProduct: Product = {
    id: productId,
    name: 'Premium Wireless Headphones',
    price: 2999,
    description: 'Experience superior sound quality with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design perfect for long listening sessions.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: 'Electronics',
    rating: 4.5,
    stock: 15,
    features: [
      'Active Noise Cancellation',
      '30-hour Battery Life',
      'Bluetooth 5.0',
      'Fast Charging',
      'Comfortable Over-Ear Design'
    ],
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=500&fit=crop'
    ],
    specifications: {
      'Connectivity': 'Bluetooth 5.0',
      'Battery Life': '30 hours',
      'Charging Time': '2 hours',
      'Weight': '250g',
      'Warranty': '1 year'
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const data = await getProductDetails(productId);
      setProduct(data);
    } catch (error) {
      console.log('Error fetching product:', error);
      // Use dummy data if API fails
      setProduct(dummyProduct);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addItem({
        ...product,
        quantity: quantity
      });
      Alert.alert(
        'Added to Cart',
        `${product.name} has been added to your cart`,
        [{ text: 'OK' }]
      );
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Navigate to cart screen
    // navigation.navigate('Cart');
  };

  const incrementQuantity = () => {
    if (product && quantity < (product.stock || 10)) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading product details...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="sad-outline" size={80} color={colors.grey} />
        <Text style={styles.errorTitle}>Product Not Found</Text>
        <Text style={styles.errorSubtitle}>The product you're looking for doesn't exist.</Text>
        <AppButton
          title="Back to Products"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
      </View>
    );
  }

  const isDummyData = product.id === dummyProduct.id;
  const productImages = product.images || [product.image];
  const productFeatures = product.features || ['High Quality', 'Premium Design', 'Excellent Performance'];
  const productSpecs = product.specifications || {
    'Category': product.category || 'General',
    'Rating': `${product.rating || 4.0}/5.0`,
    'In Stock': `${product.stock || 10} units`
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <Icon name="heart-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {isDummyData && (
        <View style={styles.demoBanner}>
          <Icon name="cube-outline" size={16} color="#856404" />
          <Text style={styles.demoText}>Demo Product - Real product data will load from API</Text>
        </View>
      )}

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Gallery */}
        <View style={styles.imageSection}>
          <Image
            source={{ uri: productImages[selectedImage] }}
            style={styles.mainImage}
          />

          {/* Image Thumbnails */}
          {productImages.length > 1 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.thumbnailContainer}
            >
              {productImages.map((img, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedImage(index)}
                >
                  <Image
                    source={{ uri: img }}
                    style={[
                      styles.thumbnail,
                      selectedImage === index && styles.thumbnailSelected
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.infoSection}>
          <View style={styles.categoryRow}>
            <Text style={styles.category}>{product.category}</Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={16} color="#FFD700" />
              <Text style={styles.rating}>{product.rating?.toFixed(1) || '4.0'}</Text>
            </View>
          </View>

          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>₹{product.price.toLocaleString()}</Text>

          {/* Stock Status */}
          <View style={styles.stockContainer}>
            <Icon
              name={product.stock && product.stock > 0 ? "checkmark-circle" : "close-circle"}
              size={16}
              color={product.stock && product.stock > 0 ? "#34C759" : "#FF3B30"}
            />
            <Text style={[
              styles.stockText,
              { color: product.stock && product.stock > 0 ? "#34C759" : "#FF3B30" }
            ]}>
              {product.stock && product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </Text>
          </View>

          {/* Description */}
          <Text style={styles.description}>{product.description}</Text>

          {/* Features */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            {productFeatures.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Icon name="checkmark-circle" size={16} color={colors.primary} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          {/* Specifications */}
          <View style={styles.specsSection}>
            <Text style={styles.sectionTitle}>Specifications</Text>
            {Object.entries(productSpecs).map(([key, value]) => (
              <View key={key} style={styles.specRow}>
                <Text style={styles.specKey}>{key}</Text>
                <Text style={styles.specValue}>{value}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Fixed Footer */}
      <View style={styles.footer}>
        {/* Quantity Selector */}
        {/* <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Quantity</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={[styles.quantityBtn, quantity <= 1 && styles.quantityBtnDisabled]}
              onPress={decrementQuantity}
              disabled={quantity <= 1}
            >
              <Icon name="remove" size={20} color={quantity <= 1 ? colors.grey : colors.text} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={[styles.quantityBtn, product.stock && quantity >= product.stock && styles.quantityBtnDisabled]}
              onPress={incrementQuantity}
              disabled={product.stock ? quantity >= product.stock : false}
            >
              <Icon name="add" size={20} color={product.stock && quantity >= product.stock ? colors.grey : colors.text} />
            </TouchableOpacity>
          </View>
        </View> */}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <AppButton
            title="Add to Cart"
            onPress={handleAddToCart}
            style={styles.cartButton}
            type="outline"
            disabled={product.stock === 0}
          />
          <AppButton
            title="Buy Now"
            onPress={handleBuyNow}
            style={{ ...styles.buyButton, backgroundColor: colors.white, borderColor: colors.primary, borderWidth: 1 }}
            disabled={product.stock === 0}
            textStyle={{ color: '#000' }}
          />
        </View>
      </View>

      {isDummyData && (
        <View style={styles.demoHint}>
          <Text style={styles.demoHintText}>
            This is a demo product. Connect to a real API to see actual product data.
          </Text>
        </View>
      )}
    </View>
  );
};

export default ProductDetailsScreen;

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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  errorSubtitle: {
    fontSize: 16,
    color: colors.grey,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
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
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  favoriteButton: {
    padding: 8,
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
  scrollView: {
    flex: 1,
  },
  imageSection: {
    backgroundColor: colors.white,
    padding: 16,
  },
  mainImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 12,
  },
  thumbnailContainer: {
    flexDirection: 'row',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbnailSelected: {
    borderColor: colors.primary,
  },
  infoSection: {
    backgroundColor: colors.white,
    marginTop: 8,
    padding: 16,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 30,
  },
  price: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 12,
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stockText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  description: {
    fontSize: 16,
    color: colors.grey,
    lineHeight: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  featuresSection: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
    flex: 1,
  },
  specsSection: {
    marginBottom: 20,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  specKey: {
    fontSize: 14,
    color: colors.grey,
    fontWeight: '500',
  },
  specValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
  },
  footer: {
    backgroundColor: colors.white,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
  quantityBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityBtnDisabled: {
    opacity: 0.4,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    width: 40,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cartButton: {
    flex: 1,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  buyButton: {
    flex: 1,
    backgroundColor: colors.primary,
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