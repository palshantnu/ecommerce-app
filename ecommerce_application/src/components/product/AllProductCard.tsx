import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../constants/colors';

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image: string;
  category?: string;
  rating?: number;
  stock?: number;
  deliveryTime?: string;
}

interface ProductCardProps {
  product: Product;
  fadeAnim?: Animated.Value;
  onAddPress?: (product: Product) => void;
  onFavoritePress?: (product: Product) => void;
  onPress?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  fadeAnim = new Animated.Value(1), 
  onAddPress, 
  onFavoritePress,
  onPress 
}) => {
  
  const handleAddPress = () => {
    onAddPress?.(product);
  };

  const handleFavoritePress = () => {
    onFavoritePress?.(product);
  };

  const handleCardPress = () => {
    onPress?.(product);
  };

  // Default values for optional fields
  const rating = product.rating || 4.0;
  const deliveryTime = product.deliveryTime || '30-40 min';
  const imageUri = product.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop';

  return (
    <TouchableOpacity onPress={handleCardPress} activeOpacity={0.9}>
      <Animated.View
        style={[
          styles.productCard,
          {
            opacity: fadeAnim,
            transform: [{
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0]
              })
            }]
          }
        ]}
      >
        <View style={styles.productImageContainer}>
          <Image source={{ uri: imageUri }} style={styles.productImage} />
          
          {/* Rating Badge */}
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
          </View>
          
          {/* Favorite Button */}
          <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoritePress}>
            <Ionicons 
              name="heart-outline" 
              size={18} 
              color="#fff" 
            />
          </TouchableOpacity>

          {/* Stock Indicator */}
          {product.stock !== undefined && product.stock < 10 && (
            <View style={styles.stockBadge}>
              <Text style={styles.stockText}>Only {product.stock} left</Text>
            </View>
          )}
        </View>

        <View style={styles.productInfo}>
          {/* Category */}
          {product.category && (
            <Text style={styles.productCategory}>{product.category}</Text>
          )}
          
          {/* Product Name */}
          <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>

          {/* Description */}
          {product.description && (
            <Text style={styles.productDescription} numberOfLines={2}>
              {product.description}
            </Text>
          )}

          {/* Delivery Info */}
          <View style={styles.deliveryInfo}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.deliveryText}>{deliveryTime}</Text>
          </View>

          {/* Price and Add Button */}
          <View style={styles.priceContainer}>
            <View style={styles.priceSection}>
              <Text style={styles.productPrice}>₹{product.price.toLocaleString()}</Text>
              {product.originalPrice && product.originalPrice > product.price && (
                <Text style={styles.originalPrice}>₹{product.originalPrice.toLocaleString()}</Text>
              )}
            </View>
            
            <TouchableOpacity 
              style={[
                styles.addButton,
                product.stock === 0 && styles.addButtonDisabled
              ]} 
              onPress={handleAddPress}
              disabled={product.stock === 0}
            >
              <Ionicons 
                name={product.stock === 0 ? "close" : "add"} 
                size={20} 
                color="#fff" 
              />
            </TouchableOpacity>
          </View>

          {/* Out of Stock Label */}
          {product.stock === 0 && (
            <View style={styles.outOfStockOverlay}>
              <Text style={styles.outOfStockText}>Out of Stock</Text>
            </View>
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 16,
    padding: 12,
    margin: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  productImageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  productImage: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255,255,255,0.95)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginLeft: 2,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  stockBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  stockText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  productInfo: {
    flex: 1,
  },
  productCategory: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 6,
    lineHeight: 18,
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    lineHeight: 16,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  deliveryText: {
    fontSize: 12,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  priceSection: {
    flex: 1,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 2,
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  addButton: {
    backgroundColor: colors.primary,
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
  },
  outOfStockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outOfStockText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF3B30',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default ProductCard;