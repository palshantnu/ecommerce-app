import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../constants/colors';

const Header = ({ deliveryTime = '10 min', address = 'F-207, Meta Varachha Rd, Radhe Shyam Soc' }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View style={styles.locationContainer}>
          <View style={styles.deliveryInfo}>
            <Text style={styles.deliveryLabel}>Delivery in</Text>
            <View style={styles.deliveryTime}>
              <Text style={styles.deliveryTimeText}>{deliveryTime}</Text>
              <Ionicons name="chevron-down" size={14} color={colors.primary} />
            </View>
          </View>
          <View style={styles.addressContainer}>
            <Ionicons name="location-sharp" size={16} color={colors.primary} />
            <Text style={styles.addressText} numberOfLines={1}>
              {address}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.profileIcon}>
            <Ionicons name="person" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingVertical: 25,
    paddingHorizontal: 20,
    paddingBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  locationContainer: {
    flex: 1,
    marginRight: 15,
    marginBottom: -10
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  deliveryLabel: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
    marginRight: 6,
  },
  deliveryTime: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e1f0ff',
  },
  deliveryTimeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    marginRight: 2,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  addressText: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '600',
    marginLeft: 6,
    flex: 1,
  },
  profileButton: {
    padding: 4,
    backgroundColor: colors.white,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default Header;