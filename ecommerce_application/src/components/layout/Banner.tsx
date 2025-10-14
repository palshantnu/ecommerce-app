import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../constants/colors';

const Banner = ({ 
  subtitle = "Best Quality", 
  title = "Fresh Fish & Meat", 
  description = "Delivery in 10 minutes",
  buttonText = "ORDER NOW",
  imageUri = "https://plus.unsplash.com/premium_photo-1757090129471-0dcc9580612c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWVldCUyMGZpc2glMjBzaG9wfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900"
}) => {
  return (
    <View style={styles.banner}>
      <View style={styles.bannerContent}>
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerSubtitle}>{subtitle}</Text>
          <Text style={styles.bannerTitle}>{title}</Text>
          <Text style={styles.bannerDescription}>{description}</Text>
          <TouchableOpacity style={styles.orderButton}>
            <Text style={styles.orderButtonText}>{buttonText}</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.bannerImageContainer}>
          <Image source={{ uri: imageUri }} style={styles.bannerImage} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    marginBottom: 15,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    overflow: 'hidden',
  },
  bannerContent: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  bannerTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
    marginBottom: 5,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  bannerDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 15,
  },
  orderButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  orderButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  bannerImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 15,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
});

export default Banner;