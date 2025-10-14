import React from 'react';
import { View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppTextInput from '../../components/common/AppTextInput';

const SearchBar = ({ value, onChangeText, placeholder = "Search for items..." }) => {
  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
      <AppTextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.searchBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 15,
    top: 15,
    zIndex: 1,
  },
  searchBar: {
    borderRadius: 15,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    paddingLeft: 45,
    borderWidth: 0,
  },
});

export default SearchBar;