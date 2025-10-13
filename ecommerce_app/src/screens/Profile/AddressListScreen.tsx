import React from 'react';
import { View, FlatList, StyleSheet, Text, Alert } from 'react-native';
import colors from '../../constants/colors';
import AppButton from '../../components/common/Button';
import { useNavigation } from '@react-navigation/native';

const AddressListScreen = () => {
  const navigation = useNavigation();
  const addresses = [
    { id: 1, label: 'Home', address: '123 Main Street' },
    { id: 2, label: 'Office', address: '456 Corporate Ave' },
  ];

  const handleDelete = (id: number) => {
    Alert.alert('Delete', `Are you sure you want to delete address #${id}?`);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.addressContainer}>
      <Text style={styles.label}>{item.label}</Text>
      <Text style={styles.address}>{item.address}</Text>
      <View style={styles.buttons}>
        <AppButton
          title="Edit"
          onPress={() => navigation.navigate('AddAddress', { address: item })}
          style={styles.editButton}
        />
        <AppButton
          title="Delete"
          onPress={() => handleDelete(item.id)}
          style={styles.deleteButton}
        />
      </View>
    </View>
  );

  return (
    <FlatList
      data={addresses}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 10, paddingBottom: 20 }}
    />
  );
};

export default AddressListScreen;

const styles = StyleSheet.create({
  addressContainer: { backgroundColor: colors.white, padding: 15, borderRadius: 8, marginBottom: 10 },
  label: { fontSize: 16, fontWeight: 'bold' },
  address: { fontSize: 14, color: colors.grey, marginBottom: 10 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between' },
  editButton: { flex: 1, marginRight: 5 },
  deleteButton: { flex: 1, marginLeft: 5, backgroundColor: colors.danger },
});
