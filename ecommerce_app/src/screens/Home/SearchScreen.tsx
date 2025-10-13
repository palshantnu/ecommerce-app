import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import { getProducts, Product } from '../../api/productApi';
import ProductCard from '../../components/product/ProductCard';
import AppTextInput from '../../components/common/TextInput';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  const handleSearch = async (text: string) => {
    setQuery(text);
    try {
      const products = await getProducts();
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(text.toLowerCase())
      );
      setResults(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <AppTextInput placeholder="Search products..." value={query} onChangeText={handleSearch} />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 10 },
  row: { justifyContent: 'space-between', marginBottom: 15 },
});
