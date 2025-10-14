import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import colors from '../../constants/colors';
import AppTextInput from '../../components/common/AppTextInput';
import AppButton from '../../components/common/AppButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../navigation/StackNavigator';

type Props = NativeStackScreenProps<ProfileStackParamList, 'AddAddress'>;

const AddAddressScreen: React.FC<Props> = ({ route, navigation }) => {
  const addressData = route.params?.address;
  const [label, setLabel] = useState(addressData?.label || '');
  const [address, setAddress] = useState(addressData?.address || '');

  const handleSave = () => {
    if (!label || !address) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    console.log('Saved Address:', { label, address });
    Alert.alert('Success', 'Address saved successfully');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <AppTextInput placeholder="Label (Home/Office)" value={label} onChangeText={setLabel} />
      <AppTextInput placeholder="Address" value={address} onChangeText={setAddress} multiline />
      <AppButton title="Save Address" onPress={handleSave} />
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
});
