import React, { useState } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  Text, 
  Image, 
  TouchableOpacity,
  Animated,
  Alert,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../constants/colors';
import { useCart } from '../../context/CartContext';
import AppButton from '../../components/common/AppButton';

const CartScreen = () => {
  const { cartItems, updateQuantity, removeItem, totalPrice } = useCart();

  // Dummy data for when cart is empty
  const dummyCartItems = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 199.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
      category: 'Electronics'
    },
    {
      id: 2,
      name: 'Smart Watch Series 5',
      price: 299.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
      category: 'Wearables'
    },
  ];

  const dummyTotalPrice = dummyCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleRemoveItem = (itemId: number, itemName: string) => {
    Alert.alert(
      'Remove Item',
      `Are you sure you want to remove ₹{itemName} from your cart?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => removeItem(itemId)
        },
      ]
    );
  };

  const incrementQuantity = (item: any) => {
    const newQuantity = item.quantity + 1;
    if (newQuantity <= 10) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const decrementQuantity = (item: any) => {
    const newQuantity = item.quantity - 1;
    if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemHeader}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemCategory}>{item.category}</Text>
          <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.itemPrice}>₹{item.price.toFixed(2)}</Text>
        </View>
        <TouchableOpacity 
          style={styles.removeIcon}
          onPress={() => handleRemoveItem(item.id, item.name)}
        >
          <Icon name="close" size={20} color={colors.grey} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.controls}>
        <View style={styles.quantitySection}>
          <Text style={styles.quantityLabel}>Quantity</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity 
              style={[styles.quantityBtn, item.quantity <= 1 && styles.quantityBtnDisabled]}
              onPress={() => decrementQuantity(item)}
              disabled={item.quantity <= 1}
            >
              <Icon name="remove" size={16} color={item.quantity <= 1 ? colors.lightGrey : colors.primary} />
            </TouchableOpacity>
            
            <View style={styles.quantityDisplay}>
              <Text style={styles.quantityText}>{item.quantity}</Text>
            </View>
            
            <TouchableOpacity 
              style={[styles.quantityBtn, item.quantity >= 10 && styles.quantityBtnDisabled]}
              onPress={() => incrementQuantity(item)}
              disabled={item.quantity >= 10}
            >
              <Icon name="add" size={16} color={item.quantity >= 10 ? colors.lightGrey : colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.itemTotal}>
          <Text style={styles.itemTotalLabel}>Item Total</Text>
          <Text style={styles.itemTotalPrice}>₹{(item.price * item.quantity).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  // Use dummy data if cart is empty
  const displayItems = cartItems?.length > 0 ? cartItems : dummyCartItems;
  const displayTotal = cartItems?.length > 0 ? totalPrice : dummyTotalPrice;
  const isDummyData = cartItems?.length === 0;
  const itemCount = displayItems.reduce((total, item) => total + item.quantity, 0);
  const taxAmount = displayTotal * 0.1;
  const finalTotal = displayTotal + taxAmount;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <View style={styles.cartSummary}>
          <Text style={styles.itemCount}>{itemCount} {itemCount === 1 ? 'item' : 'items'}</Text>
        </View>
      </View>

      {isDummyData && (
        <View style={styles.demoBanner}>
          <Icon name="cart-outline" size={20} color="#856404" />
          <Text style={styles.demoText}>Demo Cart - Add real items to see your actual cart</Text>
        </View>
      )}
      
      {/* Main Content with Products and Price Breakdown */}
      <FlatList
        data={displayItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="cart-outline" size={80} color={colors.lightGrey} />
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptySubtitle}>Start shopping to add items to your cart</Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.priceBreakdownSection}>
            <Text style={styles.breakdownTitle}>Order Summary</Text>
            
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Subtotal ({itemCount} items)</Text>
              <Text style={styles.breakdownValue}>₹{displayTotal.toFixed(2)}</Text>
            </View>
            
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Shipping</Text>
              <Text style={styles.breakdownValue}>FREE</Text>
            </View>
            
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Tax (10%)</Text>
              <Text style={styles.breakdownValue}>₹{taxAmount.toFixed(2)}</Text>
            </View>
            
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Discount</Text>
              <Text style={[styles.breakdownValue, styles.discountValue]}>-₹0.00</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.breakdownRow}>
              <Text style={styles.finalTotalLabel}>Estimated Total</Text>
              <Text style={styles.finalTotalValue}>₹{finalTotal.toFixed(2)}</Text>
            </View>

            {isDummyData && (
              <Text style={styles.demoHint}>
                These are sample products for demonstration purposes
              </Text>
            )}
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
      
      {/* Fixed Footer with Total and Checkout Button */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          {/* Left Side - Total Price */}
          <View style={styles.totalSection}>
            <Text style={styles.footerTotalLabel}>Total</Text>
            <Text style={styles.footerTotalPrice}>₹{finalTotal.toFixed(2)}</Text>
          </View>

          {/* Right Side - Checkout Button */}
          <View style={styles.checkoutSection}>
            <AppButton 
              title={isDummyData ? "Explore Products" : "Checkout"} 
              onPress={() => console.log(isDummyData ? 'Navigate to products' : 'Go to Checkout')} 
              style={styles.checkoutButton}
              textStyle={styles.checkoutButtonText}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa', 
  },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.black,
    letterSpacing: -0.5,
  },
  cartSummary: {
    alignItems: 'flex-end',
  },
  itemCount: {
    fontSize: 14,
    color: colors.grey,
  },
  demoBanner: {
    backgroundColor: '#FFF3CD',
    padding: 16,
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
  listContent: {
    padding: 16,
    paddingBottom: 100, // Extra padding for fixed footer
  },
  itemContainer: { 
    backgroundColor: colors.white, 
    padding: 16, 
    borderRadius: 16, 
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  itemHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  itemCategory: {
    fontSize: 12,
    color: colors.grey,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  itemName: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: colors.text,
    marginBottom: 8,
    lineHeight: 20,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  removeIcon: {
    padding: 4,
  },
  controls: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey,
  },
  quantitySection: {
    alignItems: 'flex-start',
  },
  quantityLabel: {
    fontSize: 12,
    color: colors.grey,
    fontWeight: '500',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityBtnDisabled: {
    opacity: 0.4,
  },
  quantityDisplay: {
    width: 40,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.lightGrey,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  itemTotal: {
    alignItems: 'flex-end',
  },
  itemTotalLabel: {
    fontSize: 12,
    color: colors.grey,
    fontWeight: '500',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  itemTotalPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.grey,
    textAlign: 'center',
  },
  // Price Breakdown Section (in the scroll)
  priceBreakdownSection: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 16,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  breakdownTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  breakdownLabel: {
    fontSize: 14,
    color: colors.grey,
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  discountValue: {
    color: '#34C759',
  },
  divider: {
    height: 1,
    backgroundColor: colors.lightGrey,
    marginVertical: 12,
  },
  finalTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  finalTotalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  demoHint: {
    fontSize: 12,
    color: colors.grey,
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
    paddingHorizontal: 20,
  },
  // Fixed Footer
  footer: { 
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalSection: {
    flex: 1,
  },
  footerTotalLabel: {
    fontSize: 14,
    color: colors.grey,
    fontWeight: '500',
    marginBottom: 4,
  },
  footerTotalPrice: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
  },
  checkoutSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    minWidth: 140,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
});