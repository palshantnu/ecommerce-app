import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../constants/colors';

const CategoryCard = ({ category, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        isSelected && styles.categoryCardSelected,
      ]}
      onPress={onPress}
    >
      <View style={[
        styles.categoryIconContainer,
        isSelected && styles.categoryIconContainerSelected
      ]}>
        <Ionicons
          name={category.icon}
          size={24}
          color={isSelected ? '#fff' : colors.primary}
        />
      </View>
      <Text style={[
        styles.categoryText,
        isSelected && styles.categoryTextSelected
      ]}>{category.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    width: 90,
    elevation: 3,
    marginRight: 12,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 2,
    borderColor: 'transparent',
    marginTop: 5
  },
  categoryCardSelected: {
    borderColor: colors.primary,
    backgroundColor: '#f0f8ff',
    transform: [{ scale: 1.05 }],
  },
  categoryIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  categoryIconContainerSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    color: '#666',
  },
  categoryTextSelected: {
    color: colors.primary,
    fontWeight: '700',
  },
});

export default CategoryCard;